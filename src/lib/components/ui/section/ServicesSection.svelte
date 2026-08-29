<script lang="ts">
	import { Wallpaper, Sparkles } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import ServiceCard from '$lib/components/ui/card/ServiceCard.svelte';
	import ShineHeader from '$lib/components/ui/header/ShineHeader.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import FloatingIcon from '$lib/components/ui/misc/FloatingIcon.svelte';

	interface ServiceItem {
		id: string;
		title: string;
		description: string;
		icon: string;
		href: string;
		color: string;
	}

	interface Props {
		locale: 'id' | 'en';
		services: ServiceItem[];
		servicesSection: {
			badge?: string;
			title?: string;
			subtitle?: string;
		};
	}

	let { locale, services, servicesSection }: Props = $props();
</script>

<section
	id="services-section"
	class="services-section relative py-10 lg:py-16 overflow-hidden"
	aria-labelledby="services-heading"
>
	<Background gradientTheme="teal" />

	<FloatingIcon
		class="absolute top-20 left-[8%] hidden lg:block"
		icon={Wallpaper}
		variant="icon"
		duration={5000}
		amplitude={20}
	/>

	<FloatingIcon
		class="absolute top-20 right-[8%] hidden lg:block"
		icon={Sparkles}
		variant="icon"
		color="success"
		duration={5000}
		amplitude={20}
	/>

	<div class="services-container relative z-10">
		<ShineHeader
			badge={servicesSection?.badge}
			badgeIconLeft={Wallpaper}
			badgeIconRight={Sparkles}
			badgeColor="primary"
			title={servicesSection?.title}
			subtitle={servicesSection?.subtitle}
		/>

		<div class="services-grid">
			{#each services as service, index (`service-${index}-${service.id}`)}
				<ScrollReveal animation="scale" delay={200 + index * 80}>
					<ServiceCard {service} {index} {locale} />
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.services-section {
		position: relative;
		overflow: hidden;
	}

	.services-container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.services-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.services-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.services-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.25rem;
		}
	}
</style>
