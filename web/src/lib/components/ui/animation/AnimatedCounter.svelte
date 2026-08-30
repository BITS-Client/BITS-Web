<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		value?: number;
		duration?: number;
		suffix?: string;
		prefix?: string;
		decimals?: number;
		class?: string;
	}

	let {
		value,
		duration = 2000,
		suffix = '',
		prefix = '',
		decimals = 0,
		class: className = ''
	}: Props = $props();

	let displayValue = $state(0);
	let element: HTMLElement;
	let hasStarted = $state(false);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			displayValue = value || 0;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasStarted && value !== undefined) {
						hasStarted = true;
						animateValue();
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
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

	function animateValue() {
		const startTime = Date.now();
		const startValue = 0;

		function update() {
			const currentTime = Date.now();
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function (ease-out cubic)
			const easedProgress = 1 - Math.pow(1 - progress, 3);

			displayValue = startValue + ((value || 0) - startValue) * easedProgress;

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				displayValue = value || 0;
			}
		}

		requestAnimationFrame(update);
	}

	const formattedValue = $derived(
		prefix + displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix
	);
</script>

<span bind:this={element} class={className}>
	{formattedValue}
</span>
