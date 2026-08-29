<script lang="ts">
	import { Trophy, Layers, ChevronLeft, ChevronRight } from '$lib/icons/lucide';
	import { resolvePath } from '$lib/utils';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import PageHero from '$lib/components/ui/hero/PageHero.svelte';
	import GeneralCard from '$lib/components/ui/card/GeneralCard.svelte';
	import ProjectFilters from '$lib/components/ui/misc/ProjectFilters.svelte';
	import Empty from '$lib/components/ui/misc/Empty.svelte';
	import BigCTA from '$lib/components/ui/cta/BigCTA.svelte';
	import { generateWebPageSchema } from '$lib/utils/seo';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';

	let { data } = $props();

	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}

	// SEO
	const seoTitle = $derived(data.portfolioPage?.seo?.title || '');
	const seoDescription = $derived(data.portfolioPage?.seo?.description || '');

	const breadcrumbs = $derived.by(() => {
		const homeLabel =
			data.navigation?.items?.find((item: { href: string }) => item.href === '/')?.label || 'Home';
		const title = data.portfolioPage?.seo?.title || 'Portfolio';
		return [
			{ name: homeLabel, url: '/' },
			{ name: title, url: '/portfolio' }
		];
	});

	const webPageSchema = $derived(generateWebPageSchema(seoTitle, seoDescription, '/portfolio'));

	// Filter state
	const activeFilter = $derived(data.activeFilter || 'all');

	function setFilter(filter: string) {
		void goto(buildPageUrl(1, filter));
	}

	// Category icons mapping
	const categoryIcons: Record<string, typeof Layers> = {
		web: 'Code' as unknown as typeof Layers,
		software: 'Zap' as unknown as typeof Layers,
		erp: 'Trophy' as unknown as typeof Layers,
		ai: 'Star' as unknown as typeof Layers,
		creative: 'Eye' as unknown as typeof Layers
	};

	// Categories
	const categories = $derived.by(() => {
		const allCategory = { id: 'all', label: 'All Projects', icon: Layers };

		const sanityCategories = (data.categories || []).map(
			(cat: { _id: string; title: string; slug: { current: string } }) => ({
				id: cat.slug?.current || cat._id,
				label: cat.title || '',
				icon: categoryIcons[cat.slug?.current || ''] || Layers
			})
		);

		return [allCategory, ...sanityCategories];
	});

	// Projects for full-dataset filtering
	const allProjects = $derived(
		(data.allProjects || []).map(
			(project: {
				_id: string;
				title: string | undefined;
				slug: { current: string };
				client?: { name: string; iconUrl?: string };
				description?: string;
				imageUrl?: string;
				category?: { title: string; slug: { current: string }; color?: string };
				techStack?: string[];
				featured?: boolean;
				publishedAt?: string;
			}) => ({
				slug: project.slug?.current || '',
				title: project.title || '',
				client: project.client?.name || '',
				clientIcon: project.client?.iconUrl || '',
				description: project.description || '',
				image: project.imageUrl || '',
				category: project.category?.slug?.current || 'web',
				techStack: project.techStack || [],
				featured: project.featured || false,
				year: project.publishedAt ? new Date(project.publishedAt).getFullYear().toString() : ''
			})
		)
	);

	// Projects for current paginated page
	const paginatedProjects = $derived(
		(data.projects || []).map(
			(project: {
				_id: string;
				title: string | undefined;
				slug: { current: string };
				client?: { name: string; iconUrl?: string };
				description?: string;
				imageUrl?: string;
				category?: { title: string; slug: { current: string }; color?: string };
				techStack?: string[];
				featured?: boolean;
				publishedAt?: string;
			}) => ({
				slug: project.slug?.current || '',
				title: project.title || '',
				client: project.client?.name || '',
				clientIcon: project.client?.iconUrl || '',
				description: project.description || '',
				image: project.imageUrl || '',
				category: project.category?.slug?.current || 'web',
				techStack: project.techStack || [],
				featured: project.featured || false,
				year: project.publishedAt ? new Date(project.publishedAt).getFullYear().toString() : ''
			})
		)
	);

	// Get stats with locale-specific labels (already localized from query)
	const stats = $derived(data.homePageStats?.items || []);

	// Filtered projects
	const filteredProjects = $derived(
		activeFilter === 'all'
			? allProjects
			: allProjects.filter((p: { category: string }) => p.category === activeFilter)
	);

	const paginatedFilteredProjects = $derived.by(() => {
		if (activeFilter === 'all') return paginatedProjects;
		const start = (effectiveCurrentPage - 1) * projectsPerPage;
		const end = start + projectsPerPage;
		return filteredProjects.slice(start, end);
	});

	const displayedProjects = $derived(paginatedFilteredProjects);

	const currentPage = $derived(Math.max(1, (data as { page?: number }).page || 1));
	const projectsPerPage = $derived(
		(data as { projectsPerPage?: number }).projectsPerPage ||
			data.config?.listingPages?.projectsPerPage ||
			9
	);
	const totalProjects = $derived((data as { totalProjects?: number }).totalProjects || 0);
	const totalFilteredProjects = $derived(
		activeFilter === 'all' ? totalProjects : filteredProjects.length
	);
	const totalPages = $derived(Math.max(1, Math.ceil(totalFilteredProjects / projectsPerPage)));
	const effectiveCurrentPage = $derived(Math.min(currentPage, totalPages));
	const showPagination = $derived(totalPages > 1);

	function buildPageUrl(page: number, filter: string = activeFilter) {
		const target = Math.max(1, Math.min(page, totalPages));
		const base = resolve('/portfolio');
		const queryParts: string[] = [];
		if (filter && filter !== 'all') queryParts.push(`filter=${encodeURIComponent(filter)}`);
		if (target > 1) queryParts.push(`page=${target}`);
		const query = queryParts.join('&');
		return query ? `${base}?${query}` : base;
	}

	const pageLinks = $derived.by(() => {
		const pages: number[] = [];
		const start = Math.max(1, effectiveCurrentPage - 2);
		const end = Math.min(totalPages, effectiveCurrentPage + 2);
		for (let i = start; i <= end; i += 1) pages.push(i);
		return pages;
	});

	// Category counts
	const categoryCounts = $derived.by(() => {
		const counts: Record<string, number> = { all: allProjects.length };
		for (const project of allProjects) {
			counts[project.category] = (counts[project.category] || 0) + 1;
		}
		return counts;
	});

	// Get category label
	function getCategoryLabel(categoryId: string): string {
		if (categoryId === 'all') return 'All Projects';
		const cat = categories.find((c) => c.id === categoryId);
		return cat?.label || categoryId;
	}

	// Card colors based on category
	const categoryColors: Record<string, string> = {
		web: 'from-blue-500 via-cyan-500 to-teal-500',
		software: 'from-purple-500 via-violet-500 to-indigo-500',
		erp: 'from-emerald-500 via-green-500 to-teal-500',
		ai: 'from-orange-500 via-amber-500 to-yellow-500',
		creative: 'from-pink-500 via-rose-500 to-red-500'
	};

	// Get color for a project
	function getProjectColor(category: string): string {
		return categoryColors[category] || 'from-blue-500 via-purple-500 to-pink-500';
	}

	onMount(() => {
		// Skip animation for reduced motion
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.id === 'projects-section') {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		const section = document.getElementById('projects-section');
		if (section) observer.observe(section);

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

<PageHero
	badge={data.portfolioPage?.hero?.badge}
	title={data.portfolioPage?.hero?.title}
	subtitle={data.portfolioPage?.hero?.subtitle}
	{stats}
	icon={Trophy as unknown as Component}
	locale={data.locale}
	{breadcrumbs}
/>

<section id="projects-section" class="projects-section" aria-labelledby="projects-heading">
	<div class="container-base relative z-10 py-10 lg:py-16">
		<ProjectFilters {categories} {activeFilter} {categoryCounts} onfilterchange={setFilter} />

		<div class="projects-grid" role="tabpanel">
			{#each displayedProjects as project, index (project.slug)}
				<GeneralCard
					{project}
					categoryLabel={getCategoryLabel(project.category)}
					{index}
					locale={data.locale}
					color={getProjectColor(project.category)}
				/>
			{/each}
		</div>

		{#if displayedProjects.length === 0}
			<Empty
				notFound={data.portfolioPage?.itemLabels?.notFound || 'No projects found'}
				notFoundDesc={data.portfolioPage?.itemLabels?.notFoundDesc}
				buttonLabel={data.portfolioPage?.itemLabels?.viewAllProjects || 'View All Projects'}
				onclearfilter={() => setFilter('all')}
			/>
		{/if}

		{#if showPagination}
			<nav class="portfolio-pagination" aria-label="Portfolio pagination">
				<a
					class="pagination-link nav-link"
					href={buildPageUrl(effectiveCurrentPage - 1)}
					aria-disabled={effectiveCurrentPage <= 1}
					aria-label="Previous page"
				>
					<ChevronLeft class="w-4 h-4" />
				</a>

				<div class="pagination-links">
					{#each pageLinks as pageNumber (pageNumber)}
						<a
							class={`pagination-link ${pageNumber === effectiveCurrentPage ? 'active' : ''}`}
							href={buildPageUrl(pageNumber)}
						>
							{pageNumber}
						</a>
					{/each}
				</div>

				<a
					class="pagination-link nav-link"
					href={buildPageUrl(effectiveCurrentPage + 1)}
					aria-disabled={effectiveCurrentPage >= totalPages}
					aria-label="Next page"
				>
					<ChevronRight class="w-4 h-4" />
				</a>
			</nav>
		{/if}
	</div>
</section>

<BigCTA cta={data.portfolioPage?.cta} locale={data.locale} />

<style>
	.projects-section {
		position: relative;
		background: white;
		overflow: hidden;
	}

	:global(.dark) .projects-section {
		background: var(--color-bg);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease,
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: 0.2s;
	}

	:global(.projects-section.animate-in) .projects-grid {
		opacity: 1;
		transform: translateY(0);
	}

	@media (min-width: 640px) {
		.projects-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.projects-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.projects-grid {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}

	.portfolio-pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.875rem;
		flex-wrap: wrap;
		margin-top: 2rem;
		padding: 0.75rem;
		border-radius: 1rem;
		background: linear-gradient(180deg, rgba(248, 250, 252, 0.8), rgba(255, 255, 255, 0.9));
		border: 1px solid rgba(148, 163, 184, 0.14);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
	}

	:global(.dark) .portfolio-pagination {
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.72));
		border-color: rgba(148, 163, 184, 0.12);
		box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.06);
	}

	.pagination-links {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem;
		border-radius: 0.85rem;
		background: rgba(148, 163, 184, 0.08);
	}

	:global(.dark) .pagination-links {
		background: rgba(148, 163, 184, 0.07);
	}

	.pagination-link {
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

	.pagination-link:hover {
		background: rgba(59, 130, 246, 0.1);
		color: var(--color-gray-900);
		transform: translateY(-1px);
	}

	.pagination-link.active {
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

	:global(.dark) .nav-link:hover {
		box-shadow: 0 12px 24px rgba(2, 6, 23, 0.2);
	}

	:global(.dark) .pagination-link {
		color: var(--color-gray-300);
	}

	:global(.dark) .nav-link {
		background: rgba(148, 163, 184, 0.07);
	}

	:global(.dark) .pagination-link:hover {
		background: rgba(56, 189, 248, 0.14);
		color: white;
	}

	:global(.dark) .pagination-link.active {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(226, 232, 240, 0.95));
		color: #0f172a;
		box-shadow: 0 8px 18px rgba(2, 6, 23, 0.22);
	}
</style>
