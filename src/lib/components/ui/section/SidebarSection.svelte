<script lang="ts">
	import {
		Sparkles,
		Folder,
		Tag,
		Code,
		Palette,
		Lightbulb,
		TrendingUp,
		FileText,
		Briefcase,
		Globe,
		Shield,
		Smartphone,
		Cloud,
		Aperture,
		Zap,
		Heart,
		Star
	} from '$lib/icons/lucide';

	interface Category {
		id: string;
		label: string;
		count: number;
		icon: string;
		color: string;
	}

	interface Props {
		categories: Category[];
		allTags: string[];
		activeCategory: string;
		contentCategories: string;
		contentTrendingTags: string;
		onselectCategory: (id: string) => void;
		onselectTag: (tag: string) => void;
	}

	let {
		categories,
		allTags,
		activeCategory,
		contentCategories = 'Categories',
		contentTrendingTags = 'Trending Tags',
		onselectCategory,
		onselectTag
	}: Props = $props();

	const iconMap: Record<string, typeof Folder> = {
		Folder,
		Tag,
		Code,
		Palette,
		Lightbulb,
		TrendingUp,
		FileText,
		Briefcase,
		Globe,
		Shield,
		Smartphone,
		Cloud,
		Aperture,
		Zap,
		Heart,
		Star
	};

	const defaultIcon = Folder;

	function getIconComponent(icon: string): typeof Folder | typeof Sparkles {
		if (icon === '✨') return Sparkles;
		return iconMap[icon] || defaultIcon;
	}
</script>

<aside class="sidebar" aria-label="Blog sidebar">
	<div class="sidebar-sticky">
		<div class="sidebar-card">
			<h3 class="sidebar-title">
				<span class="title-icon">📂</span>
				{contentCategories}
			</h3>
			<div class="category-list" role="group" aria-label="Filter by category">
				{#each categories as category (category.id)}
					{@const IconComponent = getIconComponent(category.icon)}
					<button
						class="category-btn {activeCategory === category.id ? 'active' : ''}"
						onclick={() => onselectCategory(category.id)}
						style="--cat-color: {category.color}"
					>
						<span class="category-icon">
							<IconComponent class="w-5 h-5" />
						</span>
						<span class="category-name">{category.label}</span>
						<span class="category-count">{category.count}</span>
						<span class="category-indicator"></span>
					</button>
				{/each}
			</div>
		</div>

		<div class="sidebar-card">
			<h3 class="sidebar-title">
				<span class="title-icon">🔥</span>
				{contentTrendingTags}
			</h3>
			<div class="tags-cloud">
				{#each allTags as tag (tag)}
					<button class="tag-btn" onclick={() => onselectTag(tag)}>
						<span class="tag-hash">#</span>{tag}
					</button>
				{/each}
			</div>
		</div>
	</div>
</aside>

<style>
	.sidebar {
		order: 2;
	}

	@media (min-width: 1024px) {
		.sidebar {
			order: 1;
		}
	}

	.sidebar-sticky {
		position: sticky;
		top: 6rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.sidebar-card {
		background: white;
		border-radius: 1.25rem;
		border-radius: 1.25rem;
		padding: 1.5rem;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.04),
			0 4px 12px rgba(0, 0, 0, 0.03);
		border: 1px solid var(--color-gray-300);
	}

	:global(.dark) .sidebar-card {
		background: var(--color-bg);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.sidebar-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-gray-900);
		margin-bottom: 1rem;
	}

	:global(.dark) .sidebar-title {
		color: white;
	}

	.title-icon {
		font-size: 1.125rem;
	}

	.category-list {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.category-btn {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		text-align: left;
		transition: all 0.25s ease;
		overflow: hidden;
	}

	.category-btn:hover {
		background: var(--color-gray-100);
	}

	:global(.dark) .category-btn:hover {
		background: var(--color-bg-secondary);
	}

	.category-btn.active {
		background: linear-gradient(
			135deg,
			var(--cat-color, var(--color-primary)) 0%,
			color-mix(in srgb, var(--cat-color, var(--color-primary)) 80%, #1e1b4b) 100%
		);
	}

	.category-indicator {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 3px;
		height: 0;
		background: var(--cat-color, var(--color-primary));
		border-radius: 0 2px 2px 0;
		transition: height 0.2s ease;
	}

	.category-btn.active .category-indicator {
		height: 60%;
	}

	.category-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
	}

	.category-name {
		flex: 1;
		font-size: 0.9375rem;
		color: var(--color-gray-700);
		transition: color 0.2s;
	}

	:global(.dark) .category-name {
		color: var(--color-gray-300);
	}

	.category-btn.active .category-name {
		color: white;
		font-weight: 600;
	}

	.category-count {
		padding: 0.25rem 0.625rem;
		border-radius: 9999px;
		background: var(--color-gray-100);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-gray-600);
		transition: all 0.2s;
	}

	:global(.dark) .category-count {
		background: var(--color-bg-secondary);
		color: var(--color-gray-400);
	}

	.category-btn.active .category-count {
		background: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.tags-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag-btn {
		padding: 0.5rem 0.875rem;
		border-radius: 9999px;
		background: var(--color-gray-100);
		font-size: 0.8125rem;
		font-size: 0.8125rem;
		color: var(--color-gray-600);
		transition: all 0.25s ease;
		border: 1px solid var(--color-gray-300);
	}

	:global(.dark) .tag-btn {
		background: var(--color-bg-secondary);
		color: var(--color-gray-400);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.tag-hash {
		color: var(--color-primary);
		font-weight: 600;
	}

	.tag-btn:hover {
		background: var(--color-primary);
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.tag-btn:hover .tag-hash {
		color: white;
	}
</style>
