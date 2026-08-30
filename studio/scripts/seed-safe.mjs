#!/usr/bin/env node
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

const extraArgs = process.argv.slice(2);

function run(command, args) {
	const result = spawnSync(command, args, {
		cwd: rootDir,
		stdio: 'inherit',
		env: process.env
	});

	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}
}

run('pnpm', ['audit:seed']);
run('node', ['sanity/scripts/seed.mjs', ...extraArgs]);
