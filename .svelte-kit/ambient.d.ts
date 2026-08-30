
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const TURNSTILE_SECRET_KEY: string;
	export const SVELTEKIT_FORK: string;
	export const NODE_ENV: string;
	export const INIT_CWD: string;
	export const ANDROID_NDK_HOME: string;
	export const ANDROID_NDK: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const npm_config__jsr_registry: string;
	export const LC_NUMERIC: string;
	export const SSH_CONNECTION: string;
	export const ANDROID_HOME: string;
	export const npm_execpath: string;
	export const LC_ALL: string;
	export const FNM_MULTISHELL_PATH: string;
	export const _: string;
	export const FNM_NODE_DIST_MIRROR: string;
	export const NDK: string;
	export const FNM_VERSION_FILE_STRATEGY: string;
	export const npm_config_engine_strict: string;
	export const XDG_SESSION_TYPE: string;
	export const OLDPWD: string;
	export const LC_ADDRESS: string;
	export const LC_MONETARY: string;
	export const COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
	export const NODE_PATH: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_package_json: string;
	export const SSH_CLIENT: string;
	export const npm_package_engines_node: string;
	export const COREPACK_ROOT: string;
	export const npm_package_name: string;
	export const LC_MEASUREMENT: string;
	export const FNM_RESOLVE_ENGINES: string;
	export const LANGUAGE: string;
	export const npm_command: string;
	export const LOGNAME: string;
	export const npm_config_user_agent: string;
	export const AGENT: string;
	export const PWD: string;
	export const SSH_TTY: string;
	export const FNM_LOGLEVEL: string;
	export const npm_config_verify_deps_before_run: string;
	export const XDG_SESSION_CLASS: string;
	export const BUN_INSTALL: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const GIT_EXEC_PATH: string;
	export const HOME: string;
	export const npm_config_registry: string;
	export const MOTD_SHOWN: string;
	export const TERM: string;
	export const ANDROID_SDK_ROOT: string;
	export const XDG_SESSION_ID: string;
	export const OPENCODE: string;
	export const SHELL: string;
	export const npm_config_node_gyp: string;
	export const GIT_PREFIX: string;
	export const LC_IDENTIFICATION: string;
	export const PATH: string;
	export const NODE: string;
	export const XDG_RUNTIME_DIR: string;
	export const LANG: string;
	export const LC_PAPER: string;
	export const FNM_ARCH: string;
	export const LC_TELEPHONE: string;
	export const USER: string;
	export const OPENCODE_PID: string;
	export const FNM_DIR: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_lifecycle_script: string;
	export const npm_package_version: string;
	export const LC_NAME: string;
	export const npm_lifecycle_event: string;
	export const npm_config_npm_globalconfig: string;
	export const FNM_COREPACK_ENABLED: string;
	export const npm_config_globalconfig: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	export const PUBLIC_CONTACT_EMAIL: string;
	export const PUBLIC_CONTACT_FROM_EMAIL: string;
	export const PUBLIC_CONTACT_TO_EMAIL: string;
	export const PUBLIC_PHONE_DISPLAY: string;
	export const PUBLIC_SANITY_API_VERSION: string;
	export const PUBLIC_SANITY_DATASET: string;
	export const PUBLIC_SANITY_PROJECT_ID: string;
	export const PUBLIC_SITE_URL: string;
	export const PUBLIC_TURNSTILE_SITE_KEY: string;
	export const PUBLIC_WHATSAPP_NUMBER: string;
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		TURNSTILE_SECRET_KEY: string;
		SVELTEKIT_FORK: string;
		NODE_ENV: string;
		INIT_CWD: string;
		ANDROID_NDK_HOME: string;
		ANDROID_NDK: string;
		PNPM_SCRIPT_SRC_DIR: string;
		npm_config__jsr_registry: string;
		LC_NUMERIC: string;
		SSH_CONNECTION: string;
		ANDROID_HOME: string;
		npm_execpath: string;
		LC_ALL: string;
		FNM_MULTISHELL_PATH: string;
		_: string;
		FNM_NODE_DIST_MIRROR: string;
		NDK: string;
		FNM_VERSION_FILE_STRATEGY: string;
		npm_config_engine_strict: string;
		XDG_SESSION_TYPE: string;
		OLDPWD: string;
		LC_ADDRESS: string;
		LC_MONETARY: string;
		COREPACK_ENABLE_DOWNLOAD_PROMPT: string;
		NODE_PATH: string;
		pnpm_config_verify_deps_before_run: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_package_json: string;
		SSH_CLIENT: string;
		npm_package_engines_node: string;
		COREPACK_ROOT: string;
		npm_package_name: string;
		LC_MEASUREMENT: string;
		FNM_RESOLVE_ENGINES: string;
		LANGUAGE: string;
		npm_command: string;
		LOGNAME: string;
		npm_config_user_agent: string;
		AGENT: string;
		PWD: string;
		SSH_TTY: string;
		FNM_LOGLEVEL: string;
		npm_config_verify_deps_before_run: string;
		XDG_SESSION_CLASS: string;
		BUN_INSTALL: string;
		npm_node_execpath: string;
		SHLVL: string;
		GIT_EXEC_PATH: string;
		HOME: string;
		npm_config_registry: string;
		MOTD_SHOWN: string;
		TERM: string;
		ANDROID_SDK_ROOT: string;
		XDG_SESSION_ID: string;
		OPENCODE: string;
		SHELL: string;
		npm_config_node_gyp: string;
		GIT_PREFIX: string;
		LC_IDENTIFICATION: string;
		PATH: string;
		NODE: string;
		XDG_RUNTIME_DIR: string;
		LANG: string;
		LC_PAPER: string;
		FNM_ARCH: string;
		LC_TELEPHONE: string;
		USER: string;
		OPENCODE_PID: string;
		FNM_DIR: string;
		npm_config_frozen_lockfile: string;
		npm_lifecycle_script: string;
		npm_package_version: string;
		LC_NAME: string;
		npm_lifecycle_event: string;
		npm_config_npm_globalconfig: string;
		FNM_COREPACK_ENABLED: string;
		npm_config_globalconfig: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_CONTACT_EMAIL: string;
		PUBLIC_CONTACT_FROM_EMAIL: string;
		PUBLIC_CONTACT_TO_EMAIL: string;
		PUBLIC_PHONE_DISPLAY: string;
		PUBLIC_SANITY_API_VERSION: string;
		PUBLIC_SANITY_DATASET: string;
		PUBLIC_SANITY_PROJECT_ID: string;
		PUBLIC_SITE_URL: string;
		PUBLIC_TURNSTILE_SITE_KEY: string;
		PUBLIC_WHATSAPP_NUMBER: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
