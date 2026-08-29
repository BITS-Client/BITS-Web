<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	interface Props {
		children?: import('svelte').Snippet;
		animation?: 'fade' | 'fly-up' | 'fly-down' | 'fly-left' | 'fly-right' | 'scale';
		delay?: number;
		duration?: number;
		threshold?: number;
		once?: boolean;
		class?: string;
	}

	let {
		children,
		animation = 'fly-up',
		delay = 0,
		duration = 600,
		threshold = 0.1,
		once = true,
		class: className = ''
	}: Props = $props();

	let element: HTMLElement;
	let isVisible = $state(false);
	let hasAnimated = $state(false);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			isVisible = true;
			hasAnimated = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (once && hasAnimated) return;
						isVisible = true;
						hasAnimated = true;
						if (once) {
							observer.disconnect();
						}
					} else if (!once) {
						isVisible = false;
					}
				});
			},
			{ threshold }
		);

		if (element) {
			observer.observe(element);
		}

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	});

	function getTransition(node: HTMLElement) {
		switch (animation) {
			case 'fade':
				return fade(node, { duration, delay });
			case 'fly-up':
				return fly(node, { y: 50, duration, delay });
			case 'fly-down':
				return fly(node, { y: -50, duration, delay });
			case 'fly-left':
				return fly(node, { x: 50, duration, delay });
			case 'fly-right':
				return fly(node, { x: -50, duration, delay });
			case 'scale':
				return scale(node, { duration, delay, start: 0.8 });
			default:
				return fly(node, { y: 50, duration, delay });
		}
	}
</script>

<div bind:this={element} class={className}>
	{#if isVisible}
		<div in:getTransition>
			{@render children?.()}
		</div>
	{:else}
		<div style="opacity: 0;">
			{@render children?.()}
		</div>
	{/if}
</div>
