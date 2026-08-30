<script lang="ts">
	import { onMount } from 'svelte';
	import { loadingStore } from '$lib/stores/loadingStore';

	let visible = $state(true);

	onMount(() => {
		const unsubscribe = loadingStore.subscribe((s) => {
			visible = s.data || s.theme;
		});
		return unsubscribe;
	});
</script>

{#if visible}
	<div class="loading-backdrop" aria-busy="true" role="status">
		<div class="tech-grid"></div>
		<div class="scan-line"></div>

		<div class="spinner-wrapper">
			<div class="hexagon-ring">
				{#each Array(6) as _, i (i)}
					<div class="hexagon" style="--delay: {i * 0.15}s; --rotation: {i * 60}deg">
						<svg viewBox="0 0 100 100">
							<polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
						</svg>
					</div>
				{/each}
			</div>

			<div class="core">
				<div class="core-inner"></div>
				<div class="core-pulse"></div>
			</div>
		</div>

		<div class="loading-text">INITIALIZING...</div>
	</div>
{/if}

<style>
	.loading-backdrop {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
	}

	.tech-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(0, 255, 200, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 255, 200, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	.scan-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, transparent, #00ffc8, transparent);
		animation: scan 2s linear infinite;
		opacity: 0.5;
	}

	@keyframes scan {
		from {
			top: 0;
		}
		to {
			top: 100%;
		}
	}

	.spinner-wrapper {
		position: relative;
		width: 200px;
		height: 200px;
	}

	.hexagon-ring {
		position: absolute;
		inset: 0;
		animation: rotate 8s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.hexagon {
		position: absolute;
		width: 60px;
		height: 60px;
		top: 50%;
		left: 50%;
		margin: -30px 0 0 -30px;
		animation: float 2s ease-in-out infinite;
		animation-delay: var(--delay);
		transform: rotate(var(--rotation));
	}

	@keyframes float {
		0%,
		100% {
			transform: rotate(var(--rotation)) translateY(0);
			opacity: 0.6;
		}
		50% {
			transform: rotate(var(--rotation)) translateY(-10px);
			opacity: 1;
		}
	}

	.hexagon svg {
		width: 100%;
		height: 100%;
		stroke: #00ffc8;
		stroke-width: 2;
		fill: none;
		filter: drop-shadow(0 0 8px rgba(0, 255, 200, 0.6));
	}

	.core {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.core-inner {
		width: 40px;
		height: 40px;
		background: linear-gradient(135deg, #00ffc8, #00a5ff);
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		animation: coreRotate 3s linear infinite;
	}

	@keyframes coreRotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.core-pulse {
		position: absolute;
		inset: -20px;
		border: 2px solid rgba(0, 255, 200, 0.3);
		border-radius: 50%;
		animation: pulseRing 1.5s ease-out infinite;
	}

	@keyframes pulseRing {
		from {
			transform: scale(0.8);
			opacity: 1;
		}
		to {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	.loading-text {
		margin-top: 1.5rem;
		font-family: 'Courier New', monospace;
		font-size: 0.875rem;
		color: #00ffc8;
		letter-spacing: 0.2em;
		animation: textPulse 0.8s ease-in-out infinite;
	}

	@keyframes textPulse {
		0%,
		100% {
			opacity: 0.4;
			text-shadow: 0 0 5px rgba(0, 255, 200, 0.3);
		}
		50% {
			opacity: 1;
			text-shadow: 0 0 15px rgba(0, 255, 200, 0.8);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	@media (max-width: 480px) {
		.spinner-wrapper {
			width: 150px;
			height: 150px;
		}
		.loading-text {
			font-size: 0.625rem;
		}
	}
</style>
