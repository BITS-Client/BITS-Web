<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { Trophy, Sparkles } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import ShineHeader from '$lib/components/ui/header/ShineHeader.svelte';
	import MoreCTA from '$lib/components/ui/cta/MoreCTA.svelte';
	import FloatingIcon from '$lib/components/ui/misc/FloatingIcon.svelte';
	import GeneralCard from '$lib/components/ui/card/GeneralCard.svelte';

	interface PortfolioItem {
		id: number;
		title: string;
		category: string;
		description: string;
		image: string;
		color: string;
		tech: string[];
		year: string;
		client: string;
		clientIcon: string;
		href: string;
	}

	interface Props {
		locale: 'id' | 'en';
		portfolioItems: PortfolioItem[];
		portfolioSection: {
			badge?: string;
			title?: string;
			subtitle?: string;
			viewAllProject?: string;
			viewAllProjectLink?: string;
		};
	}

	let { locale, portfolioItems, portfolioSection }: Props = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}

	function mapToProject(item: PortfolioItem, _index: number) {
		return {
			slug: item.href.split('/').pop() || '',
			title: item.title,
			client: item.client,
			clientIcon: item.clientIcon,
			description: item.description,
			image: item.image,
			category: item.category ? item.category.toLowerCase() : '',
			techStack: item.tech,
			featured: false,
			year: item.year
		};
	}
</script>

<section
	class="portfolio-section relative py-10 lg:py-16 overflow-hidden"
	aria-labelledby="portfolio-heading"
>
	<Background gradientTheme="coral" />

	<FloatingIcon
		class="absolute top-20 left-[8%] hidden lg:block"
		icon={Trophy}
		variant="icon"
		duration={5000}
		amplitude={20}
	/>

	<FloatingIcon
		class="absolute top-20 right-[8%] hidden lg:block"
		icon={Sparkles}
		variant="icon"
		color="purple"
		duration={5000}
		amplitude={20}
	/>

	<div class="portfolio-container relative z-10">
		<ShineHeader
			badge={portfolioSection?.badge}
			badgeIconLeft={Trophy}
			badgeIconRight={Sparkles}
			badgeColor="success"
			title={portfolioSection?.title}
			subtitle={portfolioSection?.subtitle}
		/>

		<div class="portfolio-grid">
			{#if portfolioItems.length === 0}
				<div class="text-center py-10 text-gray-500">
					<p>No projects found.</p>
				</div>
			{/if}
			{#each portfolioItems as item, index (`portfolio-${index}-${item.id}`)}
				<ScrollReveal animation="scale" delay={200 + index * 50}>
					<GeneralCard
						project={mapToProject(item, index)}
						categoryLabel={item.category}
						{index}
						{locale}
						color={item.color}
						type="portfolio"
					/>
				</ScrollReveal>
			{/each}
		</div>

		<MoreCTA
			linkText={portfolioSection?.viewAllProject}
			href={resolve(portfolioSection?.viewAllProjectLink || '/portfolio')}
		/>
	</div>
</section>

<style>
	.portfolio-section {
		position: relative;
		overflow: hidden;
	}

	.portfolio-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.portfolio-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.portfolio-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.portfolio-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 1.25rem;
		}
	}
</style>
