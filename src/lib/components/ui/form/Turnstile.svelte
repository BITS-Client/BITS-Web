<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		sitekey: string;
		theme?: 'light' | 'dark' | 'auto';
		size?: 'normal' | 'compact';
		onVerify?: (token: string) => void;
		onError?: (error?: string) => void;
		onExpire?: () => void;
	}

	let { sitekey, theme = 'auto', size = 'normal', onVerify, onError, onExpire }: Props = $props();

	let container: HTMLDivElement;
	let widgetId: string | null = null;
	let scriptLoaded = $state(false);

	// Expose reset function
	export function reset() {
		if (widgetId && window.turnstile) {
			window.turnstile.reset(widgetId);
		}
	}

	// Expose getResponse function
	export function getResponse(): string | undefined {
		if (widgetId && window.turnstile) {
			return window.turnstile.getResponse(widgetId);
		}
		return undefined;
	}

	function loadScript(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (window.turnstile) {
				resolve();
				return;
			}

			const existingScript = document.querySelector(
				'script[src*="challenges.cloudflare.com/turnstile"]'
			);
			if (existingScript) {
				existingScript.addEventListener('load', () => resolve());
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
			script.async = true;
			script.defer = true;
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Failed to load Turnstile script'));
			document.head.appendChild(script);
		});
	}

	function renderWidget() {
		if (!container || !window.turnstile || widgetId) return;

		widgetId = window.turnstile.render(container, {
			sitekey,
			theme,
			size,
			callback: (token: string) => {
				onVerify?.(token);
			},
			'error-callback': (error?: string) => {
				onError?.(error);
			},
			'expired-callback': () => {
				onExpire?.();
			}
		});
	}

	onMount(() => {
		loadScript()
			.then(() => {
				scriptLoaded = true;
				renderWidget();
			})
			.catch((error) => {
				console.error('Turnstile script load error:', error);
				onError?.(error.message);
			});

		return () => {
			if (widgetId && window.turnstile) {
				window.turnstile.remove(widgetId);
			}
		};
	});

	// Re-render when sitekey or theme changes
	$effect(() => {
		if (scriptLoaded && sitekey && theme) {
			if (widgetId && window.turnstile) {
				window.turnstile.remove(widgetId);
				widgetId = null;
			}
			renderWidget();
		}
	});
</script>

<div
	bind:this={container}
	class="turnstile-container"
	class:turnstile-compact={size === 'compact'}
></div>

<style>
	.turnstile-container {
		min-height: 65px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.turnstile-compact {
		min-height: 50px;
	}

	:global(.turnstile-container iframe) {
		border-radius: 0.5rem;
	}
</style>
