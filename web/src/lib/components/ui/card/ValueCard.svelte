<script lang="ts">
	interface ValueCardProps {
		title: string;
		description: string;
		color: string;
		icon: typeof import('$lib/icons/lucide').Heart;
		index: number;
	}

	let { title, description, color, icon: Icon, index }: ValueCardProps = $props();
</script>

<div class="value-card-new scroll-animate" style="--card-index: {index}">
	<div class="value-border-glow"></div>

	<div class="value-glass-card">
		<div class="icon-wrapper">
			<div class="icon-float">
				<div class="icon-glow-bg bg-gradient-to-br {color}"></div>
				<div class="icon-container bg-gradient-to-br {color}">
					<Icon class="w-8 h-8 text-white" aria-hidden="true" />
				</div>
				<div class="icon-pulse-ring bg-gradient-to-br {color}"></div>
			</div>
		</div>

		<div class="value-content-new">
			<h3 class="value-title-new">{title}</h3>
			<p class="value-desc-new">{description}</p>

			<div class="value-progress">
				<div class="progress-track">
					<div class="progress-fill bg-gradient-to-r {color}"></div>
				</div>
			</div>
		</div>

		<div class="card-particles">
			{#each Array(6) as _, pi (pi)}
				<div class="card-particle" style="--cp-i: {pi}"></div>
			{/each}
		</div>

		<div class="value-shine-sweep"></div>
	</div>

	<div class="value-number" style="z-index: 10;">0{index + 1}</div>
</div>

<style>
	.value-card-new {
		position: relative;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 1rem;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	:global(.light) .value-card-new {
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.value-card-new:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.value-border-glow {
		position: absolute;
		inset: 0;
		border-radius: 1rem;
		padding: 1px;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.1),
			transparent,
			rgba(255, 255, 255, 0.05)
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.value-card-new:hover .value-border-glow {
		opacity: 1;
	}

	.value-glass-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	.icon-wrapper {
		display: flex;
		justify-content: center;
		margin: 0.5rem 0;
	}

	.icon-float {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: iconFloat 4s ease-in-out infinite;
	}

	@keyframes iconFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.icon-glow-bg {
		position: absolute;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		filter: blur(20px);
		opacity: 0.5;
		animation: glowPulse 3s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(1);
		}
		50% {
			opacity: 0.7;
			transform: scale(1.1);
		}
	}

	.icon-container {
		position: relative;
		width: 56px;
		height: 56px;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		z-index: 1;
	}

	.icon-pulse-ring {
		position: absolute;
		width: 56px;
		height: 56px;
		border-radius: 1rem;
		opacity: 0;
		animation: ringPulse 2s ease-out infinite;
	}

	@keyframes ringPulse {
		0% {
			opacity: 0.6;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(1.5);
		}
	}

	.value-content-new {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.value-title-new {
		font-size: 1.125rem;
		font-weight: 700;
		color: white;
		text-align: center;
	}

	:global(.light) .value-title-new {
		color: #111827;
	}

	.value-desc-new {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.6;
		flex: 1;
		text-align: center;
	}

	:global(.light) .value-desc-new {
		color: rgba(0, 0, 0, 0.7);
	}

	.value-progress {
		margin-top: auto;
	}

	.progress-track {
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		overflow: hidden;
	}

	:global(.light) .progress-track {
		background: rgba(0, 0, 0, 0.1);
	}

	.progress-fill {
		height: 100%;
		width: 0;
		animation: progressFill 1.5s ease-out forwards;
		animation-delay: calc(var(--card-index) * 0.1s);
	}

	@keyframes progressFill {
		to {
			width: 100%;
		}
	}

	.card-particles {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.card-particle {
		position: absolute;
		width: 3px;
		height: 3px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		animation: particleRise 4s ease-in-out infinite;
		animation-delay: calc(var(--cp-i) * -0.67s);
		bottom: 0;
		left: calc(var(--cp-i) * 20% + 10%);
	}

	@keyframes particleRise {
		0% {
			transform: translateY(0);
			opacity: 0;
		}
		50% {
			opacity: 0.6;
		}
		100% {
			transform: translateY(-100px);
			opacity: 0;
		}
	}

	.value-shine-sweep {
		position: absolute;
		top: 0;
		left: -100%;
		width: 50%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transform: skewX(-20deg);
		animation: shineSweep 6s ease-in-out infinite;
	}

	@keyframes shineSweep {
		0%,
		80%,
		100% {
			left: -100%;
		}
		90% {
			left: 200%;
		}
	}

	.value-number {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 2.5rem;
		font-weight: 900;
		color: rgba(255, 255, 255, 0.05);
		line-height: 1;
	}

	:global(.light) .value-number {
		color: rgba(0, 0, 0, 0.05);
	}
</style>
