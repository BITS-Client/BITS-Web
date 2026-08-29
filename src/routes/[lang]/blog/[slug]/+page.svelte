<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { resolvePath } from '$lib/utils';
	import {
		extractHeadingsFromBlocks,
		type TocItem,
		getActiveTocId,
		scrollToHeading
	} from '$lib/utils/toc';
	import { createShareHandlers } from '$lib/utils/share';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import { generateArticleSchema, seoConfig } from '$lib/utils/seo';
	import DetailHero from '$lib/components/ui/hero/DetailHero.svelte';
	import ArticleSection from '$lib/components/ui/section/ArticleSection.svelte';
	import RelatedSection from '$lib/components/ui/section/RelatedSection.svelte';
	import NotFound from '$lib/components/ui/misc/NotFound.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}

	const detailWrittenBy = $derived((data.blogPage as any)?.detail?.writtenBy || 'Written by');
	const detailInThisArticle = $derived(
		(data.blogPage as any)?.detail?.inThisArticle || 'In this article'
	);
	const detailReadArticle = $derived((data.blogPage as any)?.detail?.readArticle || 'Read Article');
	const detailShareArticle = $derived(
		(data.blogPage as any)?.detail?.shareArticle || 'Share Article'
	);
	const detailPostNotFound = $derived(
		(data.blogPage as any)?.detail?.postNotFound || 'Post Not Found'
	);
	const detailPostNotFoundDesc = $derived(
		(data.blogPage as any)?.detail?.postNotFoundDesc ||
			'The article you are looking for does not exist or has been removed.'
	);
	const detailGoHome = $derived((data.blogPage as any)?.detail?.goHome || 'Go Home');

	const post = $derived(
		data.post
			? {
					slug: data.post.slug?.current || '',
					title: data.post.title || '',
					excerpt: data.post.seo?.description || '',
					seoTitle: data.post.seo?.title,
					seoDescription: data.post.seo?.description,
					content: data.post.body || '',
					category: data.post.category?.slug?.current || 'technology',
					categoryLabel: data.post.category?.title || 'Technology',
					categoryColor: data.post.category?.color || '#3b82f6',
					image: data.post.imageUrl || '',
					author: {
						name: data.post.author?.name || 'BITS Team',
						role: data.post.author?.role || 'Author',
						bio: data.post.author?.bio || '',
						avatar: data.post.author?.avatarUrl || ''
					},
					tags: data.post.tags || [],
					date: data.post.publishedAt || new Date().toISOString()
				}
			: null
	);

	const relatedPosts = $derived(
		(data.relatedPosts || []).map((p: any) => ({
			slug: p.slug?.current || '',
			title: p.title || '',
			image: p.imageUrl || '',
			category: p.category?.slug || '',
			categoryLabel: p.category?.title || '',
			categoryColor: p.category?.color || '#3b82f6',
			date: p.publishedAt || new Date().toISOString()
		}))
	);

	const breadcrumbs = $derived.by(() => {
		if (!post) return [];
		const homeLabel =
			data.navigation?.items?.find((item: { href: string }) => item.href === '/')?.label || 'Home';
		const blogLabel = 'Blog';
		return [
			{ name: homeLabel, url: '/' },
			{ name: blogLabel, url: '/blog' },
			{ name: post.title, url: `/blog/${post.slug}` }
		];
	});

	const seoTitle = $derived.by(() => {
		const locale = data.locale;
		const seoTitleData = post?.seoTitle;
		return seoTitleData?.[locale] || seoTitleData?.en || post?.title || 'Blog Post';
	});

	const seoDescription = $derived.by(() => {
		const locale = data.locale;
		const seoDescData = post?.seoDescription;
		return seoDescData?.[locale] || seoDescData?.en || '';
	});

	const articleSchema = $derived(
		post
			? generateArticleSchema({
					headline: seoTitle,
					description: seoDescription,
					authorName: post.author?.name || 'BITS Team',
					datePublished: post.date,
					image: post.image || seoConfig.defaultImage,
					url: `/blog/${post.slug}`,
					publisherLogo: data.information?.siteLogo?.asset?.url
				})
			: null
	);

	const shareHandlers = $derived(createShareHandlers());

	let tableOfContents = $state<TocItem[]>([]);
	let activeTocId = $state('');

	$effect(() => {
		const postContent = post?.content;
		if (postContent) {
			tableOfContents = extractHeadingsFromBlocks(postContent);
		}
	});

	let ticking = false;

	function updateActiveId() {
		if (!ticking) {
			requestAnimationFrame(() => {
				activeTocId = getActiveTocId(tableOfContents);
				ticking = false;
			});
			ticking = true;
		}
	}

	onMount(() => {
		updateActiveId();
		window.addEventListener('scroll', updateActiveId, { passive: true });
		return () => {
			window.removeEventListener('scroll', updateActiveId);
		};
	});

	function handleTocClick(headingId: string) {
		activeTocId = headingId;
		scrollToHeading(headingId);
	}
</script>

{#if post}
	<SEO
		title={seoTitle}
		description={seoDescription}
		image={post.image}
		type="article"
		publishedTime={post.date}
		author={post.author?.name}
		section={post.category}
		tags={post.tags || []}
		siteIcon={data.information?.siteIcon?.asset?.url}
		{breadcrumbs}
		jsonLd={[articleSchema as unknown]}
	/>
{:else}
	<SEO
		title={detailPostNotFound}
		description={detailPostNotFoundDesc}
		noindex={true}
		siteIcon={data.information?.siteIcon?.asset?.url}
	/>
{/if}

{#if post}
	<DetailHero
		title={post.title}
		description={post.excerpt}
		category={post.categoryLabel}
		imageUrl={post.image}
		locale={data.locale}
		{breadcrumbs}
		author={{ name: post.author.name, iconUrl: post.author.avatar }}
		authorRole={post.author.role}
		tags={post.tags}
	/>

	<article class="article-section">
		<div class="container-base">
			{#if shareHandlers}
				<ArticleSection
					copied={shareHandlers.copied}
					oncopy={shareHandlers.handleCopyLink}
					onshareTwitter={shareHandlers.handleShareTwitter}
					onshareLinkedIn={shareHandlers.handleShareLinkedIn}
					onshareFacebook={shareHandlers.handleShareFacebook}
					onshareWhatsApp={shareHandlers.handleShareWhatsApp}
					onshareTelegram={shareHandlers.handleShareTelegram}
					onshareThreads={shareHandlers.handleShareThreads}
					onshareEmail={shareHandlers.handleShareEmail}
					shareTitle={detailShareArticle}
					content={post.content}
					tags={post.tags}
					author={post.author}
					writtenByLabel={detailWrittenBy}
					{tableOfContents}
					{activeTocId}
					onTocClick={handleTocClick}
					inThisArticleLabel={detailInThisArticle}
				/>
			{/if}
		</div>
	</article>

	{#if relatedPosts.length > 0}
		<RelatedSection
			posts={relatedPosts}
			locale={data.locale}
			readArticleLabel={detailReadArticle}
			onresolve={resolve}
		/>
	{/if}
{:else}
	<NotFound
		title={detailPostNotFound}
		description={detailPostNotFoundDesc}
		buttonLabel={detailGoHome}
		href={resolve('/')}
	/>
{/if}
