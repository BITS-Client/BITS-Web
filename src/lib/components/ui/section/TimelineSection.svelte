<script lang="ts">
	import { Clock } from '$lib/icons/lucide';
	import WaveHeader from '$lib/components/ui/header/WaveHeader.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import TimelineCard from '../card/TimelineCard.svelte';

	interface TimelineItem {
		year: string;
		title: string;
		description: string;
		icon: typeof import('$lib/icons/lucide').Star;
	}

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		end?: string;
		timeline?: TimelineItem[];
	}

	let { badge = '', title = '', subtitle = '', end = '', timeline = [] }: Props = $props();
</script>

<section class="journey-ultimate" aria-labelledby="timeline-heading">
	<Background gradientTheme="coral" />

	<div class="container-base relative z-10 py-10 lg:py-16">
		<WaveHeader {badge} {title} {subtitle} headingId="timeline-heading" badgeIcon={Clock} />

		<div class="timeline-container">
			<div class="timeline-wrapper">
				<div class="timeline-line"></div>

				{#each timeline as item, index (item.year)}
					<div class="timeline-row" class:timeline-row-left={index % 2 === 1}>
						<div class="timeline-spacer"></div>
						<div class="timeline-line-dot"></div>
						<div class="timeline-spacer"></div>

						<div class="timeline-content-wrapper">
							<TimelineCard
								year={item.year}
								title={item.title}
								description={item.description}
								icon={item.icon}
							/>
						</div>
					</div>
				{/each}

				{#if end}
					<div class="timeline-end-section">
						<div class="timeline-end-glow-bg"></div>
						<div class="timeline-end-icon-wrapper">
							<div class="end-particles">
								{#each Array(12) as _, i (i)}
									<div class="particle particle-{i}"></div>
								{/each}
							</div>
							<div class="end-icon-wrapper">
								<svg viewBox="0 0 64 64" class="end-icon">
									<defs>
										<linearGradient id="end-gradient-stunning" x1="0%" y1="0%" x2="100%" y2="100%">
											<stop offset="0%" stop-color="#10b981" />
											<stop offset="50%" stop-color="#8b5cf6" />
											<stop offset="100%" stop-color="#ec4899" />
										</linearGradient>
										<filter id="end-glow">
											<feGaussianBlur stdDeviation="2" result="coloredBlur" />
											<feMerge>
												<feMergeNode in="coloredBlur" />
												<feMergeNode in="SourceGraphic" />
											</feMerge>
										</filter>
									</defs>
									<circle
										cx="32"
										cy="32"
										r="28"
										fill="none"
										stroke="url(#end-gradient-stunning)"
										stroke-width="1.5"
										filter="url(#end-glow)"
										class="end-ring-orb"
									/>
									<circle
										cx="32"
										cy="32"
										r="20"
										fill="none"
										stroke="url(#end-gradient-stunning)"
										stroke-width="1"
										opacity="0.6"
										class="end-ring-orb-2"
									/>
									<circle
										cx="32"
										cy="32"
										r="12"
										fill="url(#end-gradient-stunning)"
										class="end-core-stunning"
									/>
									<circle
										cx="32"
										cy="32"
										r="7"
										fill="white"
										opacity="0.95"
										class="end-core-inner"
									/>
									<path
										d="M32 6 L32 14 M32 50 L32 58 M6 32 L14 32 M50 32 L58 32"
										stroke="url(#end-gradient-stunning)"
										stroke-width="2.5"
										stroke-linecap="round"
										class="end-rays-stunning"
									/>
									<path
										d="M32 18 L32 23 M32 41 L32 46 M18 32 L23 32 M41 32 L46 32"
										stroke="url(#end-gradient-stunning)"
										stroke-width="1.5"
										stroke-linecap="round"
										opacity="0.7"
										class="end-rays-inner"
									/>
								</svg>
							</div>
						</div>
						<div class="timeline-end-text-wrapper">
							<div class="timeline-end-card-stunning">
								<div class="card-shine"></div>
								<div class="card-border-glow"></div>
								<span class="end-text-stunning">{end}</span>
								<div class="end-text-glow"></div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.journey-ultimate {
		position: relative;
		overflow: hidden;
	}

	.timeline-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.timeline-wrapper {
		position: relative;
		padding: 2rem 0;
	}

	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(59, 130, 246, 0.3) 10%,
			rgba(139, 92, 246, 0.5) 50%,
			rgba(6, 182, 212, 0.3) 90%,
			transparent
		);
		transform: translateX(-50%);
		animation: lineGlow 4s ease-in-out infinite;
	}

	:global(.light) .timeline-line {
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(59, 130, 246, 0.4) 10%,
			rgba(139, 92, 246, 0.6) 50%,
			rgba(6, 182, 212, 0.4) 90%,
			transparent
		);
	}

	@keyframes lineGlow {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}

	.timeline-line-dot {
		position: absolute;
		left: 50%;
		top: 2rem;
		width: 12px;
		height: 12px;
		background: linear-gradient(135deg, #8b5cf6, #8b5cf6);
		border-radius: 50%;
		transform: translateX(-50%);
		animation: dotPulse 2s ease-in-out infinite;
		box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
	}

	:global(.light) .timeline-line-dot {
		background: linear-gradient(135deg, #2563eb, #7c3aed);
		box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
	}

	@keyframes dotPulse {
		0%,
		100% {
			transform: translateX(-50%) scale(1);
			box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
		}
		50% {
			transform: translateX(-50%) scale(1.2);
			box-shadow: 0 0 30px rgba(139, 92, 246, 0.8);
		}
	}

	.timeline-row,
	.timeline-end-row {
		display: grid;
		grid-template-columns: 1fr 20px 1fr;
		gap: 0;
		margin-bottom: 1rem;
		align-items: start;
		position: relative;
	}

	.timeline-end-row {
		display: grid;
		grid-template-columns: 1fr 20px 1fr;
		gap: 0;
		align-items: start;
		position: relative;
	}

	.timeline-end-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 1.5rem;
		position: relative;
	}

	.timeline-end-glow-bg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
		animation: bgPulse 4s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes bgPulse {
		0%,
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0.5;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.2);
			opacity: 0.8;
		}
	}

	.timeline-end-icon-wrapper {
		position: relative;
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.timeline-end-text-wrapper {
		display: flex;
		justify-content: center;
		padding-top: 1rem;
		width: 100%;
		z-index: 10;
	}

	.timeline-end-glow-bg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
		animation: bgPulse 4s ease-in-out infinite;
		pointer-events: none;
	}

	.timeline-end-text-wrapper {
		display: flex;
		justify-content: center;
		padding-top: 1rem;
		width: 100%;
		z-index: 10;
	}

	.timeline-spacer {
		height: 1px;
	}

	.timeline-row-left .timeline-content-wrapper {
		grid-column: 1;
		grid-row: 1;
		padding-right: 2rem;
	}

	.timeline-row-left .timeline-line-dot {
		top: 2rem;
	}

	.timeline-row:not(.timeline-row-left) .timeline-content-wrapper {
		grid-column: 3;
		grid-row: 1;
		padding-left: 2rem;
	}

	.timeline-row:not(.timeline-row-left) .timeline-line-dot {
		top: 2rem;
	}

	.timeline-content-wrapper {
		direction: ltr;
	}

	.end-icon-wrapper {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.end-icon {
		width: 100%;
		height: 100%;
		filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.5));
	}

	.end-ring-orb {
		animation: orbPulse 3s ease-in-out infinite;
	}

	.end-ring-orb-2 {
		animation: orbPulseReverse 4s ease-in-out infinite reverse;
	}

	@keyframes orbPulse {
		0%,
		100% {
			transform: scale(1) rotate(0deg);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.05) rotate(180deg);
			opacity: 1;
		}
	}

	@keyframes orbPulseReverse {
		0%,
		100% {
			transform: scale(0.9);
			opacity: 0.4;
		}
		50% {
			transform: scale(1);
			opacity: 0.7;
		}
	}

	.end-core-stunning {
		animation: coreStunning 2s ease-in-out infinite;
	}

	.end-core-inner {
		animation: coreInner 1.5s ease-in-out infinite;
	}

	@keyframes coreStunning {
		0%,
		100% {
			filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.8));
			transform: scale(1);
		}
		50% {
			filter: drop-shadow(0 0 25px rgba(59, 130, 246, 1));
			transform: scale(1.1);
		}
	}

	@keyframes coreInner {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.9;
		}
		50% {
			transform: scale(1.15);
			opacity: 1;
		}
	}

	.end-rays-stunning {
		animation: raysSpin 8s linear infinite;
		transform-origin: center;
	}

	.end-rays-inner {
		animation: raysSpinReverse 6s linear infinite reverse;
		transform-origin: center;
	}

	@keyframes raysSpin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes raysSpinReverse {
		from {
			transform: rotate(360deg);
		}
		to {
			transform: rotate(0deg);
		}
	}

	.timeline-end-card-stunning {
		position: relative;
		background: linear-gradient(
			135deg,
			rgba(16, 185, 129, 0.15),
			rgba(59, 130, 246, 0.1),
			rgba(139, 92, 246, 0.15)
		);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		padding: 1rem 2rem;
		backdrop-filter: blur(20px);
		overflow: hidden;
	}

	:global(.light) .timeline-end-card-stunning {
		background: linear-gradient(
			135deg,
			rgba(16, 185, 129, 0.1),
			rgba(59, 130, 246, 0.08),
			rgba(139, 92, 246, 0.1)
		);
		border: 1px solid rgba(0, 0, 0, 0.15);
	}

	.card-shine {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		animation: shine 3s ease-in-out infinite;
	}

	:global(.light) .card-shine {
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
	}

	@keyframes shine {
		0%,
		100% {
			left: -100%;
		}
		50% {
			left: 100%;
		}
	}

	.card-border-glow {
		position: absolute;
		inset: -1px;
		border-radius: 1rem;
		padding: 1px;
		background: linear-gradient(135deg, #10b981, #8b5cf6, #ec4899);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		animation: borderGlow 4s linear infinite;
		opacity: 0.8;
	}

	@keyframes borderGlow {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(360deg);
		}
	}

	.end-text-stunning {
		position: relative;
		font-size: 1.25rem;
		font-weight: 700;
		background: linear-gradient(135deg, #10b981, #8b5cf6, #ec4899);
		background-size: 300% 300%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: textGradientShift 5s ease infinite;
		text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
		letter-spacing: 0.05em;
	}

	@keyframes textGradientShift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.end-text-glow {
		position: absolute;
		inset: 0;
		border-radius: 1rem;
		background: inherit;
		filter: blur(30px);
		opacity: 0.4;
		z-index: -1;
		animation: glowPulse 3s ease-in-out infinite;
	}

	@keyframes glowPulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(1.05);
		}
	}

	@media (max-width: 768px) {
		.timeline-row {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.timeline-line {
			left: 1rem;
		}

		.timeline-line-dot {
			left: 1rem;
		}

		.timeline-row-left .timeline-content-wrapper,
		.timeline-row:not(.timeline-row-left) .timeline-content-wrapper {
			grid-column: 1;
			grid-row: auto;
			padding-left: 2.5rem;
			padding-right: 0;
		}

		.timeline-row-left .timeline-line-dot,
		.timeline-row:not(.timeline-row-left) .timeline-line-dot {
			left: 1rem;
			top: 2rem;
		}

		.timeline-end-icon-wrapper {
			width: 64px;
			height: 64px;
		}

		.end-icon-wrapper {
			width: 52px;
			height: 52px;
		}

		.timeline-end-card-stunning {
			padding: 0.875rem 1.5rem;
		}

		.end-text-stunning {
			font-size: 1.1rem;
		}

		.timeline-end-glow-bg {
			width: 200px;
			height: 200px;
		}
	}
</style>
