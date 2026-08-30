#!/usr/bin/env node
import { createHash } from 'crypto';
import { createClient } from '@sanity/client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.resolve(__dirname, '../.env');
const envContent = await fs.readFile(envPath, 'utf-8');
const envVars = Object.fromEntries(
	envContent
		.split('\n')
		.filter((line) => line.includes('='))
		.map((line) => {
			const [key, ...rest] = line.split('=');
			return [key.trim(), rest.join('=').trim()];
		})
);
process.env.SANITY_TOKEN = envVars.SANITY_TOKEN ?? process.env.SANITY_TOKEN;
process.env.SANITY_PROJECT_ID = envVars.SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_TOKEN;

if (!projectId) {
	console.error('❌ Please set SANITY_PROJECT_ID environment variable (or add it to sanity/.env)');
	process.exit(1);
}

if (!token) {
	console.error('❌ Please set SANITY_TOKEN environment variable (or add it to sanity/.env)');
	process.exit(1);
}

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false,
	perspective: 'published'
});

const seedDir = path.resolve(__dirname, '../data');

const argOnly = process.argv.find((arg) => arg.startsWith('--only='));
const argSkipAssets = process.argv.includes('--skip-assets');
const onlyValues = new Set(
	(argOnly ? argOnly.slice('--only='.length) : '')
		.split(',')
		.map((v) => v.trim())
		.filter(Boolean)
);

const singletonTypes = [
	'homePage',
	'aboutPage',
	'servicesPage',
	'portfolioPage',
	'blogPage',
	'contactPage',
	'termsPage',
	'privacyPage',
	'generalSettings',
	'informationSettings',
	'configuration',
	'menuSettings'
];

const singletonSet = new Set(singletonTypes);
const canonicalIdTypes = new Set(['category', 'post', 'project', 'team', 'client', 'service']);

function shouldIncludeSingleton(type) {
	if (onlyValues.size === 0) return true;
	return onlyValues.has(type);
}

function shouldIncludeCollection(key, type) {
	if (onlyValues.size === 0) return true;
	return onlyValues.has(key) || onlyValues.has(type);
}

const documentMappings = [
	['categories', 'category'],
	['services', 'service'],
	['clients', 'client'],
	['team', 'team'],
	['projects', 'project'],
	['posts', 'post']
];

function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function sanitizePart(value) {
	return String(value || 'unknown')
		.toLowerCase()
		.replace(/[^a-z0-9._-]/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 120);
}

function getDisplayTitle(payload) {
	return (
		payload.title?.id || payload.title?.en || payload.name || payload.slug?.current || 'unknown'
	);
}

function normalizeSourceId(value) {
	if (!value) return null;
	return String(value)
		.replace(/^drafts\./, '')
		.replace(/^seed\./, '');
}

function normalizeDocumentId(value) {
	if (!value) return null;
	return String(value).replace(/^drafts\./, '');
}

function normalizeComparableText(value) {
	if (!value) return null;
	return String(value).trim().toLowerCase();
}

function buildDocIdentityKeys(type, doc, index) {
	const keys = [];

	const sourceId = normalizeSourceId(doc?._sourceId || doc?._id);
	if (sourceId) keys.push(`${type}:source:${normalizeComparableText(sourceId)}`);

	const slug = normalizeComparableText(doc?.slug?.current);
	if (slug) keys.push(`${type}:slug:${slug}`);

	const name = normalizeComparableText(doc?.name);
	if (name) keys.push(`${type}:name:${name}`);

	const title = normalizeComparableText(doc?.title?.en || doc?.title?.id);
	if (title) keys.push(`${type}:title:${title}`);

	if (keys.length === 0) {
		keys.push(`${type}:index:${index}`);
	}

	return keys;
}

function dedupeCollectionDocs(key, type, docs) {
	const seen = new Set();
	const deduped = [];

	for (let i = 0; i < docs.length; i += 1) {
		const doc = docs[i];
		const identityKeys = buildDocIdentityKeys(type, doc, i);
		const hasDuplicate = identityKeys.some((identityKey) => seen.has(identityKey));

		if (hasDuplicate) {
			console.warn(`⚠️  Skipping duplicate ${type} in ${key}.json: ${getDisplayTitle(doc)}`);
			continue;
		}

		for (const identityKey of identityKeys) {
			seen.add(identityKey);
		}

		deduped.push(doc);
	}

	return deduped;
}

function buildDeterministicId(type, payload) {
	if (singletonSet.has(type)) {
		return type;
	}

	if (canonicalIdTypes.has(type)) {
		if (type === 'client') {
			const source =
				payload.name || payload.title?.en || payload.title?.id || payload.slug?.current;
			if (source) {
				return `${type}-${sanitizePart(source)}`;
			}
		}

		const slug = payload.slug?.current;
		if (slug) {
			return `${type}-${sanitizePart(slug)}`;
		}

		const name = payload.name || payload.title?.en || payload.title?.id;
		if (name) {
			return `${type}-${sanitizePart(name)}`;
		}
	}

	const sourceId = normalizeSourceId(payload._sourceId);
	if (sourceId) {
		return sanitizePart(sourceId);
	}

	const slug = payload.slug?.current;
	if (slug) {
		return `${type}-${sanitizePart(slug)}`;
	}

	const name = payload.name || payload.title?.en || payload.title?.id;
	if (name) {
		return `${type}-${sanitizePart(name)}`;
	}

	return `${type}-${sanitizePart(Date.now())}`;
}

function replaceRefs(value, map) {
	if (Array.isArray(value)) {
		return value.map((item) => replaceRefs(item, map));
	}

	if (!isObject(value)) return value;

	const next = {};
	for (const [key, child] of Object.entries(value)) {
		next[key] = replaceRefs(child, map);
	}

	if (next._type === 'reference' && next._ref) {
		const normalized = normalizeSourceId(next._ref);
		if (normalized && map.has(normalized)) {
			next._ref = map.get(normalized);
		}
	}

	if ((next._type === 'image' || next._type === 'file') && isObject(next.asset)) {
		const normalized = normalizeSourceId(next.asset._ref);
		if (normalized && map.has(normalized)) {
			next.asset = {
				...next.asset,
				_ref: map.get(normalized)
			};
		}
	}

	return next;
}

async function assertNoDuplicateSlugs(type) {
	const rows = await client.fetch(
		'*[_type == $type && defined(slug.current)]{_id, "slug": slug.current}',
		{ type }
	);

	const groups = new Map();
	for (const row of rows) {
		if (!groups.has(row.slug)) groups.set(row.slug, []);
		groups.get(row.slug).push(row._id);
	}

	const duplicates = [];
	for (const [slug, ids] of groups.entries()) {
		if (ids.length > 1) duplicates.push({ slug, ids });
	}

	if (duplicates.length === 0) return;

	const preview = duplicates
		.slice(0, 10)
		.map((item) => `${item.slug} => ${item.ids.join(', ')}`)
		.join(' | ');

	throw new Error(
		`Duplicate ${type} slugs detected in dataset (${duplicates.length} groups). Resolve before seed. ${preview}`
	);
}

async function readJsonIfExists(filePath) {
	try {
		const content = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(content);
	} catch {
		return null;
	}
}

async function loadSeedDataFromFiles(seedData) {
	let loadedFiles = 0;

	for (const type of singletonTypes) {
		const filePath = path.join(seedDir, `${type}.json`);
		const fileData = await readJsonIfExists(filePath);
		if (!fileData || typeof fileData !== 'object' || Array.isArray(fileData)) continue;

		const existingSourceId = seedData[type]?._sourceId;
		seedData[type] = {
			...fileData,
			_type: type,
			_sourceId: fileData._sourceId || existingSourceId || type
		};
		loadedFiles += 1;
	}

	for (const [key, type] of documentMappings) {
		const filePath = path.join(seedDir, `${key}.json`);
		const fileData = await readJsonIfExists(filePath);
		if (!Array.isArray(fileData)) continue;

		const existingBySlug = new Map();
		for (const existingDoc of seedData[key] || []) {
			if (existingDoc?.slug?.current) {
				existingBySlug.set(existingDoc.slug.current, existingDoc._sourceId);
			}
		}

		const mappedDocs = fileData.map((doc, index) => {
			const slug = doc?.slug?.current;
			return {
				...doc,
				_type: type,
				_sourceId:
					doc?._sourceId ||
					(slug ? existingBySlug.get(slug) : null) ||
					doc?._id ||
					`${type}-${index + 1}`
			};
		});

		seedData[key] = dedupeCollectionDocs(key, type, mappedDocs);
		loadedFiles += 1;
	}

	return loadedFiles;
}

async function resolveExistingDocumentId(type, payload) {
	if (singletonSet.has(type)) {
		const bySingletonId = await client.fetch('*[_id == $id][0]{_id}', { id: type });
		if (bySingletonId?._id) return normalizeDocumentId(bySingletonId._id);

		const singletonByType = await client.fetch('*[_type == $type][0]{_id}', { type });
		if (singletonByType?._id) return normalizeDocumentId(singletonByType._id);
	}

	if (canonicalIdTypes.has(type)) {
		const deterministicId = buildDeterministicId(type, payload);
		if (deterministicId) {
			const byDeterministicId = await client.fetch('*[_id == $id][0]{_id}', {
				id: deterministicId
			});
			if (byDeterministicId?._id) return normalizeDocumentId(byDeterministicId._id);
		}
	}

	const sourceId = normalizeSourceId(payload._sourceId);
	if (sourceId) {
		const bySourceId = await client.fetch('*[_id == $id][0]{_id}', { id: sourceId });
		if (bySourceId?._id) return normalizeDocumentId(bySourceId._id);
	}

	if (payload.slug?.current) {
		const bySlug = await client.fetch('*[_type == $type && slug.current == $slug][0]{_id}', {
			type,
			slug: payload.slug.current
		});
		if (bySlug?._id) return normalizeDocumentId(bySlug._id);
	}

	if ((type === 'client' || type === 'team') && payload.name) {
		const byName = await client.fetch('*[_type == $type && name == $name][0]{_id}', {
			type,
			name: payload.name
		});
		if (byName?._id) return normalizeDocumentId(byName._id);
	}

	if (payload.title?.en || payload.title?.id) {
		const title = payload.title.en || payload.title.id;
		const byTitle = await client.fetch(
			'*[_type == $type && (title.en == $title || title.id == $title)][0]{_id}',
			{
				type,
				title
			}
		);
		if (byTitle?._id) return normalizeDocumentId(byTitle._id);
	}

	return null;
}

async function uploadAssets(manifest, kind) {
	const assets = Array.isArray(manifest) ? manifest : [];
	if (assets.length === 0) return new Map();

	const shaToAssets = new Map();
	const fileRows = [];

	for (const asset of assets) {
		const localPath = asset?.localPath ? path.join(seedDir, asset.localPath) : null;
		if (!localPath) continue;

		try {
			const buffer = await fs.readFile(localPath);
			const sha = createHash('sha1').update(buffer).digest('hex');
			fileRows.push({ asset, localPath, buffer, sha });
			if (!shaToAssets.has(sha)) shaToAssets.set(sha, []);
			shaToAssets.get(sha).push(asset._id);
		} catch (err) {
			console.error(`   ❌ Failed reading ${kind} asset file ${asset?._id}:`, err.message);
		}
	}

	const uniqueShas = Array.from(shaToAssets.keys());
	const existingBySha = new Map();

	const chunkSize = 200;
	for (let i = 0; i < uniqueShas.length; i += chunkSize) {
		const chunk = uniqueShas.slice(i, i + chunkSize);
		const query =
			kind === 'image'
				? '*[_type == "sanity.imageAsset" && sha1hash in $hashes]{_id, sha1hash}'
				: '*[_type == "sanity.fileAsset" && sha1hash in $hashes]{_id, sha1hash}';

		const existing = await client.fetch(query, { hashes: chunk });
		for (const row of existing) {
			if (!existingBySha.has(row.sha1hash)) {
				existingBySha.set(row.sha1hash, row._id);
			}
		}
	}

	const map = new Map();

	for (const row of fileRows) {
		const sourceAssetId = normalizeSourceId(row.asset._id);
		const existingId = existingBySha.get(row.sha);

		if (existingId) {
			map.set(sourceAssetId, existingId);
			console.log(`   ↩️  Reusing ${kind} asset: ${row.asset.originalFilename || sourceAssetId}`);
			continue;
		}

		try {
			const uploaded = await client.assets.upload(kind, row.buffer, {
				filename: row.asset.originalFilename || path.basename(row.localPath),
				contentType: row.asset.mimeType || undefined
			});
			map.set(sourceAssetId, uploaded._id);
			existingBySha.set(row.sha, uploaded._id);
			console.log(`   ✅ Uploaded ${kind} asset: ${row.asset.originalFilename || sourceAssetId}`);
		} catch (err) {
			console.error(`   ❌ Failed uploading ${kind} asset ${row.asset?._id}:`, err.message);
		}
	}

	return map;
}

async function buildAssetIdMap() {
	const manifestPath = path.join(seedDir, 'assets-manifest.json');
	const manifest = await readJsonIfExists(manifestPath);

	if (!manifest) {
		console.log('ℹ️  assets-manifest.json not found, skipping asset upload');
		return new Map();
	}

	console.log('🖼️  Syncing image assets...');
	const imageMap = await uploadAssets(manifest.images, 'image');

	console.log('📎 Syncing file assets...');
	const fileMap = await uploadAssets(manifest.files, 'file');

	return new Map([...imageMap, ...fileMap]);
}

async function buildDocumentPlan(seedData) {
	const plan = [];

	for (const type of singletonTypes) {
		if (!seedData[type]) continue;
		plan.push({
			type,
			key: type,
			doc: seedData[type]
		});
	}

	for (const [key, type] of documentMappings) {
		const docs = Array.isArray(seedData[key]) ? seedData[key] : [];
		for (const doc of docs) {
			plan.push({ type, key, doc });
		}
	}

	const idMap = new Map();

	for (const entry of plan) {
		const existingId = await resolveExistingDocumentId(entry.type, entry.doc);
		const targetId = existingId || buildDeterministicId(entry.type, entry.doc);
		const sourceId = normalizeSourceId(entry.doc._sourceId);

		entry.targetId = targetId;
		entry.exists = Boolean(existingId);

		if (sourceId) idMap.set(sourceId, targetId);
		idMap.set(targetId, targetId);
	}

	return { plan, idMap };
}

async function validatePlannedDocumentIds(plan) {
	const targetIdToEntries = new Map();

	for (const entry of plan) {
		if (!entry?.targetId) continue;

		if (canonicalIdTypes.has(entry.type) && !entry.targetId.startsWith(`${entry.type}-`)) {
			throw new Error(
				`Invalid canonical ID for ${entry.type}: ${entry.targetId}. ` +
					`Expected prefix ${entry.type}-`
			);
		}

		if (!targetIdToEntries.has(entry.targetId)) {
			targetIdToEntries.set(entry.targetId, []);
		}

		targetIdToEntries.get(entry.targetId).push(entry);
	}

	const duplicateTargetIds = Array.from(targetIdToEntries.entries()).filter(
		([, entries]) => entries.length > 1
	);

	if (duplicateTargetIds.length > 0) {
		const preview = duplicateTargetIds
			.slice(0, 10)
			.map(([targetId, entries]) => {
				const labels = entries
					.map((entry) => `${entry.type}:${getDisplayTitle(entry.doc)}`)
					.join(' | ');
				return `${targetId} => ${labels}`;
			})
			.join(' ; ');

		throw new Error(
			`Target ID collision detected (${duplicateTargetIds.length} IDs). ` +
				`Resolve duplicate slug/name/source values before seed. ${preview}`
		);
	}

	const targetIds = Array.from(targetIdToEntries.keys());
	if (targetIds.length === 0) return;

	const existingById = await client.fetch('*[_id in $ids]{_id,_type}', { ids: targetIds });
	const existingTypeById = new Map(existingById.map((row) => [row._id, row._type]));

	const typeConflicts = [];
	for (const entry of plan) {
		const existingType = existingTypeById.get(entry.targetId);
		if (existingType && existingType !== entry.type) {
			typeConflicts.push({
				targetId: entry.targetId,
				expectedType: entry.type,
				existingType
			});
		}
	}

	if (typeConflicts.length > 0) {
		const preview = typeConflicts
			.slice(0, 10)
			.map((item) => `${item.targetId} expected=${item.expectedType} existing=${item.existingType}`)
			.join(' ; ');

		throw new Error(
			`Target ID type conflict detected (${typeConflicts.length} IDs). ${preview}. ` +
				`Rename conflicting source data before seed.`
		);
	}
}

async function importPlannedDocument(entry, refMap) {
	const type = entry.type;
	const base = replaceRefs(entry.doc, refMap);
	const payload = { ...base };
	delete payload._sourceId;

	try {
		const title = getDisplayTitle(payload);

		if (entry.exists) {
			console.log(`   📝 Updating ${type}: ${title}`);
			await client.createOrReplace({
				_id: entry.targetId,
				_type: type,
				...payload
			});
			return;
		}

		console.log(`   ➕ Creating ${type}: ${title}`);
		await client.create({
			_id: entry.targetId,
			_type: type,
			...payload
		});
	} catch (err) {
		console.error(`   ❌ Error importing ${type}:`, err.message);
	}
}

async function discardImportedDrafts(entries) {
	const publishedIds = Array.from(new Set(entries.map((entry) => entry.targetId).filter(Boolean)));
	if (publishedIds.length === 0) return;

	const draftIds = publishedIds.map((id) => `drafts.${id}`);
	const existingDrafts = await client.fetch('*[_id in $ids]{_id}', { ids: draftIds });
	if (!Array.isArray(existingDrafts) || existingDrafts.length === 0) return;

	let tx = client.transaction();
	for (const draft of existingDrafts) {
		tx = tx.delete(draft._id);
	}

	await tx.commit();
	console.log(`🧹 Removed ${existingDrafts.length} imported draft document(s)`);
}

async function verifyImportedPublishedDocuments(entries) {
	const publishedIds = Array.from(new Set(entries.map((entry) => entry.targetId).filter(Boolean)));
	if (publishedIds.length === 0) return;

	const existingPublished = await client.fetch('*[_id in $ids]{_id}', { ids: publishedIds });
	const existingSet = new Set(existingPublished.map((row) => row._id));
	const missing = publishedIds.filter((id) => !existingSet.has(id));

	if (missing.length > 0) {
		throw new Error(
			`Published verification failed. Missing ${missing.length} document(s): ${missing.join(', ')}`
		);
	}

	const draftIds = publishedIds.map((id) => `drafts.${id}`);
	const leftoverDrafts = await client.fetch('*[_id in $ids]{_id}', { ids: draftIds });
	if (leftoverDrafts.length > 0) {
		throw new Error(
			`Draft cleanup verification failed. Remaining draft document(s): ${leftoverDrafts.map((row) => row._id).join(', ')}`
		);
	}

	console.log(
		`✅ Verified ${publishedIds.length} document(s) are published and frontend-fetchable`
	);
}

async function importData() {
	console.log('🚀 Importing Sanity data...\n');

	const seedData = {};
	const loadedSeedFiles = await loadSeedDataFromFiles(seedData);

	if (loadedSeedFiles === 0) {
		throw new Error(
			`No seed JSON files found in ${seedDir}. Run "pnpm export" first to generate per-type data files.`
		);
	}

	console.log(`📂 Loaded ${loadedSeedFiles} seed file(s) from ${seedDir}`);

	if (onlyValues.size > 0) {
		console.log(`🎯 Filter active: ${Array.from(onlyValues).join(', ')}`);
	}

	if (argSkipAssets) {
		console.log('⏭️  Skipping asset sync (--skip-assets)');
	}

	if (shouldIncludeCollection('posts', 'post')) {
		await assertNoDuplicateSlugs('post');
	}

	if (shouldIncludeCollection('projects', 'project')) {
		await assertNoDuplicateSlugs('project');
	}

	const assetIdMap = argSkipAssets ? new Map() : await buildAssetIdMap();
	const { plan, idMap } = await buildDocumentPlan(seedData);
	await validatePlannedDocumentIds(plan);
	const refMap = new Map([...idMap, ...assetIdMap]);

	for (const type of singletonTypes) {
		if (!shouldIncludeSingleton(type)) continue;
		const entries = plan.filter((entry) => entry.type === type);
		if (entries.length === 0) continue;
		console.log(`📦 Importing ${type}...`);
		for (const entry of entries) {
			await importPlannedDocument(entry, refMap);
		}
	}

	for (const [key, type] of documentMappings) {
		if (!shouldIncludeCollection(key, type)) continue;
		const entries = plan.filter((entry) => entry.key === key && entry.type === type);
		if (entries.length === 0) continue;
		console.log(`📦 Importing ${key}...`);
		for (const entry of entries) {
			await importPlannedDocument(entry, refMap);
		}
	}

	const importedEntries = plan.filter((entry) => {
		if (singletonSet.has(entry.type)) return shouldIncludeSingleton(entry.type);
		return shouldIncludeCollection(entry.key, entry.type);
	});

	await discardImportedDrafts(importedEntries);
	await verifyImportedPublishedDocuments(importedEntries);

	console.log('\n✅ Import complete!');
}

importData().catch((err) => {
	console.error('❌ Import failed:', err);
	process.exit(1);
});
