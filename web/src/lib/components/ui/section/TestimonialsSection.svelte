<script lang="ts">
	import { MessageSquareQuote, Star, Quote, Sparkles } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import ShineHeader from '$lib/components/ui/header/ShineHeader.svelte';
	import FloatingIcon from '$lib/components/ui/misc/FloatingIcon.svelte';
	import TestimonialCard from '$lib/components/ui/card/TestimonialCard.svelte';

	interface TestimonialItem {
		id: number;
		name: string;
		content: string;
		projectTitle: string;
		projectSlug: string;
		clientIcon?: string;
	}

	interface Props {
		locale: 'id' | 'en';
		testimonials: TestimonialItem[];
		testimonialsSection: {
			badge?: string;
			title?: string;
			subtitle?: string;
		};
	}

	let { locale, testimonials, testimonialsSection }: Props = $props();
</script>

<section
	class="testimonials-section relative py-10 lg:py-16 overflow-hidden"
	aria-labelledby="testimonials-heading"
>
	<Background gradientTheme="ocean" />

	<FloatingIcon
		class="absolute top-[15%] left-[8%] hidden lg:block"
		icon={Quote}
		variant="icon"
		duration={4500}
		amplitude={20}
	/>

	<FloatingIcon
		class="absolute top-[25%] right-[15%] hidden lg:block"
		icon={Star}
		variant="icon"
		color="warning"
		duration={5000}
		amplitude={25}
	/>

	<FloatingIcon
		class="absolute bottom-[30%] left-[10%] hidden lg:block"
		variant="dots"
		duration={4500}
		amplitude={18}
	/>

	<FloatingIcon
		class="absolute top-[60%] right-[8%] hidden lg:block"
		variant="dots"
		color="success"
		duration={5500}
		amplitude={22}
	/>

	<FloatingIcon
		class="absolute bottom-[20%] right-[20%] hidden lg:block"
		icon={Sparkles}
		variant="icon"
		color="primary"
		duration={4800}
		amplitude={20}
	/>

	<div class="testimonials-container relative z-10">
		<ShineHeader
			badge={testimonialsSection?.badge}
			badgeIconLeft={MessageSquareQuote}
			badgeIconRight={Sparkles}
			badgeColor="secondary"
			title={testimonialsSection?.title}
			subtitle={testimonialsSection?.subtitle}
			animation="fade"
			animationDelay={100}
		/>

		{#if testimonials.length > 0}
			<div class="testimonials-grid">
				{#each testimonials as testimonial, index (testimonial.id)}
					<ScrollReveal animation="scale" delay={150 + testimonial.id * 50}>
						<TestimonialCard {testimonial} {locale} _index={index} />
					</ScrollReveal>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.testimonials-section {
		position: relative;
		overflow: hidden;
	}

	.testimonials-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	@media (min-width: 768px) {
		.testimonials-container {
			padding: 0 2rem;
		}
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.25rem;
	}

	@media (min-width: 640px) {
		.testimonials-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.testimonials-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.testimonials-grid {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
