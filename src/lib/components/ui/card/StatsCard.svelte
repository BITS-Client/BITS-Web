<script lang="ts">
	import AnimatedCounter from '$lib/components/ui/animation/AnimatedCounter.svelte';

	interface Props {
		value: number;
		label: string;
		suffix?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon: any;
		variant?: number;
		duration?: number;
	}

	let { value, label, suffix = '', icon: Icon, variant = 1, duration = 2000 }: Props = $props();
</script>

<div class="stats-card stats-card-{variant}" aria-label="{value}{suffix} {label}">
	<div class="stats-card-bg-glow"></div>
	<div class="stats-card-holographic"></div>
	<div class="stats-card-glow"></div>
	<div class="stats-card-border"></div>
	<div class="stats-card-shine"></div>
	<div class="stats-card-inner">
		<div class="stats-card-icon-container">
			<div class="stats-card-icon-ring stats-card-icon-ring-outer"></div>
			<div class="stats-card-icon-ring stats-card-icon-ring-inner"></div>
			<div class="stats-card-icon">
				<Icon class="w-6 h-6" />
			</div>
			<div class="stats-card-icon-pulse"></div>
		</div>
		<div class="stats-card-value">
			<AnimatedCounter {value} {duration} />
			{#if suffix}
				<span class="stats-card-suffix">{suffix}</span>
			{/if}
		</div>
		<div class="stats-card-label">{label}</div>
		<div class="stats-card-progress">
			<div class="stats-card-progress-bar"></div>
		</div>
	</div>
</div>

<style>
	.stats-card {
		position: relative;
		border-radius: 1.75rem;
		cursor: default;
		transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		transform-style: preserve-3d;
		perspective: 1000px;
		will-change: transform;
	}

	.stats-card:hover {
		transform: translateY(-10px) scale(1.02);
		z-index: 10;
	}

	.stats-card:focus {
		outline: none;
	}

	.stats-card:focus-visible .stats-card-inner {
		outline: 3px solid var(--color-primary);
		outline-offset: 4px;
	}

	:global(:root.dark) .stats-card:focus-visible .stats-card-inner {
		outline-color: #60a5fa;
	}

	.stats-card-glow {
		position: absolute;
		inset: -3px;
		border-radius: 2rem;
		opacity: 0;
		filter: blur(20px);
		transition: opacity 0.5s ease;
		z-index: -1;
	}

	.stats-card:hover .stats-card-glow {
		opacity: 0.7;
	}

	:global(:root.dark) .stats-card:hover .stats-card-glow {
		opacity: 0.9;
	}

	.stats-card-1 .stats-card-glow {
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
	}
	.stats-card-2 .stats-card-glow {
		background: linear-gradient(135deg, #8b5cf6, #ec4899);
	}
	.stats-card-3 .stats-card-glow {
		background: linear-gradient(135deg, #f59e0b, #f97316);
	}
	.stats-card-4 .stats-card-glow {
		background: linear-gradient(135deg, #10b981, #14b8a6);
	}
	.stats-card-5 .stats-card-glow {
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
	}
	.stats-card-6 .stats-card-glow {
		background: linear-gradient(135deg, #f43f5e, #ec4899);
	}

	.stats-card-border {
		position: absolute;
		inset: 0;
		padding: 2px;
		border-radius: 1.75rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0.6;
		transition: all 0.4s ease;
	}

	:global(:root.dark) .stats-card-border {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02));
	}

	.stats-card:hover .stats-card-border {
		opacity: 1;
	}

	.stats-card-1:hover .stats-card-border {
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
	}
	.stats-card-2:hover .stats-card-border {
		background: linear-gradient(135deg, #8b5cf6, #ec4899);
	}
	.stats-card-3:hover .stats-card-border {
		background: linear-gradient(135deg, #f59e0b, #f97316);
	}
	.stats-card-4:hover .stats-card-border {
		background: linear-gradient(135deg, #10b981, #14b8a6);
	}
	.stats-card-5:hover .stats-card-border {
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
	}
	.stats-card-6:hover .stats-card-border {
		background: linear-gradient(135deg, #f43f5e, #ec4899);
	}

	.stats-card-shine {
		position: absolute;
		inset: 0;
		border-radius: 1.75rem;
		overflow: hidden;
		pointer-events: none;
	}

	.stats-card-shine::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 60%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.35),
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.35),
			transparent
		);
		transform: skewX(-25deg);
		transition: left 0.8s cubic-bezier(0.23, 1, 0.32, 1);
	}

	:global(:root.dark) .stats-card-shine::before {
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.15),
			rgba(255, 255, 255, 0.25),
			rgba(255, 255, 255, 0.15),
			transparent
		);
	}

	.stats-card:hover .stats-card-shine::before {
		left: 160%;
	}

	.stats-card-inner {
		position: relative;
		height: 100%;
		padding: 1.5rem 1rem;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-radius: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.05),
			0 10px 15px -3px rgba(0, 0, 0, 0.08),
			0 20px 25px -5px rgba(0, 0, 0, 0.05);
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		overflow: hidden;
	}

	:global(:root.dark) .stats-card-inner {
		background: rgba(15, 23, 42, 0.8);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.3),
			0 10px 15px -3px rgba(0, 0, 0, 0.3),
			0 20px 25px -5px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.stats-card:hover .stats-card-inner {
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.15),
			0 12px 24px -8px rgba(0, 0, 0, 0.1);
	}

	:global(:root.dark) .stats-card:hover .stats-card-inner {
		background: rgba(15, 23, 42, 0.95);
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 12px 24px -8px rgba(0, 0, 0, 0.4);
	}

	.stats-card-icon-container {
		position: relative;
		margin-bottom: 1.25rem;
	}

	.stats-card-icon-ring {
		position: absolute;
		border-radius: 50%;
		border: 2px solid;
		opacity: 0.3;
	}

	.stats-card-icon-ring-outer {
		inset: -12px;
		border-style: dashed;
		animation: stats-ring-rotate 12s linear infinite;
	}

	.stats-card-icon-ring-inner {
		inset: -6px;
		animation: stats-ring-rotate 8s linear infinite reverse;
	}

	.stats-card-1 .stats-card-icon-ring {
		border-color: #3b82f6;
	}
	.stats-card-2 .stats-card-icon-ring {
		border-color: #8b5cf6;
	}
	.stats-card-3 .stats-card-icon-ring {
		border-color: #f59e0b;
	}
	.stats-card-4 .stats-card-icon-ring {
		border-color: #10b981;
	}
	.stats-card-5 .stats-card-icon-ring {
		border-color: #6366f1;
	}
	.stats-card-6 .stats-card-icon-ring {
		border-color: #f43f5e;
	}

	@keyframes stats-ring-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.stats-card-icon {
		position: relative;
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1rem;
		color: white;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.stats-card-1 .stats-card-icon {
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
	}
	.stats-card-2 .stats-card-icon {
		background: linear-gradient(135deg, #8b5cf6, #ec4899);
		box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
	}
	.stats-card-3 .stats-card-icon {
		background: linear-gradient(135deg, #f59e0b, #f97316);
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
	}
	.stats-card-4 .stats-card-icon {
		background: linear-gradient(135deg, #10b981, #14b8a6);
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
	}
	.stats-card-5 .stats-card-icon {
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
	}
	.stats-card-6 .stats-card-icon {
		background: linear-gradient(135deg, #f43f5e, #ec4899);
		box-shadow: 0 4px 12px rgba(244, 63, 94, 0.4);
	}

	.stats-card-icon-pulse {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 2px solid;
		opacity: 0;
		animation: stats-icon-pulse 2s ease-out infinite;
	}

	.stats-card-1 .stats-card-icon-pulse {
		border-color: #3b82f6;
	}
	.stats-card-2 .stats-card-icon-pulse {
		border-color: #8b5cf6;
	}
	.stats-card-3 .stats-card-icon-pulse {
		border-color: #f59e0b;
	}
	.stats-card-4 .stats-card-icon-pulse {
		border-color: #10b981;
	}
	.stats-card-5 .stats-card-icon-pulse {
		border-color: #6366f1;
	}
	.stats-card-6 .stats-card-icon-pulse {
		border-color: #f43f5e;
	}

	@keyframes stats-icon-pulse {
		0% {
			transform: scale(1);
			opacity: 0.7;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	.stats-card-value {
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--color-gray-900);
		margin-bottom: 0.5rem;
		line-height: 1;
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.125rem;
	}

	:global(:root.dark) .stats-card-value {
		color: white;
	}

	.stats-card-suffix {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-gray-500);
	}

	:global(:root.dark) .stats-card-suffix {
		color: rgba(255, 255, 255, 0.6);
	}

	.stats-card-label {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-gray-600);
		margin-bottom: 1rem;
		line-height: 1.3;
	}

	:global(:root.dark) .stats-card-label {
		color: rgba(255, 255, 255, 0.7);
	}

	.stats-card-progress {
		width: 100%;
		height: 4px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 2px;
		overflow: hidden;
	}

	:global(:root.dark) .stats-card-progress {
		background: rgba(255, 255, 255, 0.1);
	}

	.stats-card-progress-bar {
		height: 100%;
		border-radius: 2px;
		animation: stats-progress-fill 2s ease-out forwards;
		transform-origin: left;
		transform: scaleX(0);
	}

	.stats-card-1 .stats-card-progress-bar {
		background: linear-gradient(90deg, #3b82f6, #06b6d4);
	}
	.stats-card-2 .stats-card-progress-bar {
		background: linear-gradient(90deg, #8b5cf6, #ec4899);
	}
	.stats-card-3 .stats-card-progress-bar {
		background: linear-gradient(90deg, #f59e0b, #f97316);
	}
	.stats-card-4 .stats-card-progress-bar {
		background: linear-gradient(90deg, #10b981, #14b8a6);
	}
	.stats-card-5 .stats-card-progress-bar {
		background: linear-gradient(90deg, #6366f1, #8b5cf6);
	}
	.stats-card-6 .stats-card-progress-bar {
		background: linear-gradient(90deg, #f43f5e, #ec4899);
	}

	@keyframes stats-progress-fill {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
</style>
