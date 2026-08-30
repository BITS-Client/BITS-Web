<script lang="ts">
	import { Users, Trophy, Star, TrendingUp, Heart, Cpu, Headphones } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import StatsCard from '$lib/components/ui/card/StatsCard.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import ShineHeader from '$lib/components/ui/header/ShineHeader.svelte';
	import FloatingIcon from '$lib/components/ui/misc/FloatingIcon.svelte';

	interface StatItem {
		value: number;
		label: string;
		suffix: string;
		iconIndex: number;
	}

	interface Props {
		locale: 'id' | 'en';
		companyStats: StatItem[];
		statsSection: {
			badge?: string;
			title?: string;
			subtitle?: string;
		};
	}

	let { locale: _locale, companyStats, statsSection }: Props = $props();

	const icons = [Users, Trophy, Star, Heart, Cpu, Headphones];
</script>

<section
	class="stats-section relative py-10 lg:py-16 overflow-hidden"
	aria-labelledby="stats-heading"
>
	<Background gradientTheme="monochrome" />

	<FloatingIcon
		class="absolute top-[25%] left-[15%] hidden lg:block"
		variant="dots"
		color="success"
		duration={4000}
		amplitude={20}
	/>

	<FloatingIcon
		class="absolute top-[25%] right-[12%] hidden lg:block"
		variant="dots"
		color="warning"
		duration={4000}
		amplitude={20}
	/>

	<FloatingIcon
		class="absolute top-[15%] left-[15%] hidden lg:block"
		variant="icon"
		color="success"
		icon={TrendingUp}
		duration={4000}
		amplitude={20}
	/>

	<FloatingIcon
		class="absolute top-[15%] right-[12%] hidden lg:block"
		variant="icon"
		icon={Star}
		color="warning"
		duration={4000}
		amplitude={20}
	/>

	<div class="stats-container relative z-10">
		<ShineHeader
			badge={statsSection?.badge}
			badgeIconLeft={TrendingUp}
			badgeColor="warning"
			title={statsSection?.title}
			subtitle={statsSection?.subtitle}
			animation="scale"
			animationDelay={100}
		/>

		<div class="stats-bento-grid">
			<ScrollReveal animation="scale" delay={200}>
				<StatsCard
					value={companyStats[0]?.value}
					label={companyStats[0]?.label}
					suffix={companyStats[0]?.suffix}
					icon={Users}
					variant={1}
					duration={2000}
				/>
			</ScrollReveal>

			<ScrollReveal animation="scale" delay={250}>
				<StatsCard
					value={companyStats[1]?.value}
					label={companyStats[1]?.label}
					suffix={companyStats[1]?.suffix}
					icon={Trophy}
					variant={2}
					duration={2200}
				/>
			</ScrollReveal>

			<ScrollReveal animation="scale" delay={300}>
				<StatsCard
					value={companyStats[2]?.value}
					label={companyStats[2]?.label}
					suffix={companyStats[2]?.suffix}
					icon={Star}
					variant={3}
					duration={1800}
				/>
			</ScrollReveal>

			<ScrollReveal animation="scale" delay={350}>
				<StatsCard
					value={companyStats[3]?.value}
					label={companyStats[3]?.label}
					suffix={companyStats[3]?.suffix}
					icon={TrendingUp}
					variant={4}
					duration={2500}
				/>
			</ScrollReveal>

			<ScrollReveal animation="scale" delay={400}>
				<StatsCard
					value={companyStats[4]?.value}
					label={companyStats[4]?.label}
					suffix={companyStats[4]?.suffix}
					icon={icons[companyStats[4]?.iconIndex] || Users}
					variant={5}
					duration={2100}
				/>
			</ScrollReveal>

			<ScrollReveal animation="scale" delay={450}>
				<StatsCard
					value={companyStats[5]?.value}
					label={companyStats[5]?.label}
					suffix={companyStats[5]?.suffix}
					icon={icons[companyStats[5]?.iconIndex] || Headphones}
					variant={6}
					duration={1600}
				/>
			</ScrollReveal>
		</div>
	</div>
</section>

<style>
	.stats-section {
		position: relative;
		overflow: hidden;
	}

	.stats-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	@media (min-width: 768px) {
		.stats-container {
			padding: 0 2rem;
		}
	}

	.stats-bento-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.stats-bento-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.25rem;
		}
	}

	@media (min-width: 1024px) {
		.stats-bento-grid {
			grid-template-columns: repeat(6, 1fr);
			gap: 1.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.stats-bento-grid {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
