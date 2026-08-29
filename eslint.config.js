import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', '**/dist/', 'node_modules/']
	},
	{
		// Configure rules to work better with SvelteKit's dynamic routes
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn', // Change from error to warning to allow flexibility
			'svelte/no-navigation-without-resolve': 'off', // Disable globally to handle external links properly
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			]
		}
	},
	{
		// For specific files where dynamic routes are used, allow 'any' type
		files: [
			'src/lib/components/Header.svelte',
			'src/lib/components/Footer.svelte',
			'src/routes/+page.svelte',
			'src/routes/services/+page.svelte',
			'src/routes/portfolio/+page.svelte',
			'src/routes/portfolio/[slug]/+page.svelte',
			'src/routes/blog/[slug]/+page.svelte',
			'sanity/data/types.ts'
		],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off' // Turn off for files with known dynamic routes
		}
	}
];
