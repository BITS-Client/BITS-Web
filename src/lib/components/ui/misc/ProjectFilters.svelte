<script lang="ts">
	import { Layers, Code, Zap, Trophy, Star, Eye } from '$lib/icons/lucide';

	interface Category {
		id: string;
		label: string;
		icon: typeof Layers;
	}

	interface Props {
		categories: Category[];
		activeFilter: string;
		categoryCounts: Record<string, number>;
		onfilterchange: (filterId: string) => void;
	}

	let { categories, activeFilter, categoryCounts, onfilterchange }: Props = $props();
</script>

<div class="filter-row" role="tablist" aria-label="Filter projects by category">
	{#each categories as category (category.id)}
		<button
			type="button"
			role="tab"
			aria-selected={activeFilter === category.id}
			class="filter-btn"
			class:active={activeFilter === category.id}
			onclick={() => onfilterchange(category.id)}
		>
			<span class="filter-btn-inner">
				{#if category.icon === Layers}
					<Layers class="w-4 h-4" />
				{:else if category.icon === Code}
					<Code class="w-4 h-4" />
				{:else if category.icon === Zap}
					<Zap class="w-4 h-4" />
				{:else if category.icon === Trophy}
					<Trophy class="w-4 h-4" />
				{:else if category.icon === Star}
					<Star class="w-4 h-4" />
				{:else if category.icon === Eye}
					<Eye class="w-4 h-4" />
				{/if}
				<span>{category.label}</span>
				<span class="filter-count">{categoryCounts[category.id] ?? 0}</span>
			</span>
		</button>
	{/each}
</div>

<style>
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.filter-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.875rem;
		border: 1px solid var(--color-gray-300);
		border-radius: 9999px;
		background: white;
		color: var(--color-gray-600);
		font-size: 0.8125rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	:global(.dark) .filter-btn {
		background: #1f1f1f;
		border-color: #404040;
		color: #a1a1aa;
	}

	.filter-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.filter-btn.active {
		background: linear-gradient(135deg, #10b981 0%, #8b5cf6 50%, #f43f5e 100%);
		background-size: 200% 100%;
		border-color: transparent;
		color: white;
		animation: gradientFlow 5s ease-in-out infinite;
	}

	@keyframes gradientFlow {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	.filter-btn-inner {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.filter-count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.375rem;
		font-size: 0.6875rem;
		font-weight: 600;
		background: var(--color-gray-100);
		border-radius: 9999px;
	}

	:global(.dark) .filter-count {
		background: #404040;
	}

	.filter-btn.active .filter-count {
		background: rgba(255, 255, 255, 0.25);
		color: white;
	}
</style>
