import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) {
	throw new Error(
		'Missing SANITY_STUDIO_PROJECT_ID — export it or set it in sanity/.env (see sanity/.env.example)'
	);
}

export default defineCliConfig({
	api: {
		projectId,
		dataset: 'production'
	},
	studioHost: 'bits'
});
