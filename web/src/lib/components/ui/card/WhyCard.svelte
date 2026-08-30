<script lang="ts">
	interface Props {
		icon?: string;
		title: string;
		description?: string;
	}

	let { icon, title, description = '' }: Props = $props();

	import { getIconComponent } from '$lib/icons';
	const IconComponent = $derived(icon ? getIconComponent(icon) : undefined);
</script>

<div class="why-card">
	<div class="why-card-bg"></div>
	<div class="why-card-inner">
		<div class="why-icon-wrapper">
			{#if IconComponent}
				<IconComponent class="w-5 h-5" />
			{/if}
		</div>
		<h3 class="why-title">{title}</h3>
		{#if description}
			<p class="why-description">{description}</p>
		{/if}
		<div class="why-accent"></div>
	</div>
</div>

<style>
	.why-card {
		position: relative;
		border-radius: 0.75rem;
		overflow: visible;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.why-card:hover {
		transform: translateY(-4px);
	}

	.why-card-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05));
		border-radius: 0.75rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.why-card:hover .why-card-bg {
		opacity: 1;
	}

	.why-card-inner {
		position: relative;
		padding: 1rem;
		background: transparent;
		border-radius: 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 100%;
	}

	:global(:root.dark) .why-card-inner {
		background: transparent;
		border-color: rgba(255, 255, 255, 0.1);
	}

	.why-card:hover .why-card-inner {
		background: white;
		border-color: transparent;
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}

	:global(:root.dark) .why-card:hover .why-card-inner {
		background: #1e293b;
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.3),
			0 8px 10px -6px rgba(0, 0, 0, 0.2);
	}

	.why-icon-wrapper {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		border-radius: 0.625rem;
		color: #3b82f6;
		transition: all 0.3s ease;
	}

	:global(:root.dark) .why-icon-wrapper {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
		color: #60a5fa;
	}

	.why-card:hover .why-icon-wrapper {
		transform: scale(1.1) rotate(-5deg);
		background: linear-gradient(135deg, #3b82f6, #8b5cf6);
		color: white;
	}

	.why-title {
		font-size: 0.875rem;
		font-weight: 700;
		color: #0f172a;
		margin: 0;
		line-height: 1.3;
		transition: color 0.3s ease;
	}

	:global(:root.dark) .why-title {
		color: white;
	}

	.why-card:hover .why-title {
		color: #3b82f6;
	}

	:global(:root.dark) .why-card:hover .why-title {
		color: #60a5fa;
	}

	.why-description {
		font-size: 0.75rem;
		color: #64748b;
		line-height: 1.4;
		margin: 0;
	}

	:global(:root.dark) .why-description {
		color: #94a3b8;
	}

	.why-accent {
		position: absolute;
		bottom: 0;
		left: 1rem;
		right: 1rem;
		height: 2px;
		background: linear-gradient(90deg, #3b82f6, #8b5cf6);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s ease;
	}

	.why-card:hover .why-accent {
		transform: scaleX(1);
	}
</style>
