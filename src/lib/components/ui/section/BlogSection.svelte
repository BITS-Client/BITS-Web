<script lang="ts">
	import { FileText, Sparkles } from '$lib/icons/lucide';
	import { resolvePath } from '$lib/utils';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import ShineHeader from '$lib/components/ui/header/ShineHeader.svelte';
	import MoreCTA from '$lib/components/ui/cta/MoreCTA.svelte';
	import FloatingIcon from '$lib/components/ui/misc/FloatingIcon.svelte';
	import GeneralCard from '$lib/components/ui/card/GeneralCard.svelte';

	interface Post {
		_id: string;
		title: string;
		slug?: { current: string };
		seo?: { description?: string };
		publishedAt?: string;
		author?: { name: string; image?: string; avatarUrl?: string };
		category?: {
			title?: string | { [key: string]: string };
			slug?: { current: string };
			color?: string;
		};
		tags?: string[];
		imageUrl?: string;
	}

	interface Props {
		locale: 'id' | 'en';
		posts: Post[];
		blogSection: {
			badge?: string;
			title?: string;
			subtitle?: string;
			viewAllPosts?: string;
			viewAllPostsLink?: string;
		};
	}

	let { locale, posts, blogSection }: Props = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}

	function mapPostToProject(post: Post, _index: number) {
		return {
			slug: post.slug?.current || '',
			title: post.title || '',
			client: post.author?.name || 'BITS',
			clientIcon: post.author?.avatarUrl || '',
			description: post.seo?.description || '',
			image: post.imageUrl || '',
			category: post.category?.slug?.current || 'blog',
			techStack: post.tags || [],
			featured: false,
			year: post.publishedAt ? new Date(post.publishedAt).getFullYear().toString() : ''
		};
	}
</script>

<section
	class="blog-section relative py-10 lg:py-16 overflow-hidden"
	aria-labelledby="blog-heading"
>
	<Background gradientTheme="violet" />

	<FloatingIcon
		class="absolute top-24 left-[5%] hidden lg:block"
		icon={FileText}
		variant="icon"
		duration={4500}
		amplitude={25}
	/>

	<FloatingIcon
		class="absolute top-32 right-[8%] hidden lg:block"
		icon={Sparkles}
		variant="icon"
		color="warning"
		duration={5000}
		amplitude={20}
	/>

	<div class="blog-container relative z-10">
		<ShineHeader
			badge={blogSection?.badge}
			badgeIconLeft={FileText}
			badgeIconRight={Sparkles}
			badgeColor="warning"
			title={blogSection?.title}
			subtitle={blogSection?.subtitle}
		/>

		<div class="blog-grid">
			{#each posts as post, index (post._id)}
				<ScrollReveal animation="scale" delay={200 + index * 50}>
					<GeneralCard
						project={mapPostToProject(post, index)}
						categoryLabel={post.category && post.category.title
							? (typeof post.category.title === 'object'
									? post.category.title[locale]
									: post.category.title) || 'Blog'
							: 'Blog'}
						{index}
						{locale}
						color="from-blue-500 to-purple-500"
						type="blog"
					/>
				</ScrollReveal>
			{/each}
		</div>

		<MoreCTA
			linkText={blogSection?.viewAllPosts}
			href={resolve(blogSection?.viewAllPostsLink || '/blog')}
		/>
	</div>
</section>

<style>
	.blog-section {
		position: relative;
		overflow: hidden;
	}

	.blog-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.blog-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.blog-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.blog-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.5rem;
		}
	}
</style>
