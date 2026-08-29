#!/usr/bin/env node
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
process.env.SANITY_TOKEN = envVars.SANITY_TOKEN;

const projectId = 'j996ej4v';
const dataset = 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_TOKEN;

if (!token) {
	console.error('❌ Please set SANITY_TOKEN environment variable');
	process.exit(1);
}

const publishedClient = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false,
	perspective: 'published'
});

const rawClient = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false,
	perspective: 'raw'
});

const outputDir = path.resolve(__dirname, '../data');
const assetsDir = path.join(outputDir, 'assets');
const imagesDir = path.join(assetsDir, 'images');
const filesDir = path.join(assetsDir, 'files');

const includeRaw = process.argv.includes('--with-raw');
const includeAssets = process.argv.includes('--with-assets');

const singletonNames = new Set([
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
]);

const queries = {
	services: `*[_type == "service"] | order(order asc) {
    _id,
    _type,
		seo,
    title,
    slug,
    icon,
    longDescription,
    subServices,
    benefits,
		image,
    order,
  }`,

	posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    _type,
		seo,
    title,
    slug,
		body,
		author,
		category,
		tags,
		image,
    featured,
		publishedAt
  }`,

	projects: `*[_type == "project"] | order(publishedAt desc) {
    _id,
    _type,
		seo,
    title,
    slug,
		client,
		challenge,
		solution,
		result,
		category,
    techStack,
		image,
		gallery,
		stats,
		testimonial,
    featured,
		publishedAt
  }`,

	categories: `*[_type == "category"] | order(title asc) {
    _id,
    _type,
    title,
    slug,
		description,
		color,
		icon,
		type
  }`,

	team: `*[_type == "team"] | order(order asc) {
    _id,
    _type,
    name,
    slug,
		role,
    bio,
		image,
		email,
    order,
		social
  }`,

	clients: `*[_type == "client"] | order(order asc) {
    _id,
    _type,
    name,
    website,
		logo,
		icon,
		order
  }`,

	homePage: `*[_type == "homePage"][0]`,
	aboutPage: `*[_type == "aboutPage"][0]`,
	servicesPage: `*[_type == "servicesPage"][0]`,
	portfolioPage: `*[_type == "portfolioPage"][0]`,
	blogPage: `*[_type == "blogPage"][0]`,
	contactPage: `*[_type == "contactPage"][0]`,
	termsPage: `*[_type == "termsPage"][0]`,
	privacyPage: `*[_type == "privacyPage"][0]`,

	generalSettings: `*[_type == "generalSettings"][0]`,
	informationSettings: `*[_type == "informationSettings"][0]`,
	configuration: `*[_type == "configuration"][0]`,
	menuSettings: `*[_type == "menuSettings"][0]`
};

function findDuplicateValues(items) {
	const counts = new Map();

	for (const item of items) {
		if (!item && item !== 0) continue;
		counts.set(item, (counts.get(item) || 0) + 1);
	}

	return Array.from(counts.entries())
		.filter(([, count]) => count > 1)
		.map(([value, count]) => ({ value, count }));
}

function assertUniqueClients(rows, scopeLabel) {
	if (!Array.isArray(rows)) return;

	const names = rows.map((row) => row?.name).filter(Boolean);
	const orders = rows.map((row) => row?.order).filter((value) => typeof value === 'number');

	const duplicateNames = findDuplicateValues(names);
	const duplicateOrders = findDuplicateValues(orders);

	if (duplicateNames.length === 0 && duplicateOrders.length === 0) return;

	const namePreview = duplicateNames
		.slice(0, 10)
		.map((item) => `"${item.value}" (${item.count}x)`)
		.join(', ');
	const orderPreview = duplicateOrders
		.slice(0, 10)
		.map((item) => `${item.value} (${item.count}x)`)
		.join(', ');

	throw new Error(
		`Duplicate clients detected in ${scopeLabel}. ` +
			`Name duplicates: ${duplicateNames.length}${namePreview ? ` [${namePreview}]` : ''}. ` +
			`Order duplicates: ${duplicateOrders.length}${orderPreview ? ` [${orderPreview}]` : ''}. ` +
			'Clean up duplicate client documents in Sanity before exporting.'
	);
}

async function ensureDir(dir) {
	try {
		await fs.mkdir(dir, { recursive: true });
	} catch {
		// Directory likely already exists, which is fine
	}
}

function toRawQuery(name, query) {
	if (!singletonNames.has(name)) return query;
	return query.replace(/\[0\]\s*$/, '');
}

function isObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function sanitizePart(value) {
	return String(value || 'unknown').replace(/[^a-zA-Z0-9._-]/g, '_');
}

function stripId(doc) {
	if (!isObject(doc)) return doc;
	const { _id, ...rest } = doc;
	return {
		_sourceId: _id,
		...rest
	};
}

async function downloadAssets(assets, targetDir) {
	await ensureDir(targetDir);

	const manifest = [];

	for (const asset of assets) {
		if (!asset?.url) continue;

		const ext = sanitizePart(asset.extension || 'bin');
		const original = sanitizePart(asset.originalFilename || 'asset');
		const id = sanitizePart(asset._id);
		const fileName = `${id}__${original}.${ext}`;
		const localPath = path.join(targetDir, fileName);

		try {
			const response = await fetch(asset.url);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}

			const buffer = Buffer.from(await response.arrayBuffer());
			await fs.writeFile(localPath, buffer);

			manifest.push({
				_id: asset._id,
				url: asset.url,
				mimeType: asset.mimeType,
				originalFilename: asset.originalFilename,
				localPath: path.relative(outputDir, localPath),
				size: buffer.length
			});
		} catch (err) {
			console.error(`   ❌ Failed downloading asset ${asset._id}:`, err.message);
		}
	}

	return manifest;
}

async function exportData() {
	console.log('🚀 Exporting Sanity data...\n');
	await ensureDir(outputDir);

	if (includeAssets) {
		await ensureDir(assetsDir);
		await ensureDir(imagesDir);
		await ensureDir(filesDir);
	}

	const results = {};
	const rawResults = {};
	let hasErrors = false;

	for (const [name, query] of Object.entries(queries)) {
		try {
			console.log(`📦 Fetching ${name}...`);
			const data = await publishedClient.fetch(query);
			const rawData = includeRaw ? await rawClient.fetch(toRawQuery(name, query)) : null;

			if (name === 'clients') {
				assertUniqueClients(data, 'published dataset');
				if (includeRaw) {
					assertUniqueClients(rawData, 'raw dataset');
				}
			}

			results[name] = data;
			if (includeRaw) {
				rawResults[name] = rawData;
			}
			await fs.writeFile(path.join(outputDir, `${name}.json`), JSON.stringify(data, null, 2));
			if (includeRaw) {
				await fs.writeFile(
					path.join(outputDir, `${name}.raw.json`),
					JSON.stringify(rawData, null, 2)
				);
			}
			const count = Array.isArray(data) ? data.length : data ? 1 : 0;
			if (includeRaw) {
				const rawCount = Array.isArray(rawData) ? rawData.length : rawData ? 1 : 0;
				console.log(`   ✅ ${name}: ${count} published, ${rawCount} raw (incl. drafts) saved`);
			} else {
				console.log(`   ✅ ${name}: ${count} published saved`);
			}
		} catch (err) {
			hasErrors = true;
			console.error(`   ❌ Error fetching ${name}:`, err.message);
		}
	}

	if (hasErrors) {
		throw new Error('Export aborted because one or more data checks failed.');
	}

	if (includeRaw) {
		await fs.writeFile(path.join(outputDir, 'all-data.json'), JSON.stringify(results, null, 2));
		await fs.writeFile(
			path.join(outputDir, 'all-data.raw.json'),
			JSON.stringify(rawResults, null, 2)
		);

		console.log('\n📚 Fetching complete raw document dump...');
		const completeRawDump = await rawClient.fetch('*');
		await fs.writeFile(
			path.join(outputDir, 'all-documents.raw.json'),
			JSON.stringify(completeRawDump, null, 2)
		);
		console.log(`   ✅ all-documents.raw.json: ${completeRawDump.length} docs saved`);

		const draftSeedData = {};
		for (const [name, data] of Object.entries(rawResults)) {
			if (Array.isArray(data)) {
				const drafts = data.filter((item) => item?._id?.startsWith('drafts.'));

				if (singletonNames.has(name)) {
					draftSeedData[name] = drafts[0] ? stripId(drafts[0]) : null;
				} else {
					draftSeedData[name] = drafts.map(stripId);
				}
			} else if (data?._id?.startsWith('drafts.')) {
				draftSeedData[name] = stripId(data);
			}
		}

		await fs.writeFile(
			path.join(outputDir, 'drafts-data.json'),
			JSON.stringify(draftSeedData, null, 2)
		);
	}

	if (includeAssets) {
		console.log('\n📦 Fetching asset documents from dataset...');
		const imageAssets = await rawClient.fetch(`*[_type == "sanity.imageAsset"]{
			_id,
			url,
			originalFilename,
			extension,
			mimeType
		}`);
		const fileAssets = await rawClient.fetch(`*[_type == "sanity.fileAsset"]{
			_id,
			url,
			originalFilename,
			extension,
			mimeType
		}`);
		console.log(`   ✅ Found ${imageAssets.length} image assets, ${fileAssets.length} file assets`);

		console.log('\n⬇️  Downloading image assets...');
		const imageManifest = await downloadAssets(imageAssets, imagesDir);
		console.log(`   ✅ Downloaded ${imageManifest.length}/${imageAssets.length} image assets`);

		console.log('\n⬇️  Downloading file assets...');
		const fileManifest = await downloadAssets(fileAssets, filesDir);
		console.log(`   ✅ Downloaded ${fileManifest.length}/${fileAssets.length} file assets`);

		const assetManifest = {
			generatedAt: new Date().toISOString(),
			projectId,
			dataset,
			totalImageAssetCount: imageAssets.length,
			totalFileAssetCount: fileAssets.length,
			images: imageManifest,
			files: fileManifest
		};

		await fs.writeFile(
			path.join(outputDir, 'assets-manifest.json'),
			JSON.stringify(assetManifest, null, 2)
		);
	}

	console.log('\n✅ Export complete!');
	console.log(`\n📁 Files created in: ${outputDir}`);

	if (!includeRaw) {
		console.log('ℹ️  Raw exports skipped (use --with-raw to include raw/all-data files).');
	}

	if (!includeAssets) {
		console.log('ℹ️  Asset download skipped (use --with-assets to download assets).');
	}
}

exportData().catch((err) => {
	console.error('❌ Export failed:', err);
	process.exit(1);
});
