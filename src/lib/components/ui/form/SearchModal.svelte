<script lang="ts">
	import {
		ArrowRight,
		Search,
		X,
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

	interface BlogPost {
		slug: string;
		title: string;
		categoryLabel: string;
	}

	interface SearchModalData {
		toSelect: string;
		toClose: string;
		quickLinks: string;
		resultsFor: string;
		noArticlesFound: string;
		searchArticle: string;
	}

	interface Category {
		id: string;
		label: string;
		icon: string;
		color: string;
	}

	interface Props {
		show: boolean;
		searchQuery: string;
		filteredPosts: BlogPost[];
		searchModalData: SearchModalData;
		categories: Category[];
		allTags: string[];
		onclose: () => void;
		onselectCategory: (id: string) => void;
		onselectTag: (tag: string) => void;
		onnavigate: (slug: string) => void;
		onsearch?: (query: string) => void;
	}

	let {
		show,
		searchQuery,
		filteredPosts,
		searchModalData,
		categories,
		allTags,
		onclose,
		onselectCategory,
		onselectTag,
		onnavigate,
		onsearch
	}: Props = $props();

	// Local state for input value
	let localQuery = $derived.by(() => searchQuery);

	// Emit search event when local query changes
	function handleInput(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		localQuery = value;
		onsearch?.(value);
	}

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

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onclose();
		}
	}
</script>

{#if show}
	<div
		class="search-modal-overlay"
		onclick={onclose}
		onkeydown={handleKeydown}
		role="button"
		tabindex="-1"
		aria-label="Close search"
	>
		<div
			class="search-modal"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label="Search articles"
			tabindex="-1"
		>
			<div class="modal-header">
				<div class="modal-search-wrapper">
					<Search class="modal-search-icon" aria-hidden="true" />
					<input
						type="text"
						placeholder={searchModalData.searchArticle || 'Search articles, tags, topics...'}
						value={localQuery}
						oninput={handleInput}
						class="modal-search-input"
					/>
				</div>
				<button class="modal-close" onclick={onclose} aria-label="Close">
					<X class="w-5 h-5" />
				</button>
			</div>

			<div class="modal-body">
				{#if localQuery}
					<div class="modal-results">
						<p class="results-label">{searchModalData.resultsFor} "{localQuery}"</p>
						{#if filteredPosts.length > 0}
							<div class="results-list">
								{#each filteredPosts.slice(0, 5) as post (post.slug)}
									<button
										class="result-item"
										onclick={() => {
											onclose();
											onnavigate(post.slug);
										}}
									>
										<div class="result-icon">📄</div>
										<div class="result-content">
											<h4 class="result-title">{post.title}</h4>
											<p class="result-meta">{post.categoryLabel}</p>
										</div>
										<ArrowRight class="result-arrow" />
									</button>
								{/each}
							</div>
						{:else}
							<div class="no-results">
								<span class="no-results-icon">🔍</span>
								<p>{searchModalData.noArticlesFound}</p>
							</div>
						{/if}
					</div>
				{:else}
					<div class="modal-suggestions">
						<p class="suggestions-label">{searchModalData.quickLinks}</p>
						<div class="quick-links">
							{#each categories.slice(1) as category (category.id)}
								{@const IconComponent = getIconComponent(category.icon)}
								<button
									class="quick-link"
									onclick={() => {
										onselectCategory(category.id);
										onclose();
									}}
								>
									<span class="quick-link-icon">
										<IconComponent class="w-4 h-4" />
									</span>
									<span>{category.label}</span>
								</button>
							{/each}
						</div>

						{#if allTags.length > 0}
							<p class="suggestions-label">Trending Tags</p>
							<div class="trending-tags-modal">
								{#each allTags as tag (tag)}
									<button
										class="trending-tag"
										onclick={() => {
											onselectTag(tag);
										}}
									>
										#{tag}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<div class="modal-footer">
				<div class="modal-hint">
					<span class="hint-kbd">↵</span>
					<span>{searchModalData.toSelect}</span>
				</div>
				<div class="modal-hint">
					<span class="hint-kbd">esc</span>
					<span>{searchModalData.toClose}</span>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.search-modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding: 10vh 1rem;
		animation: modal-overlay-in 0.2s ease-out;
	}

	@keyframes modal-overlay-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.search-modal {
		width: 100%;
		max-width: 640px;
		background: white;
		border-radius: 1.25rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		overflow: hidden;
		animation: modal-in 0.3s ease-out;
	}

	:global(.dark) .search-modal {
		background: var(--color-bg);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(-20px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--color-gray-100);
	}

	:global(.dark) .modal-header {
		border-color: rgba(255, 255, 255, 0.1);
	}

	.modal-search-wrapper {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
	}

	.modal-search-input {
		flex: 1;
		padding: 0.5rem 1rem;
		background: transparent;
		border: none;
		font-size: 1.125rem;
		color: var(--color-gray-900);
		outline: none;
	}

	:global(.dark) .modal-search-input {
		color: white;
	}

	.modal-search-input::placeholder {
		color: var(--color-gray-400);
	}

	.modal-close {
		padding: 0.5rem;
		border-radius: 0.5rem;
		color: var(--color-gray-400);
		transition: all 0.2s;
	}

	.modal-close:hover {
		background: var(--color-gray-100);
		color: var(--color-gray-600);
	}

	:global(.dark) .modal-close:hover {
		background: var(--color-bg-secondary);
		color: white;
	}

	.modal-body {
		padding: 1rem 1.25rem;
		max-height: 50vh;
		overflow-y: auto;
	}

	.results-label,
	.suggestions-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.75rem;
	}

	.results-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.875rem 1rem;
		border-radius: 0.75rem;
		background: var(--color-gray-50);
		border: none;
		width: 100%;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s;
	}

	:global(.dark) .result-item {
		background: var(--color-bg-secondary);
	}

	.result-item:hover {
		background: var(--color-primary);
	}

	.result-item:hover .result-title,
	.result-item:hover .result-meta,
	.result-item:hover .result-icon {
		color: white;
	}

	.result-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}

	.result-content {
		flex: 1;
		min-width: 0;
	}

	.result-title {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-gray-900);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 0.2s;
	}

	:global(.dark) .result-title {
		color: white;
	}

	.result-meta {
		font-size: 0.8125rem;
		color: var(--color-gray-500);
		transition: color 0.2s;
	}

	.no-results {
		text-align: center;
		padding: 2rem;
		color: var(--color-gray-500);
	}

	.no-results-icon {
		font-size: 2.5rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	.quick-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.quick-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		border-radius: 0.75rem;
		background: var(--color-gray-100);
		color: var(--color-gray-700);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	:global(.dark) .quick-link {
		background: var(--color-bg-secondary);
		color: var(--color-gray-300);
	}

	.quick-link:hover {
		background: var(--color-primary);
		color: white;
	}

	.quick-link-icon {
		display: flex;
		align-items: center;
	}

	.trending-tags-modal {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.trending-tag {
		padding: 0.5rem 0.875rem;
		border-radius: 9999px;
		background: var(--color-gray-100);
		color: var(--color-gray-600);
		font-size: 0.8125rem;
		transition: all 0.2s;
	}

	:global(.dark) .trending-tag {
		background: var(--color-bg-secondary);
		color: var(--color-gray-400);
	}

	.trending-tag:hover {
		background: var(--color-primary);
		color: white;
	}

	.modal-footer {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 0.875rem 1.25rem;
		border-top: 1px solid var(--color-gray-100);
		background: var(--color-gray-50);
	}

	:global(.dark) .modal-footer {
		background: var(--color-bg-secondary);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.modal-hint {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-gray-500);
	}

	.hint-kbd {
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		background: white;
		border: 1px solid var(--color-gray-200);
		font-family: var(--font-mono);
		font-size: 0.6875rem;
	}

	:global(.dark) .hint-kbd {
		background: var(--color-bg);
		border-color: rgba(255, 255, 255, 0.1);
	}
</style>
