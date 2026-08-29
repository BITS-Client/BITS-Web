<script lang="ts">
	import { getIconComponent } from '$lib/icons';

	interface Props {
		step: string;
		title: string;
		description: string;
		icon?: string;
	}

	let { step, title, description, icon }: Props = $props();
	const IconComponent = $derived(icon ? getIconComponent(icon) : undefined);
</script>

<div class="process-card">
	<div class="process-card-glow"></div>
	<div class="process-card-glass">
		<div class="process-card-border"></div>
		<div class="process-card-deco"></div>
	</div>

	<div class="process-card-content">
		<div class="process-card-header">
			{#if IconComponent}
				<div class="process-icon-wrapper">
					<IconComponent class="w-6 h-6" />
				</div>
			{/if}
			<div class="process-step-number">{step}</div>
		</div>

		<h3 class="process-card-title">{title}</h3>
		<p class="process-card-description">{description}</p>

		<div class="process-progress">
			<div class="process-progress-line"></div>
		</div>
	</div>
</div>

<style>
	.process-card {
		position: relative;
		border-radius: 1.25rem;
		overflow: visible;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.process-card:hover {
		transform: translateY(-8px);
	}

	.process-card-glow {
		position: absolute;
		inset: -2px;
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
		border-radius: 1.375rem;
		opacity: 0;
		filter: blur(20px);
		transition: opacity 0.4s ease;
		z-index: 0;
	}

	.process-card:hover .process-card-glow {
		opacity: 0.15;
	}

	.process-card-glass {
		position: absolute;
		inset: 0;
		background: white;
		border-radius: 1.25rem;
		z-index: 1;
	}

	:global(:root.dark) .process-card-glass {
		background: #1e293b;
	}

	.process-card-border {
		position: absolute;
		inset: 0;
		border-radius: 1.25rem;
		padding: 1px;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), transparent 50%);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		z-index: 2;
	}

	.process-card-deco {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 3rem;
		height: 3rem;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
		border-radius: 50%;
		z-index: 1;
	}

	.process-card-content {
		position: relative;
		z-index: 3;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.process-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.process-icon-wrapper {
		width: 3rem;
		height: 3rem;
		border-radius: 0.875rem;
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.process-card:hover .process-icon-wrapper {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
	}

	.process-step-number {
		font-size: 0.875rem;
		font-weight: 700;
		color: #94a3b8;
	}

	.process-card-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
		line-height: 1.3;
	}

	:global(:root.dark) .process-card-title {
		color: white;
	}

	.process-card-description {
		font-size: 0.875rem;
		color: #64748b;
		line-height: 1.6;
		margin: 0;
	}

	:global(:root.dark) .process-card-description {
		color: #94a3b8;
	}

	.process-progress {
		margin-top: auto;
		padding-top: 0.75rem;
	}

	.process-progress-line {
		height: 3px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		border-radius: 3px;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: 0.1s;
	}

	.process-card:hover .process-progress-line {
		transform: scaleX(1);
	}
</style>
