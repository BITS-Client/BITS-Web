<script lang="ts">
	import { Clock } from '$lib/icons/lucide';
	import type { ComponentType } from 'svelte';

	interface Props {
		badge?: string;
		badgeIcon?: ComponentType;
		title?: string;
		subtitle?: string;
		headingId?: string;
	}

	let {
		badge = '',
		badgeIcon = Clock,
		title = '',
		subtitle = '',
		headingId = 'wave-heading'
	}: Props = $props();

	const BadgeIcon = $derived(badgeIcon);
	const titleMain = $derived(title.split(' ').slice(0, 2).join(' '));
	const titleAccent = $derived(title.split(' ').slice(2).join(' '));
</script>

<div class="wave-header">
	{#if badge}
		<div class="wave-badge-wrapper">
			<div class="wave-badge">
				<div class="wave-badge-ring"></div>
				<div class="wave-badge-glow"></div>
				<BadgeIcon class="w-4 h-4" />
				<span class="wave-badge-text">{badge}</span>
				<div class="wave-sparkle wave-sparkle-1"></div>
				<div class="wave-sparkle wave-sparkle-2"></div>
				<div class="wave-sparkle wave-sparkle-3"></div>
			</div>
		</div>
	{/if}

	<h2 id={headingId} class="wave-title">
		<span class="title-line title-line-1">
			<span class="title-word" style="--word-i: 0">{titleMain}</span>
		</span>
		{#if titleAccent}
			<span class="title-line title-line-2">
				<span class="title-word text-gradient" style="--word-i: 1">{titleAccent}</span>
			</span>
		{/if}
	</h2>

	<p class="wave-tagline">
		<span class="tagline-text">{subtitle}</span>
	</p>

	<div class="wave-deco">
		<div class="deco-wave">
			<svg viewBox="0 0 200 20" class="wave-line">
				<path
					d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10"
					fill="none"
					stroke="url(#wave-gradient)"
					stroke-width="2"
				/>
				<defs>
					<linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stop-color="#10b981" />
						<stop offset="50%" stop-color="#3b82f6" />
						<stop offset="100%" stop-color="#8b5cf6" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</div>
</div>

<style>
	.wave-header {
		text-align: center;
		max-width: 56rem;
		margin: 0 auto;
		margin-bottom: 3rem;
		opacity: 1;
		transform: none;
	}

	.wave-badge-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.wave-badge {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(0, 0, 0, 0.4);
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
		overflow: hidden;
		backdrop-filter: blur(12px);
		box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
	}

	:global(.dark) .wave-badge {
		background: rgba(30, 41, 59, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.4);
		color: white;
		box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.3);
	}

	.wave-badge-ring {
		position: absolute;
		inset: -3px;
		border-radius: 9999px;
		border: 2px solid transparent;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3)) border-box;
		-webkit-mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		animation: badge-ring-pulse 3s ease-in-out infinite;
	}

	:global(.dark) .wave-badge-ring {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3)) border-box;
	}

	.wave-badge-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.4), transparent);
		transform: translateX(-100%);
		animation: badge-shine 3s ease-in-out infinite;
	}

	:global(.dark) .wave-badge-glow {
		background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
	}

	@keyframes badge-ring-pulse {
		0%,
		100% {
			opacity: 0;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
	}

	@keyframes badge-shine {
		0% {
			transform: translateX(-100%);
		}
		50%,
		100% {
			transform: translateX(100%);
		}
	}

	.wave-sparkle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: #1f2937;
		border-radius: 50%;
		animation: sparkle-pop 2s ease-in-out infinite;
	}

	:global(.dark) .wave-sparkle {
		background: white;
	}

	.wave-sparkle-1 {
		top: 2px;
		right: 20%;
	}

	.wave-sparkle-2 {
		bottom: 2px;
		left: 25%;
	}

	.wave-sparkle-3 {
		top: 50%;
		right: 5%;
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

	.wave-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: #111827;
		line-height: 1.2;
		margin-bottom: 1rem;
	}

	:global(.dark) .wave-title {
		color: white;
	}

	@media (min-width: 768px) {
		.wave-title {
			font-size: 3.5rem;
		}
	}

	.title-line {
		display: block;
	}

	.title-word {
		display: inline-block;
	}

	.text-gradient {
		background: linear-gradient(135deg, #10b981 0%, #8b5cf6 50%, #ec4899 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: section-title-gradient 5s ease infinite;
		display: inline-block;
		line-height: 1.3;
		padding-bottom: 0.1em;
	}

	@keyframes section-title-gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.wave-tagline {
		font-size: 1.125rem;
		color: rgba(0, 0, 0, 0.7);
		margin-bottom: 2rem;
	}

	:global(.dark) .wave-tagline {
		color: rgba(255, 255, 255, 0.7);
	}

	.wave-deco {
		display: flex;
		justify-content: center;
		margin-bottom: 3rem;
	}

	.deco-wave {
		width: 200px;
		height: 20px;
	}

	.wave-line {
		width: 100%;
		height: 100%;
	}
</style>
