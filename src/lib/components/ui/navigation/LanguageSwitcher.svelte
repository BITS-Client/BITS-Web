<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Locale } from '$lib/types';

	// Detect locale from URL pathname directly (syncs with layout)
	let locale = $state<Locale>('id');

	$effect(() => {
		const pathname = $page.url.pathname;
		const pathParts = pathname.split('/').filter(Boolean);
		locale = pathParts[0] === 'id' || pathParts[0] === 'en' ? (pathParts[0] as 'id' | 'en') : 'id';
	});

	const isIndonesian = $derived(locale === 'id');

	const currentPath = $derived(() => {
		const pathname = $page.url.pathname;
		const pathParts = pathname.split('/').filter(Boolean);

		if (pathParts[0] && ['id', 'en'].includes(pathParts[0])) {
			return '/' + pathParts.slice(1).join('/') || '/';
		}

		return pathname || '/';
	});

	async function switchLanguage(targetLocale: Locale) {
		const targetPath = `/${targetLocale}${currentPath()}`;
		await goto(targetPath, { keepFocus: true, noScroll: true });
	}

	async function handleLanguageToggle() {
		await switchLanguage(isIndonesian ? 'en' : 'id');
	}
</script>

<button
	onclick={handleLanguageToggle}
	class="lang-toggle"
	class:is-indonesian={isIndonesian}
	aria-label="Switch language"
	title={isIndonesian ? 'Switch to English' : 'Switch to Indonesian'}
>
	<span class="toggle-glow" aria-hidden="true"></span>
	<span class="toggle-ring" aria-hidden="true"></span>
	<span class="lang-text" class:is-indonesian={isIndonesian}>
		<span class="text-id">ID</span>
		<span class="text-en">EN</span>
	</span>
	<span class="sparkle sparkle-1" aria-hidden="true"></span>
	<span class="sparkle sparkle-2" aria-hidden="true"></span>
	<span class="sparkle sparkle-3" aria-hidden="true"></span>
</button>

<style>
	.lang-toggle {
		--toggle-size: 44px;
		--en-color: #3b82f6;
		--en-glow: rgba(59, 130, 246, 0.4);
		--id-color: #ef4444;
		--id-glow: rgba(239, 68, 68, 0.4);

		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--toggle-size);
		height: var(--toggle-size);
		border-radius: 50%;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
		border: 1px solid rgba(0, 0, 0, 0.5);
		cursor: pointer;
		overflow: hidden;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow:
			0 10px 20px -5px rgba(0, 0, 0, 0.08),
			0 6px 8px -4px rgba(0, 0, 0, 0.04),
			inset 0 1px 0 rgba(255, 255, 255, 0.9);
	}

	:global(.dark) .lang-toggle {
		background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
		box-shadow:
			0 2px 12px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.lang-toggle:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow:
			0 8px 25px var(--en-glow),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	.lang-toggle.is-indonesian:hover {
		box-shadow:
			0 8px 25px var(--id-glow),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	:global(.dark) .lang-toggle:hover {
		box-shadow:
			0 8px 25px var(--en-glow),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .lang-toggle.is-indonesian:hover {
		box-shadow:
			0 8px 25px var(--id-glow),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.lang-toggle:focus-visible {
		outline: 2px solid var(--en-color);
		outline-offset: 3px;
	}

	.lang-toggle.is-indonesian:focus-visible {
		outline-color: var(--id-color);
	}

	.lang-toggle:active {
		transform: translateY(0) scale(0.95);
	}

	/* Animated glow background */
	.toggle-glow {
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle at center, var(--en-glow), transparent 70%);
		opacity: 0;
		transition:
			opacity 0.4s ease,
			background 0.4s ease;
		animation: glow-pulse 3s ease-in-out infinite;
	}

	.lang-toggle.is-indonesian .toggle-glow {
		background: radial-gradient(circle at center, var(--id-glow), transparent 70%);
	}

	.lang-toggle:hover .toggle-glow {
		opacity: 1;
	}

	@keyframes glow-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
		}
	}

	/* Animated ring */
	.toggle-ring {
		position: absolute;
		inset: 2px;
		border-radius: 50%;
		border: 2px solid transparent;
		transition: border-color 0.3s ease;
	}

	.lang-toggle:hover .toggle-ring {
		border-color: var(--en-color);
		animation: ring-spin 4s linear infinite;
	}

	.lang-toggle.is-indonesian:hover .toggle-ring {
		border-color: var(--id-color);
	}

	@keyframes ring-spin {
		0% {
			border-top-color: transparent;
			transform: rotate(0deg);
		}
		100% {
			border-top-color: transparent;
			transform: rotate(360deg);
		}
	}

	/* Language text container */
	.lang-text {
		position: relative;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.8rem;
	}

	.text-en,
	.text-id {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.4s ease;
	}

	.text-en {
		opacity: 1;
		color: var(--en-color);
	}

	.text-id {
		opacity: 0;
		color: var(--id-color);
	}

	.lang-text.is-indonesian .text-en {
		opacity: 0;
	}

	.lang-text.is-indonesian .text-id {
		opacity: 1;
	}

	/* Sparkle particles */
	.sparkle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--en-color);
		border-radius: 50%;
		opacity: 0;
		transition:
			opacity 0.3s ease,
			background 0.3s ease;
	}

	.lang-toggle.is-indonesian .sparkle {
		background: var(--id-color);
	}

	.lang-toggle:hover .sparkle {
		opacity: 1;
		animation: sparkle-pop 1.5s ease-in-out infinite;
	}

	.sparkle-1 {
		top: 6px;
		right: 8px;
		animation-delay: 0s !important;
	}

	.sparkle-2 {
		bottom: 8px;
		left: 6px;
		animation-delay: 0.3s !important;
	}

	.sparkle-3 {
		top: 50%;
		right: 4px;
		animation-delay: 0.6s !important;
	}

	@keyframes sparkle-pop {
		0%,
		100% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.lang-toggle,
		.lang-text,
		.toggle-glow,
		.toggle-ring,
		.sparkle,
		.text-en,
		.text-id {
			animation: none !important;
			transition-duration: 0.1s !important;
		}
	}
</style>
