import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'j996ej4v';

export default defineCliConfig({
	api: {
		projectId,
		dataset: 'production'
	},
	studioHost: 'bits'
});
