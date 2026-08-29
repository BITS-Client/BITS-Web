<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		icon?: string;
		index?: number;
		type?: 'vision' | 'mission';
	}

	let { title = '', description = '', icon = '✦', index = 0, type = 'vision' }: Props = $props();
</script>

<div class="{type}-card scroll-animate" style="--index: {index};">
	<div class="card-border"></div>
	<h3 class="card-title text-gradient">{title}</h3>
	<div class="card-decoration">
		<span class="deco-line"></span>
		<span class="deco-icon icon-gradient">{icon}</span>
		<span class="deco-line"></span>
	</div>
	<p class="card-text">{description}</p>
	<div class="card-shine-line"></div>
</div>

<style>
	.vision-card,
	.mission-card {
		position: relative;
		padding: 1rem 1.5rem 1.5rem 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	:global(.light) .vision-card,
	:global(.light) .mission-card {
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.vision-card:hover,
	.mission-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.card-border {
		position: absolute;
		inset: 0;
		border-radius: 1rem;
		padding: 1px;
		background: linear-gradient(
			135deg,
			rgba(16, 185, 129, 0.3),
			rgba(139, 92, 246, 0.3),
			rgba(236, 72, 153, 0.3),
			rgba(6, 182, 212, 0.3)
		);
		background-size: 400% 400%;
		animation: gradientShift 6s ease-in-out infinite;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
	}

	@keyframes gradientShift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		25% {
			background-position: 100% 50%;
		}
		50% {
			background-position: 100% 100%;
		}
		75% {
			background-position: 0% 100%;
		}
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

	.card-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0;
		text-align: center;
	}

	:global(.light) .card-title {
		color: #1f2937;
	}

	@media (min-width: 768px) {
		.card-title {
			font-size: 1.75rem;
		}
	}

	.text-gradient {
		background: linear-gradient(135deg, #10b981 0%, #8b5cf6 50%, #ec4899 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: section-title-gradient 5s ease infinite;
		display: block;
		line-height: 1.3;
		padding-bottom: 0.1em;
		margin-bottom: 0.5rem;
	}

	.icon-gradient {
		background: linear-gradient(135deg, #10b981 0%, #8b5cf6 50%, #ec4899 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: section-title-gradient 5s ease infinite;
		display: inline-block;
	}

	.card-decoration {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.deco-line {
		flex: 1;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
	}

	:global(.light) .deco-line {
		background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2), transparent);
	}

	.deco-icon {
		font-size: 0.75rem;
		color: var(--color-secondary);
		font-weight: 600;
	}

	.card-text {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.55;
		margin: 0;
		text-align: justify;
	}

	:global(.light) .card-text {
		color: rgba(31, 41, 55, 0.8);
	}

	@media (min-width: 768px) {
		.card-text {
			font-size: 0.9375rem;
		}
	}

	.card-shine-line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
	}

	:global(.light) .card-shine-line {
		background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2), transparent);
	}
</style>
