<script lang="ts">
	import FloatingElement from '$lib/components/ui/animation/FloatingElement.svelte';

	type FloatingVariant = 'icon' | 'dots';

	interface Props {
		class?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		icon?: any;
		variant?: FloatingVariant;
		color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple';
		duration?: number;
		amplitude?: number;
	}

	const colorMap = {
		primary: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' },
		secondary: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.2)', text: '#22c55e' },
		success: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.2)', text: '#10b981' },
		warning: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' },
		danger: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
		purple: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.2)', text: '#8b5cf6' }
	};

	let {
		class: className = '',
		icon: Icon,
		variant = 'icon',
		color = 'purple',
		duration = 4500,
		amplitude = 25
	}: Props = $props();

	const colors = $derived(colorMap[color]);
</script>

<FloatingElement class={className} {duration} {amplitude}>
	{#if variant === 'icon' && Icon}
		<div
			class="section-float-icon"
			style="--float-bg: {colors.bg}; --float-border: {colors.border}; --float-color: {colors.text}"
		>
			<Icon class="w-8 h-8" />
		</div>
	{:else if variant === 'dots'}
		<div class="section-float-dots" style="--float-bg: {colors.bg}; --float-color: {colors.text}">
			<span></span>
			<span></span>
			<span></span>
		</div>
	{/if}
</FloatingElement>

<style>
	.section-float-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		border-radius: 16px;
		background: var(--float-bg);
		border: 1px solid var(--float-border);
		color: var(--float-color);
	}

	.section-float-dots {
		display: flex;
		gap: 8px;
		padding: 12px 16px;
		border-radius: 20px;
		background: var(--float-bg);
	}

	.section-float-dots span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--float-color);
		animation: section-float-dot-pulse 2s ease-in-out infinite;
		opacity: 0.5;
	}

	.section-float-dots span:nth-child(2) {
		animation-delay: 0.3s;
	}

	.section-float-dots span:nth-child(3) {
		animation-delay: 0.6s;
	}

	@keyframes section-float-dot-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.3);
			opacity: 1;
		}
	}
</style>
