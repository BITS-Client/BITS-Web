<script lang="ts">
	import { Sun, Moon } from '$lib/icons/lucide';
	import { themeStore, toggleTheme } from '$lib/stores/theme';

	let theme = $state<'light' | 'dark'>('light');

	$effect(() => {
		const unsubscribe = themeStore.subscribe((value) => {
			theme = value;
		});
		return unsubscribe;
	});

	const isDark = $derived(theme === 'dark');
</script>

<button
	onclick={toggleTheme}
	class="theme-toggle-spectacular"
	aria-label="Toggle theme"
	title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	<!-- Animated background glow -->
	<span class="toggle-glow" aria-hidden="true"></span>

	<!-- Animated ring -->
	<span class="toggle-ring" aria-hidden="true"></span>

	<!-- Icon container with flip animation -->
	<span class="icon-container" class:is-dark={isDark}>
		<span class="icon-face icon-sun" aria-hidden="true">
			<Sun class="w-5 h-5" />
		</span>
		<span class="icon-face icon-moon" aria-hidden="true">
			<Moon class="w-5 h-5" />
		</span>
	</span>

	<!-- Sparkle particles -->
	<span class="sparkle sparkle-1" aria-hidden="true"></span>
	<span class="sparkle sparkle-2" aria-hidden="true"></span>
	<span class="sparkle sparkle-3" aria-hidden="true"></span>
</button>

<style>
	.theme-toggle-spectacular {
		--toggle-size: 44px;
		--sun-color: #f59e0b;
		--sun-glow: rgba(245, 158, 11, 0.4);
		--moon-color: #8b5cf6;
		--moon-glow: rgba(139, 92, 246, 0.4);

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

	:global(:root.dark) .theme-toggle-spectacular {
		background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
		box-shadow:
			0 2px 12px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.theme-toggle-spectacular:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow:
			0 8px 25px var(--sun-glow),
			inset 0 1px 0 rgba(255, 255, 255, 0.8);
	}

	:global(:root.dark) .theme-toggle-spectacular:hover {
		box-shadow:
			0 8px 25px var(--moon-glow),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.theme-toggle-spectacular:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 3px;
	}

	.theme-toggle-spectacular:active {
		transform: translateY(0) scale(0.95);
	}

	/* Animated glow background */
	.toggle-glow {
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle at center, var(--sun-glow), transparent 70%);
		opacity: 0;
		transition: opacity 0.4s ease;
		animation: glow-pulse 3s ease-in-out infinite;
	}

	:global(:root.dark) .toggle-glow {
		background: radial-gradient(circle at center, var(--moon-glow), transparent 70%);
	}

	.theme-toggle-spectacular:hover .toggle-glow {
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

	.theme-toggle-spectacular:hover .toggle-ring {
		border-color: var(--sun-color);
		animation: ring-spin 4s linear infinite;
	}

	:global(:root.dark) .theme-toggle-spectacular:hover .toggle-ring {
		border-color: var(--moon-color);
	}

	@keyframes ring-spin {
		0% {
			border-color: var(--sun-color);
			border-top-color: transparent;
			transform: rotate(0deg);
		}
		100% {
			border-color: var(--sun-color);
			border-top-color: transparent;
			transform: rotate(360deg);
		}
	}

	:global(:root.dark) .theme-toggle-spectacular:hover .toggle-ring {
		animation-name: ring-spin-dark;
	}

	@keyframes ring-spin-dark {
		0% {
			border-color: var(--moon-color);
			border-top-color: transparent;
			transform: rotate(0deg);
		}
		100% {
			border-color: var(--moon-color);
			border-top-color: transparent;
			transform: rotate(360deg);
		}
	}

	/* 3D flip icon container */
	.icon-container {
		position: relative;
		width: 24px;
		height: 24px;
		transform-style: preserve-3d;
		transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.icon-container.is-dark {
		transform: rotateY(180deg);
	}

	.icon-face {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		backface-visibility: hidden;
		transition: color 0.3s ease;
	}

	.icon-sun {
		color: var(--sun-color);
		transform: rotateY(0deg);
	}

	.icon-moon {
		color: var(--moon-color);
		transform: rotateY(180deg);
	}

	.theme-toggle-spectacular:hover .icon-sun {
		animation: sun-rays 2s ease-in-out infinite;
	}

	.theme-toggle-spectacular:hover .icon-moon {
		animation: moon-float 2s ease-in-out infinite;
	}

	@keyframes sun-rays {
		0%,
		100% {
			transform: rotateY(0deg) scale(1) rotate(0deg);
		}
		50% {
			transform: rotateY(0deg) scale(1.1) rotate(15deg);
		}
	}

	@keyframes moon-float {
		0%,
		100% {
			transform: rotateY(180deg) scale(1) translateY(0);
		}
		50% {
			transform: rotateY(180deg) scale(1.1) translateY(-2px);
		}
	}

	/* Sparkle particles */
	.sparkle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--sun-color);
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	:global(:root.dark) .sparkle {
		background: var(--moon-color);
	}

	.theme-toggle-spectacular:hover .sparkle {
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
		.theme-toggle-spectacular,
		.icon-container,
		.toggle-glow,
		.toggle-ring,
		.sparkle {
			animation: none !important;
			transition-duration: 0.1s !important;
		}

		.icon-container.is-dark {
			transform: none;
		}

		.icon-sun {
			display: block;
		}

		.icon-container.is-dark .icon-sun {
			display: none;
		}

		.icon-moon {
			display: none;
			transform: none;
		}

		.icon-container.is-dark .icon-moon {
			display: block;
		}
	}
</style>
