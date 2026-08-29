<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { Zap, X, ChevronLeft, ChevronRight } from '$lib/icons/lucide';
	import { goto } from '$app/navigation';
	import type { Component } from 'svelte';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import { generateWebPageSchema } from '$lib/utils/seo';
	import SidebarSection from '$lib/components/ui/section/SidebarSection.svelte';
	import SearchModal from '$lib/components/ui/form/SearchModal.svelte';
	import BlogCard from '$lib/components/ui/card/BlogCard.svelte';
	import PageHero from '$lib/components/ui/hero/PageHero.svelte';
	import Empty from '$lib/components/ui/misc/Empty.svelte';
	import { onMount } from 'svelte';

	interface BlogPost {
		slug: string;
		title: string;
		excerpt: string;
		category: string;
		categoryLabel: string;
		categoryColor: string;
		image: string;
		author: { name: string; role: string; avatar: string };
		tags: string[];
		date: string;
	}

	interface Category {
		id: string;
		label: string;
		count: number;
		icon: string;
		color: string;
	}

	let { data } = $props();

	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}

	const seoTitle = $derived(data.blogPage?.seo?.title || '');
	const seoDescription = $derived(data.blogPage?.seo?.description || '');

	const heroBadge = $derived(data.blogPage?.hero?.badge || '');
	const heroTitle = $derived(data.blogPage?.hero?.title || '');
	const heroSubtitle = $derived(data.blogPage?.hero?.subtitle || '');
	const searchArticleLabel = $derived(data.blogPage?.hero?.searchArticle || '');

	const contentAllCategories = $derived(data.blogPage?.content?.allCategories || '');
	const contentCategories = $derived(data.blogPage?.content?.categories || '');
	const contentTrendingTags = $derived(data.blogPage?.searchModal?.trendingTags || '');
	const contentLatestArticles = $derived(data.blogPage?.content?.latestArticles || '');
	const contentArticlesCount = $derived(data.blogPage?.content?.articlesCount || '');
	const contentClearFilters = $derived(data.blogPage?.content?.clearFilters || '');
	const contentNoArticlesFound = $derived(data.blogPage?.searchModal?.noArticlesFound || '');
	const contentAdjustSearchFilter = $derived(data.blogPage?.content?.adjustSearchFilter || '');
	const contentViewAllArticles = $derived(data.blogPage?.content?.viewAllArticles || '');

	const searchToSelect = $derived(data.blogPage?.searchModal?.toSelect || '');
	const searchToClose = $derived(data.blogPage?.searchModal?.toClose || '');
	const searchQuickLinks = $derived(data.blogPage?.searchModal?.quickLinks || '');
	const searchResultsFor = $derived(data.blogPage?.searchModal?.resultsFor || '');

	const blogPosts = $derived(
		(data.posts || []).map(
			(post: {
				_id: string;
				title: string;
				slug: { current: string };
				imageUrl?: string;
				author?: { name: string; role?: string; avatarUrl?: string };
				category?: { title: string; slug: { current: string }; color?: string };
				tags?: string[];
				publishedAt: string;
				seo?: { description?: string };
			}) => ({
				slug: post.slug?.current || '',
				title: post.title || '',
				excerpt: post.seo?.description || '',
				category: post.category?.slug?.current || 'technology',
				categoryLabel: post.category?.title || 'Technology',
				categoryColor: post.category?.color || '#3b82f6',
				image: post.imageUrl || '',
				author: {
					name: post.author?.name || 'BITS Team',
					role: post.author?.role || 'Author',
					avatar: post.author?.avatarUrl || ''
				},
				tags: post.tags || [],
				date: post.publishedAt || new Date().toISOString()
			})
		)
	);

	const allBlogPosts = $derived(
		(data.allPosts || []).map(
			(post: {
				_id: string;
				title: string;
				slug: { current: string };
				imageUrl?: string;
				author?: { name: string; role?: string; avatarUrl?: string };
				category?: { title: string; slug: { current: string }; color?: string };
				tags?: string[];
				publishedAt: string;
				seo?: { description?: string };
			}) => ({
				slug: post.slug?.current || '',
				title: post.title || '',
				excerpt: post.seo?.description || '',
				category: post.category?.slug?.current || 'technology',
				categoryLabel: post.category?.title || 'Technology',
				categoryColor: post.category?.color || '#3b82f6',
				image: post.imageUrl || '',
				author: {
					name: post.author?.name || 'BITS Team',
					role: post.author?.role || 'Author',
					avatar: post.author?.avatarUrl || ''
				},
				tags: post.tags || [],
				date: post.publishedAt || new Date().toISOString()
			})
		)
	);

	const breadcrumbs = $derived.by(() => {
		const homeLabel =
			data.navigation?.items?.find((item: { href: string }) => item.href === '/')?.label || 'Home';
		const title = data.blogPage?.seo?.title || 'Blog';
		return [
			{ name: homeLabel, url: '/' },
			{ name: title, url: '/blog' }
		];
	});

	const categories = $derived.by((): Category[] => {
		const sanityCategories = data.categories || [];
		const posts = data.allPosts || [];

		const allCategory: Category = {
			id: 'all',
			label: contentAllCategories || 'All Posts',
			count: posts.length,
			icon: '✨',
			color: '#8b5cf6'
		};

		const mappedCategories: Category[] = sanityCategories.map(
			(cat: {
				_id: string;
				title: string;
				slug: { current: string };
				color?: string;
				icon?: string;
			}) => ({
				id: cat.slug?.current || cat._id,
				label: cat.title || '',
				count: posts.filter(
					(p: { category?: { slug?: { current?: string } } }) =>
						p.category?.slug?.current === cat.slug?.current
				).length,
				icon: cat.icon || 'Folder',
				color: cat.color || '#6366f1'
			})
		);

		return [allCategory, ...mappedCategories];
	});

	const webPageSchema = $derived(generateWebPageSchema(seoTitle, seoDescription, '/blog'));

	const activeCategory = $derived(data.activeCategory || 'all');
	const searchQuery = $derived(data.searchQuery || '');
	let showSearchModal = $state(false);

	function openSearchModal() {
		showSearchModal = true;
		document.body.style.overflow = 'hidden';
	}

	function closeSearchModal() {
		showSearchModal = false;
		document.body.style.overflow = '';
	}

	function _handleSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeSearchModal();
		}
	}

	function selectCategory(id: string) {
		void goto(buildPageUrl(1, id, searchQuery));
	}

	function selectTag(tag: string) {
		void goto(buildPageUrl(1, activeCategory, tag));
	}

	function navigateTo(slug: string) {
		goto(resolve(`/blog/${slug}`));
	}

	const filteredPosts = $derived.by((): BlogPost[] => {
		let posts: BlogPost[] = allBlogPosts;

		if (activeCategory !== 'all') {
			posts = posts.filter((p: BlogPost) => p.category === activeCategory);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			posts = posts.filter(
				(p: BlogPost) =>
					p.title.toLowerCase().includes(query) ||
					p.excerpt.toLowerCase().includes(query) ||
					p.tags.some((tag: string) => tag.toLowerCase().includes(query))
			);
		}

		return posts;
	});

	const paginatedFilteredPosts = $derived.by((): BlogPost[] => {
		if (activeCategory === 'all' && !searchQuery) return blogPosts;
		const start = (effectiveCurrentPage - 1) * postsPerPage;
		const end = start + postsPerPage;
		return filteredPosts.slice(start, end);
	});

	const postsPerPage = $derived(
		(data as { postsPerPage?: number }).postsPerPage ||
			data.config?.listingPages?.postsPerPage ||
			10
	);
	const currentPage = $derived(Math.max(1, (data as { page?: number }).page || 1));
	const totalPosts = $derived((data as { totalPosts?: number }).totalPosts || 0);
	const totalFilteredPosts = $derived(
		activeCategory === 'all' && !searchQuery ? totalPosts : filteredPosts.length
	);
	const totalPages = $derived(Math.max(1, Math.ceil(totalFilteredPosts / postsPerPage)));
	const effectiveCurrentPage = $derived(Math.min(currentPage, totalPages));

	const showPagination = $derived(totalPages > 1);

	function buildPageUrl(
		page: number,
		category: string = activeCategory,
		query: string = searchQuery
	) {
		const target = Math.max(1, Math.min(page, totalPages));
		const base = resolve('/blog');
		const queryParts: string[] = [];
		if (category && category !== 'all') queryParts.push(`category=${encodeURIComponent(category)}`);
		if (query) queryParts.push(`q=${encodeURIComponent(query)}`);
		if (target > 1) queryParts.push(`page=${target}`);
		const qs = queryParts.join('&');
		return qs ? `${base}?${qs}` : base;
	}

	const pageLinks = $derived.by(() => {
		const pages: number[] = [];
		const start = Math.max(1, effectiveCurrentPage - 2);
		const end = Math.min(totalPages, effectiveCurrentPage + 2);
		for (let i = start; i <= end; i += 1) pages.push(i);
		return pages;
	});

	const allTags = $derived((data.allTags as string[]) || []);

	let reducedMotion = $state(false);

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reducedMotion) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		document.querySelectorAll('.scroll-animate').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<SEO
	title={seoTitle}
	description={seoDescription}
	image={data.information?.siteLogo?.asset?.url}
	imageAlt={data.information?.siteLogo?.alt || seoTitle}
	siteIcon={data.information?.siteIcon?.asset?.url}
	locale={data.locale}
	{breadcrumbs}
	jsonLd={[webPageSchema as unknown]}
/>

<SearchModal
	show={showSearchModal}
	{searchQuery}
	{filteredPosts}
	searchModalData={{
		toSelect: searchToSelect,
		toClose: searchToClose,
		quickLinks: searchQuickLinks,
		resultsFor: searchResultsFor,
		noArticlesFound: contentNoArticlesFound,
		searchArticle: searchArticleLabel
	}}
	{categories}
	{allTags}
	onclose={closeSearchModal}
	onselectCategory={selectCategory}
	onselectTag={selectTag}
	onnavigate={navigateTo}
	onsearch={(query) => {
		void goto(buildPageUrl(1, activeCategory, query));
	}}
/>

<PageHero
	badge={heroBadge}
	title={heroTitle}
	subtitle={heroSubtitle}
	{breadcrumbs}
	locale={data.locale}
	icon={Zap as unknown as Component}
	searchButton={{ label: searchArticleLabel, onclick: openSearchModal }}
/>

<section class="articles-section" aria-labelledby="all-posts-heading">
	<div class="container-base">
		<div class="articles-layout">
			<SidebarSection
				{categories}
				{allTags}
				{activeCategory}
				{contentCategories}
				{contentTrendingTags}
				onselectCategory={selectCategory}
				onselectTag={selectTag}
			/>

			<main class="articles-main">
				<div class="articles-header">
					<h2 id="all-posts-heading" class="articles-title">
						{contentLatestArticles}
					</h2>
					<div class="articles-meta">
						<span class="articles-count">{filteredPosts.length} {contentArticlesCount}</span>
						{#if activeCategory !== 'all' || searchQuery}
							<button
								class="clear-filters"
								onclick={() => {
									void goto(buildPageUrl(1, 'all', ''));
								}}
							>
								<X class="w-3.5 h-3.5" />
								{contentClearFilters}
							</button>
						{/if}
					</div>
				</div>

				<div class="articles-list">
					{#each paginatedFilteredPosts as post (post.slug)}
						<BlogCard {post} locale={data.locale} />
					{/each}
				</div>

				{#if filteredPosts.length === 0}
					<Empty
						notFound={contentNoArticlesFound}
						notFoundDesc={contentAdjustSearchFilter}
						buttonLabel={contentViewAllArticles}
						onclearfilter={() => {
							void goto(buildPageUrl(1, 'all', ''));
						}}
					/>
				{/if}

				{#if showPagination}
					<nav class="load-more" aria-label="Blog pagination">
						<div class="pagination-wrap">
							<a
								class="page-link nav-link"
								href={buildPageUrl(effectiveCurrentPage - 1)}
								aria-disabled={effectiveCurrentPage <= 1}
								aria-label="Previous page"
							>
								<ChevronLeft class="w-4 h-4" />
							</a>

							<div class="page-links">
								{#each pageLinks as pageNumber (pageNumber)}
									<a
										class={`page-link ${pageNumber === effectiveCurrentPage ? 'active' : ''}`}
										href={buildPageUrl(pageNumber)}
									>
										{pageNumber}
									</a>
								{/each}
							</div>

							<a
								class="page-link nav-link"
								href={buildPageUrl(effectiveCurrentPage + 1)}
								aria-disabled={effectiveCurrentPage >= totalPages}
								aria-label="Next page"
							>
								<ChevronRight class="w-4 h-4" />
							</a>
						</div>
					</nav>
				{:else}
					<div class="load-more">
						<p class="load-more-hint">{filteredPosts.length} {contentArticlesCount}</p>
					</div>
				{/if}
			</main>
		</div>
	</div>
</section>

<style>
	.articles-section {
		padding: 5rem 0;
		background: white;
	}

	:global(.dark) .articles-section {
		background: var(--color-bg);
	}

	.articles-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 1024px) {
		.articles-layout {
			grid-template-columns: 280px 1fr;
		}
	}

	.articles-main {
		order: 1;
	}

	@media (min-width: 1024px) {
		.articles-main {
			order: 2;
		}
	}

	.articles-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.articles-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-gray-900);
	}

	:global(.dark) .articles-title {
		color: white;
	}

	.articles-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.articles-count {
		font-size: 0.875rem;
		color: var(--color-gray-500);
		padding: 0.375rem 0.875rem;
		background: var(--color-gray-100);
		border-radius: 9999px;
	}

	:global(.dark) .articles-count {
		background: var(--color-bg);
		color: var(--color-gray-400);
	}

	.clear-filters {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		border-radius: 9999px;
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		font-size: 0.8125rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.clear-filters:hover {
		background: #ef4444;
		color: white;
	}

	.articles-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.load-more {
		margin-top: 2rem;
		text-align: center;
	}

	.pagination-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.875rem;
		flex-wrap: wrap;
		padding: 0.75rem;
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(248, 250, 252, 0.8), rgba(255, 255, 255, 0.9));
		border: 1px solid rgba(148, 163, 184, 0.14);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
	}

	:global(.dark) .pagination-wrap {
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.72));
		border-color: rgba(148, 163, 184, 0.12);
		box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.06);
	}

	.page-links {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem;
		border-radius: 0.85rem;
		background: rgba(148, 163, 184, 0.08);
	}

	:global(.dark) .page-links {
		background: rgba(148, 163, 184, 0.07);
	}

	.page-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0 0.5rem;
		border-radius: 0.7rem;
		background: transparent;
		color: var(--color-gray-600);
		font-weight: 600;
		font-size: 0.875rem;
		transition: all 0.18s ease;
	}

	.page-link:hover {
		background: rgba(59, 130, 246, 0.1);
		color: var(--color-gray-900);
		transform: translateY(-1px);
	}

	.page-link.active {
		background: linear-gradient(135deg, #111827, #334155);
		color: white;
		box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
	}

	.nav-link {
		font-size: 0;
		width: 3rem;
		height: 3rem;
		padding: 0;
		border-radius: 0.85rem;
		background: rgba(148, 163, 184, 0.08);
	}

	.nav-link[aria-disabled='true'] {
		pointer-events: none;
		opacity: 0.5;
		transform: none;
		box-shadow: none;
	}

	:global(.dark) .page-link {
		color: var(--color-gray-300);
	}

	:global(.dark) .nav-link {
		background: rgba(148, 163, 184, 0.07);
	}

	:global(.dark) .page-link:hover {
		background: rgba(56, 189, 248, 0.14);
		color: white;
	}

	:global(.dark) .page-link.active {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(226, 232, 240, 0.95));
		color: #0f172a;
		box-shadow: 0 8px 18px rgba(2, 6, 23, 0.22);
	}

	:global(.dark) .nav-link:hover {
		box-shadow: 0 12px 24px rgba(2, 6, 23, 0.2);
	}

	.load-more-hint {
		color: var(--color-gray-500);
		font-size: 0.875rem;
	}

	:global(.dark) .load-more-hint {
		color: var(--color-gray-400);
	}
</style>
