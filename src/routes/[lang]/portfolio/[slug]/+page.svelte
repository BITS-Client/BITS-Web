<script lang="ts">
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import DetailHero from '$lib/components/ui/hero/DetailHero.svelte';
	import PortfolioContent from '$lib/components/ui/content/PortfolioContent.svelte';
	import RelatedSection from '$lib/components/ui/section/RelatedSection.svelte';
	import BigCTA from '$lib/components/ui/cta/BigCTA.svelte';
	import NotFound from '$lib/components/ui/misc/NotFound.svelte';
	import { generateCreativeWorkSchema, seoConfig } from '$lib/utils/seo';
	import { resolvePath } from '$lib/utils';

	let { data } = $props();

	// Get project directly from Sanity data (matching service pattern)
	interface ProjectClient {
		_id: string;
		name: string;
		website?: string;
		logoUrl?: string;
		iconUrl?: string;
	}
	interface GalleryImage {
		_key: string;
		url?: string;
		lqip?: string;
		aspectRatio?: number;
		width?: number;
		height?: number;
	}
	interface ProjectData {
		_id: string;
		title: string | undefined;
		slug: { current: string };
		client?: ProjectClient;
		challenge?: string;
		solution?: string;
		result?: string;
		imageUrl?: string;
		gallery?: GalleryImage[];
		category?: { _id: string; title: string; slug: { current: string }; color?: string };
		techStack?: string[];
		stats?: Array<{ _key: string; value: string; label: string }>;
		testimonial?: { name: string; content: string };
		featured?: boolean;
		publishedAt?: string;
		seo?: { title?: string; description?: string; keywords?: string[] };
	}
	let project = $derived(data.project as ProjectData | null | undefined);

	// SEO title from Sanity with fallback to content title
	const seoTitle = $derived(project?.seo?.title || `${project?.title || ''} - Portfolio`);

	// SEO description from Sanity
	const seoDescription = $derived(project?.seo?.description || '');

	// Breadcrumbs
	const breadcrumbs = $derived.by(() => {
		if (!project) return [];
		const homeLabel =
			data.navigation?.items?.find((item: { href: string }) => item.href === '/')?.label || 'Home';
		return [
			{ name: homeLabel, url: '/' },
			{ name: 'Portfolio', url: '/portfolio' },
			{ name: seoTitle, url: `/portfolio/${project.slug?.current || ''}` }
		];
	});

	const creativeWorkSchema = $derived(
		project
			? generateCreativeWorkSchema(
					project.title || '',
					seoDescription,
					undefined,
					project.imageUrl || seoConfig.defaultImage,
					`/portfolio/${project.slug?.current || ''}`
				)
			: null
	);

	// Content sections for PortfolioContent
	const contentSections = $derived.by(() => {
		if (!project) return [];
		const sections = [];
		if (project.challenge) {
			sections.push({
				label: data.portfolioPage?.itemLabels?.challenge || 'Challenge',
				content: project.challenge,
				number: 1,
				color: 'bg-red-100 text-red-600'
			});
		}
		if (project.solution) {
			sections.push({
				label: data.portfolioPage?.itemLabels?.solution || 'Solution',
				content: project.solution,
				number: 2,
				color: 'bg-blue-100 text-blue-600'
			});
		}
		if (project.result) {
			sections.push({
				label: data.portfolioPage?.itemLabels?.result || 'Result',
				content: project.result,
				number: 3,
				color: 'bg-green-100 text-green-600'
			});
		}
		return sections;
	});

	// Gallery images for PortfolioContent
	const galleryImages = $derived(
		project?.gallery?.map((img) => ({
			_key: img._key,
			url: img.url,
			alt: `${data.portfolioPage?.itemLabels?.galleryImage || 'Gallery Image'} ${(project.gallery?.indexOf(img) || 0) + 1}`
		})) || []
	);

	// Related projects for RelatedSection
	const relatedProjects = $derived(
		(data.relatedProjects || []).map(
			(p: {
				slug?: { current: string };
				title?: string;
				imageUrl?: string;
				category?: { title?: string; slug?: { current: string }; color?: string };
				publishedAt?: string;
			}) => ({
				slug: p.slug?.current || '',
				title: p.title || '',
				image: p.imageUrl || '',
				category: p.category?.slug?.current || '',
				categoryLabel: p.category?.title || '',
				categoryColor: p.category?.color || '#3b82f6',
				date: p.publishedAt || new Date().toISOString()
			})
		)
	);

	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}
</script>

{#if project}
	<SEO
		title={seoTitle}
		description={seoDescription}
		image={project.imageUrl}
		siteIcon={data.information?.siteIcon?.asset?.url}
		{breadcrumbs}
		jsonLd={[creativeWorkSchema as unknown]}
	/>
{:else}
	<SEO
		title={data.portfolioPage?.itemLabels?.notFound || 'Project Not Found'}
		description={data.portfolioPage?.itemLabels?.notFoundDesc ||
			'The project you are looking for does not exist.'}
		noindex={true}
		siteIcon={data.information?.siteIcon?.asset?.url}
	/>
{/if}

{#if project}
	<DetailHero
		title={project.title || ''}
		description={seoDescription}
		category={project.category?.title || 'Project'}
		imageUrl={project.imageUrl}
		locale={data.locale}
		{breadcrumbs}
		author={{
			name: project.client?.name || 'Confidential',
			iconUrl: project.client?.iconUrl,
			logoUrl: project.client?.logoUrl
		}}
		authorRole="Client"
		tags={project.techStack || []}
	/>

	<PortfolioContent
		sections={contentSections}
		gallery={galleryImages}
		locale={data.locale}
		galleryImageLabel={data.portfolioPage?.itemLabels?.galleryImage || 'Gallery Image'}
	/>

	{#if relatedProjects.length > 0}
		<RelatedSection
			posts={relatedProjects}
			locale={data.locale}
			readArticleLabel={data.portfolioPage?.itemLabels?.viewAllProjects || 'View Project'}
			onresolve={(path) => resolve(path.replace('/blog/', '/portfolio/'))}
		/>
	{/if}

	<BigCTA cta={data.portfolioPage?.cta} locale={data.locale} />
{:else}
	<NotFound
		title={data.portfolioPage?.itemLabels?.notFound || 'Project Not Found'}
		description={data.portfolioPage?.itemLabels?.notFoundDesc ||
			'The project you are looking for does not exist or has been removed.'}
		buttonLabel={data.portfolioPage?.itemLabels?.viewAllProjects || 'View All Projects'}
		href={`/${data.locale}/portfolio`}
	/>
{/if}
