#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');

const pages = [
	'homePage',
	'aboutPage',
	'servicesPage',
	'portfolioPage',
	'blogPage',
	'contactPage',
	'termsPage',
	'privacyPage'
];

const collections = ['services', 'posts', 'projects', 'categories', 'clients', 'team'];

function hasValue(value) {
	if (value === null || value === undefined) return false;
	if (typeof value === 'string') return value.trim().length > 0;
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === 'object') return Object.keys(value).length > 0;
	return true;
}

function pushError(errors, message) {
	errors.push(message);
}

function checkDuplicates(items, keySelector, label, errors) {
	const map = new Map();

	for (const item of items) {
		const key = keySelector(item);
		if (!key) continue;
		map.set(key, (map.get(key) || 0) + 1);
	}

	for (const [key, count] of map.entries()) {
		if (count > 1) {
			pushError(errors, `${label} duplicated: "${key}" appears ${count} times`);
		}
	}
}

function checkPortableTextKeys(posts, errors) {
	for (const post of posts) {
		for (const locale of ['en', 'id']) {
			const blocks = post.body?.[locale];
			if (!Array.isArray(blocks)) continue;

			for (let i = 0; i < blocks.length; i++) {
				const block = blocks[i];
				if (typeof block !== 'object' || !block) continue;

				if (!block._key) {
					pushError(errors, `post ${post._sourceId} body.${locale}[${i}] missing _key`);
				}

				const children = Array.isArray(block.children) ? block.children : [];
				for (let j = 0; j < children.length; j++) {
					const span = children[j];
					if (typeof span !== 'object' || !span) continue;
					if (!span._key) {
						pushError(
							errors,
							`post ${post._sourceId} body.${locale}[${i}].children[${j}] missing _key`
						);
					}
				}
			}
		}
	}
}

function checkSeo(doc, label, errors) {
	const seo = doc?.seo;
	if (!seo) {
		pushError(errors, `${label} missing seo`);
		return;
	}

	if (!hasValue(seo.title?.en) || !hasValue(seo.title?.id)) {
		pushError(errors, `${label} missing seo.title locales`);
	}

	if (!hasValue(seo.description?.en) || !hasValue(seo.description?.id)) {
		pushError(errors, `${label} missing seo.description locales`);
	}

	if (!Array.isArray(seo.keywords) || seo.keywords.length === 0) {
		pushError(errors, `${label} missing seo.keywords`);
	}

	if (!hasValue(seo.ogImage?.asset?._ref)) {
		pushError(errors, `${label} missing seo.ogImage`);
	}

	for (const flag of ['noIndex', 'noFollow', 'excludeFromSitemap']) {
		if (typeof seo[flag] !== 'boolean') {
			pushError(errors, `${label} missing seo.${flag} boolean`);
		}
	}
}

async function readJson(fileName) {
	const filePath = path.join(dataDir, fileName);
	const raw = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(raw);
}

async function loadSeedFromFiles() {
	const seed = {};

	for (const key of collections) {
		seed[key] = await readJson(`${key}.json`);
	}

	for (const page of pages) {
		seed[page] = await readJson(`${page}.json`);
	}

	return seed;
}

async function main() {
	const errors = [];
	const seed = await loadSeedFromFiles();

	for (const key of collections) {
		if (!Array.isArray(seed[key])) {
			pushError(errors, `missing collection array: ${key}`);
		}
	}

	for (const page of pages) {
		if (!seed[page]) {
			pushError(errors, `missing page singleton: ${page}`);
			continue;
		}
		checkSeo(seed[page], page, errors);
	}

	checkDuplicates(seed.categories || [], (x) => x.slug?.current, 'category slug', errors);
	checkDuplicates(seed.posts || [], (x) => x.slug?.current, 'post slug', errors);
	checkDuplicates(seed.projects || [], (x) => x.slug?.current, 'project slug', errors);
	checkDuplicates(seed.clients || [], (x) => x.name, 'client name', errors);

	const clientIds = new Set((seed.clients || []).map((x) => x._sourceId || x._id));
	const teamIds = new Set((seed.team || []).map((x) => x._sourceId || x._id));
	const categoryById = new Map((seed.categories || []).map((x) => [x._sourceId || x._id, x.type]));

	const clientOrders = (seed.clients || []).map((x) => x.order);
	const uniqueOrders = new Set(clientOrders);
	if (clientOrders.length !== uniqueOrders.size) {
		pushError(errors, 'client order values must be unique');
	}

	if ([...uniqueOrders].some((v) => typeof v !== 'number')) {
		pushError(errors, 'client order values must be numbers');
	}

	for (const post of seed.posts || []) {
		if (!teamIds.has(post.author?._ref)) {
			pushError(
				errors,
				`post ${post._sourceId || post._id} has invalid author ref ${post.author?._ref}`
			);
		}

		const type = categoryById.get(post.category?._ref);
		if (type !== 'blog' && type !== 'both') {
			pushError(
				errors,
				`post ${post._sourceId || post._id} uses non-blog category ${post.category?._ref}`
			);
		}

		for (const field of [
			'title',
			'slug',
			'body',
			'author',
			'category',
			'tags',
			'image',
			'featured',
			'publishedAt'
		]) {
			if (!hasValue(post[field])) {
				pushError(errors, `post ${post._sourceId || post._id} missing ${field}`);
			}
		}

		checkSeo(post, `post ${post._sourceId || post._id}`, errors);
	}

	for (const project of seed.projects || []) {
		if (!clientIds.has(project.client?._ref)) {
			pushError(
				errors,
				`project ${project._sourceId || project._id} has invalid client ref ${project.client?._ref}`
			);
		}

		const type = categoryById.get(project.category?._ref);
		if (type !== 'portfolio' && type !== 'both') {
			pushError(
				errors,
				`project ${project._sourceId || project._id} uses non-portfolio category ${project.category?._ref}`
			);
		}

		for (const field of [
			'title',
			'slug',
			'client',
			'challenge',
			'solution',
			'result',
			'category',
			'techStack',
			'image',
			'gallery',
			'stats',
			'testimonial',
			'featured',
			'publishedAt'
		]) {
			if (!hasValue(project[field])) {
				pushError(errors, `project ${project._sourceId || project._id} missing ${field}`);
			}
		}

		checkSeo(project, `project ${project._sourceId || project._id}`, errors);
	}

	for (const service of seed.services || []) {
		for (const field of [
			'title',
			'slug',
			'icon',
			'longDescription',
			'subServices',
			'benefits',
			'image',
			'order'
		]) {
			if (!hasValue(service[field])) {
				pushError(errors, `service ${service._sourceId || service._id} missing ${field}`);
			}
		}

		checkSeo(service, `service ${service._sourceId || service._id}`, errors);
	}

	checkPortableTextKeys(seed.posts || [], errors);

	if (errors.length > 0) {
		console.error('❌ Seed audit failed:\n');
		for (const err of errors) {
			console.error(`- ${err}`);
		}
		process.exit(1);
	}

	console.log('✅ Seed audit passed');
}

main().catch((err) => {
	console.error('❌ Seed audit crashed:', err.message);
	process.exit(1);
});
