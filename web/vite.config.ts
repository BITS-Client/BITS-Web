import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

function sanitizeRollupOutput(output: unknown) {
	if (!output) return;

	if (Array.isArray(output)) {
		for (const entry of output) {
			if (entry && typeof entry === 'object' && 'codeSplitting' in entry) {
				delete (entry as { codeSplitting?: unknown }).codeSplitting;
			}
		}
		return;
	}

	if (typeof output === 'object' && 'codeSplitting' in output) {
		delete (output as { codeSplitting?: unknown }).codeSplitting;
	}
}

const removeLegacyRollupOption = {
	name: 'remove-legacy-rollup-option',
	configResolved(config: {
		build?: { rollupOptions?: { output?: unknown } };
		environments?: Record<string, { build?: { rollupOptions?: { output?: unknown } } }>;
	}) {
		sanitizeRollupOutput(config.build?.rollupOptions?.output);

		if (!config.environments) return;
		for (const envConfig of Object.values(config.environments)) {
			sanitizeRollupOutput(envConfig.build?.rollupOptions?.output);
		}
	}
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), removeLegacyRollupOption]
});
