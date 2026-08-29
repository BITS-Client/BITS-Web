<script lang="ts">
	import { Sparkles, Zap, Shield } from '$lib/icons/lucide';
	import type { Component } from 'svelte';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import PageHero from '$lib/components/ui/hero/PageHero.svelte';
	import WaveHeader from '$lib/components/ui/header/WaveHeader.svelte';
	import ServiceCard from '$lib/components/ui/card/ServiceCard.svelte';
	import ProcessCard from '$lib/components/ui/card/ProcessCard.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import BigCTA from '$lib/components/ui/cta/BigCTA.svelte';
	import BenefitsContent from '$lib/components/ui/content/BenefitsContent.svelte';
	import NotFound from '$lib/components/ui/misc/NotFound.svelte';
	import { generateServiceSchema } from '$lib/utils/seo';

	interface BreadcrumbItem {
		name: string;
		url: string;
	}

	interface HeroStat {
		_key: string;
		value: string;
		label: string;
	}

	interface CustomButtonProps {
		label: string;
		href: string;
		isPrimary?: boolean;
		isSecondary?: boolean;
		onclick?: () => void;
	}

	let { data } = $props();

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	const breadcrumbs = $derived.by((): BreadcrumbItem[] => {
		const homeItem = data.navigation?.items?.find((item: { href: string }) => item.href === '/');
		const servicesItem = data.navigation?.items?.find(
			(i: { href: string }) => i.href === '/services'
		);
		const homeLabel = homeItem?.label || 'Home';
		const servicesLabel = data.servicesPage?.seo?.title || servicesItem?.label || 'Services';
		const currentTitle = data.service?.title || 'Service';
		const currentSlug = data.service?.slug?.current || '';
		return [
			{ name: homeLabel, url: '/' },
			{ name: servicesLabel, url: '/services' },
			{ name: currentTitle, url: `/services/${currentSlug}` }
		];
	});

	const serviceSchema = $derived(
		data.service
			? generateServiceSchema(
					data.service.title || '',
					data.service.seo?.description || '',
					'Professional Service',
					`/services/${data.service.slug?.current || ''}`
				)
			: null
	);

	const heroStats = $derived.by((): HeroStat[] => {
		const stats = data.servicesPage?.serviceDetail?.hero?.stats;
		if (stats && stats.length > 0) {
			return stats.map((stat: { _key?: string; value?: string; label?: string }) => ({
				_key: stat._key || Math.random().toString(),
				value: stat.value || '0',
				label: stat.label || ''
			}));
		}
		return [
			{ _key: '1', value: '500+', label: 'Projects' },
			{ _key: '2', value: '98%', label: 'Satisfaction' },
			{ _key: '3', value: '24/7', label: 'Support' }
		];
	});

	const customButtons = $derived.by((): CustomButtonProps[] => {
		const btnCta = data.servicesPage?.serviceDetail?.hero?.buttonCta;
		if (btnCta) {
			return [
				{
					label: btnCta,
					href: '#sub-services',
					isPrimary: true,
					onclick: () => scrollToSection('sub-services')
				}
			];
		}
		return [];
	});

	const processSteps = $derived(
		(data.servicesPage?.processSection?.processItems || []).map(
			(
				item: {
					_key?: string;
					icon?: string;
					title?: string;
					subtitle?: string;
				},
				index: number
			) => {
				const stepNum = index + 1;
				const stepStr = stepNum < 10 ? `0${stepNum}` : String(stepNum);
				return {
					step: stepStr,
					title: item.title || '',
					description: item.subtitle || '',
					icon: item.icon || ''
				};
			}
		)
	);

	const subServices = $derived(
		(data.service?.subServices || []).map(
			(
				service: {
					title?: string;
					description?: string;
					icon?: string;
				},
				index: number
			) => {
				const iconColors = [
					'from-pink-500 to-rose-600',
					'from-blue-500 to-cyan-500',
					'from-emerald-500 to-teal-500',
					'from-violet-500 to-purple-500',
					'from-teal-500 to-cyan-500',
					'from-rose-500 to-pink-500'
				];
				return {
					id: service.title || `service-${index}`,
					title: service.title || '',
					description: service.description || '',
					icon: service.icon || 'sparkles',
					href: '#',
					color: iconColors[index % iconColors.length]
				};
			}
		)
	);

	const seoTitle = $derived.by(() => {
		const locale = data.locale;
		const seoTitleData = data.service?.seo?.title;
		if (seoTitleData) {
			return seoTitleData[locale] || seoTitleData.en || '';
		}
		const navServices = data.navigation?.items?.find(
			(i: { href: string }) => i.href === '/services'
		);
		return `${data.service?.title || ''} - ${navServices?.label || 'Services'}`;
	});
</script>

<SEO
	title={seoTitle}
	description={data.service?.seo?.description}
	url={`/services/${data.service?.slug?.current || ''}`}
	{breadcrumbs}
	jsonLd={[serviceSchema as unknown]}
/>

{#if data.service}
	<div class="service-page">
		<!-- Hero Section -->
		<PageHero
			badge={data.servicesPage?.servicesSection?.badge ||
				data.servicesPage?.serviceDetail?.hero?.badge ||
				''}
			title={data.service?.title || ''}
			subtitle={data.service?.seo?.description || data.service?.longDescription || ''}
			{breadcrumbs}
			locale={data.locale}
			stats={heroStats}
			icon={Sparkles as unknown as Component}
			{customButtons}
		/>

		<!-- Sub Services Section -->
		{#if data.service?.subServices?.length > 0}
			<section id="sub-services" class="py-10 lg:py-16 bg-white">
				<div class="container-base">
					<WaveHeader
						badge={data.servicesPage?.serviceDetail?.subService?.badge || ''}
						badgeIcon={Sparkles}
						title={data.servicesPage?.serviceDetail?.subService?.title || ''}
						subtitle={data.servicesPage?.serviceDetail?.subService?.subtitle || ''}
						headingId="sub-services-heading"
					/>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{#each subServices as service, index (service.id)}
							<ServiceCard {service} {index} locale={data.locale} />
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- Benefits Section -->
		<section id="benefits" class="py-10 lg:py-16 relative overflow-hidden">
			<Background gradientTheme="ocean" />

			<div class="container-base relative z-10">
				<WaveHeader
					badge={data.servicesPage?.serviceDetail?.benefits?.badge || ''}
					badgeIcon={Shield}
					title={data.servicesPage?.serviceDetail?.benefits?.title || ''}
					subtitle={data.servicesPage?.serviceDetail?.benefits?.subtitle || ''}
					headingId="benefits-heading"
				/>

				<BenefitsContent
					benefits={data.service.benefits || []}
					stats={data.servicesPage?.serviceDetail?.benefits?.stats || []}
				/>
			</div>
		</section>

		<!-- Process Section -->
		<section id="process" class="py-10 lg:py-16 relative overflow-hidden">
			<Background gradientTheme="teal" />

			<div class="container-base relative z-10">
				<WaveHeader
					badge={data.servicesPage?.processSection?.badge || ''}
					badgeIcon={Zap}
					title={data.servicesPage?.processSection?.title || ''}
					subtitle={data.servicesPage?.processSection?.subtitle || ''}
					headingId="process-heading"
				/>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{#each processSteps as step (step.step)}
						<ProcessCard
							step={step.step}
							title={step.title}
							description={step.description}
							icon={step.icon}
						/>
					{/each}
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<BigCTA
			locale={data.locale}
			cta={{
				badge: data.servicesPage?.serviceDetail?.cta?.badge || '',
				heading: data.servicesPage?.serviceDetail?.cta?.title || 'Ready to Get Started?',
				text: data.servicesPage?.serviceDetail?.cta?.subtitle || '',
				getStarted: data.servicesPage?.serviceDetail?.cta?.btnCta || 'Contact Us',
				getStartedLink: data.servicesPage?.serviceDetail?.cta?.linkCta || '/contact',
				exploreServices: undefined,
				exploreLink: undefined
			}}
		/>
	</div>
{/if}

{#if !data.service}
	<NotFound
		title="Service Not Found"
		description="The service you are looking for does not exist or has been removed."
		buttonLabel="View All Services"
		href={`/${data.locale}/services`}
	/>
{/if}

<style>
	.service-page {
		min-height: 100vh;
		background: #fafafa;
		color: #1a1a1a;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		overflow-x: hidden;
	}

	:global(:root.dark) .service-page {
		background: #0a0a0a;
		color: #ffffff;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
