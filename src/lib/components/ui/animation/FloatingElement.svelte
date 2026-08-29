<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		children?: import('svelte').Snippet;
		duration?: number;
		delay?: number;
		amplitude?: number;
		class?: string;
	}

	let { children, duration, delay = 0, amplitude, class: className = '' }: Props = $props();

	let element: HTMLElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			return;
		}

		if (element) {
			element.style.animationDelay = `${delay}ms`;
			// Use the duration and amplitude values to configure the animation
			element.style.setProperty('--float-duration', `${duration}ms`);
			element.style.setProperty('--float-amplitude', `${amplitude}px`);
		}
	});
</script>

<div bind:this={element} class="floating-element {className}">
	{@render children?.()}
</div>

<style>
	.floating-element {
		animation: float var(--float-duration, 3s) ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(calc(-1 * var(--float-amplitude, 20px)));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.floating-element {
			animation: none;
		}
	}
</style>
