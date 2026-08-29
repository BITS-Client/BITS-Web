<script lang="ts">
	import { Users, ArrowRight } from '$lib/icons/lucide';
	import { getIconComponent } from '$lib/icons';

	interface Props {
		title?: string;
		subtitle?: string;
		button?: string;
		contactUrl?: string;
		icon?: string;
	}

	let {
		title = '',
		subtitle = '',
		button = '',
		contactUrl = '/contact',
		icon = ''
	}: Props = $props();

	const CTAIcon = $derived(getIconComponent(icon) || Users);
</script>

<div class="general-cta-section scroll-animate">
	<div class="cta-glass-card">
		<div class="cta-content">
			<div class="cta-icon-wrapper">
				<CTAIcon class="w-8 h-8" />
				<div class="cta-icon-ring"></div>
			</div>
			<div class="cta-text">
				<h3 class="cta-title">{title}</h3>
				<p class="cta-desc">{subtitle}</p>
			</div>
		</div>
		<a href={contactUrl} class="general-cta-btn-new">
			<span>{button}</span>
			<ArrowRight class="w-5 h-5 cta-arrow" style="transition: transform 0.3s ease" />
			<div class="btn-glow-effect"></div>
		</a>
	</div>
</div>

<style>
	.general-cta-section {
		margin-top: 3rem;
		position: relative;
	}

	.cta-glass-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 2rem;
		padding: 2.5rem 1.5rem;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
	}

	:global(.light) .cta-glass-card {
		background: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(0, 0, 0, 0.05);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
	}

	@media (min-width: 768px) {
		.cta-glass-card {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			text-align: left;
			padding: 3rem;
		}
	}

	.cta-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
	}

	@media (min-width: 768px) {
		.cta-content {
			flex-direction: row;
			gap: 2rem;
			width: auto;
		}
	}

	.cta-icon-wrapper {
		position: relative;
		width: 72px;
		height: 72px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		border-radius: 1.25rem;
		color: white;
		flex-shrink: 0;
		box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);
	}

	.cta-icon-ring {
		position: absolute;
		inset: -8px;
		border-radius: 1.5rem;
		border: 2px solid var(--color-primary);
		opacity: 0.3;
		animation: ctaRingPulse 3s ease-in-out infinite;
	}

	@keyframes ctaRingPulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.15);
			opacity: 0.5;
		}
	}

	.cta-text {
		flex: 1;
	}

	.cta-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: white;
		margin-bottom: 0.75rem;
		line-height: 1.2;
		background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.7) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global(.light) .cta-title {
		background: linear-gradient(135deg, var(--color-gray-900) 0%, var(--color-primary) 100%);
		-webkit-background-clip: text;
		background-clip: text;
	}

	.cta-desc {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.6;
		max-width: 500px;
	}

	:global(.light) .cta-desc {
		color: var(--color-gray-600);
	}

	.general-cta-btn-new {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1rem 2.5rem;
		background: white;
		color: var(--color-primary);
		border-radius: 1rem;
		font-weight: 700;
		font-size: 1.125rem;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
		width: 100%;
	}

	@media (min-width: 480px) {
		.general-cta-btn-new {
			width: auto;
		}
	}

	:global(.light) .general-cta-btn-new {
		background: var(--color-primary);
		color: white;
	}

	.general-cta-btn-new:hover {
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 15px 30px rgba(255, 255, 255, 0.2);
	}

	:global(.light) .general-cta-btn-new:hover {
		box-shadow: 0 15px 30px rgba(30, 64, 175, 0.3);
	}

	.btn-glow-effect {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
		transform: translateX(-100%);
		transition: transform 0.6s ease;
	}

	.general-cta-btn-new:hover .btn-glow-effect {
		transform: translateX(100%);
	}

	/* Decorative background */
	.cta-glass-card::before {
		content: '';
		position: absolute;
		top: -50%;
		right: -20%;
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
		opacity: 0.15;
		filter: blur(50px);
		z-index: 1;
		pointer-events: none;
	}

	.cta-glass-card::after {
		content: '';
		position: absolute;
		bottom: -50%;
		left: -20%;
		width: 250px;
		height: 250px;
		background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
		opacity: 0.15;
		filter: blur(50px);
		z-index: 1;
		pointer-events: none;
	}
</style>
