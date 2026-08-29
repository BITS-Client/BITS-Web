<script lang="ts">
	import { Layers, ArrowRight } from '$lib/icons/lucide';

	interface Props {
		notFound: string;
		notFoundDesc?: string;
		buttonLabel?: string;
		onclearfilter: () => void;
	}

	let {
		notFound,
		notFoundDesc = '',
		buttonLabel = 'View All Projects',
		onclearfilter
	}: Props = $props();
</script>

<div class="empty-state">
	<div class="empty-icon">
		<Layers class="w-16 h-16" />
	</div>
	<p class="empty-text">{notFound}</p>
	{#if notFoundDesc}
		<p class="empty-desc">{notFoundDesc}</p>
	{/if}
	<button type="button" class="empty-btn" onclick={onclearfilter}>
		<span>{buttonLabel}</span>
		<ArrowRight class="w-4 h-4" />
	</button>
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
	}

	.empty-icon {
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(16, 185, 129, 0.1));
		border-radius: 24px;
		color: var(--color-primary);
		margin-bottom: 1.5rem;
	}

	:global(.dark) .empty-icon {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(52, 211, 153, 0.15));
		color: #60a5fa;
	}

	.empty-text {
		font-size: 1.125rem;
		color: var(--color-gray-600);
		margin-bottom: 0.5rem;
	}

	.empty-desc {
		font-size: 0.875rem;
		color: var(--color-gray-500);
		margin-bottom: 1.5rem;
	}

	:global(.dark) .empty-text {
		color: #94a3b8;
	}

	:global(.dark) .empty-desc {
		color: #71717a;
	}

	.empty-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: var(--color-primary);
		color: white;
		font-weight: 600;
		border-radius: 12px;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
	}

	.empty-btn:hover {
		background: var(--color-primary-dark);
		transform: translateY(-2px);
	}
</style>
