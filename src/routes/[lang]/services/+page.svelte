<script lang="ts">
	import { onMount } from 'svelte';
	import { resolvePath } from '$lib/utils';

	let { data } = $props();

	// Resolve path with locale prefix
	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}

	import { Sparkles, Rocket, HeartHandshake } from '$lib/icons/lucide';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import PageHero from '$lib/components/ui/hero/PageHero.svelte';
	import WaveHeader from '$lib/components/ui/header/WaveHeader.svelte';
	import ServiceCard from '$lib/components/ui/card/ServiceCard.svelte';
	import ProcessCard from '$lib/components/ui/card/ProcessCard.svelte';
	import WhyCard from '$lib/components/ui/card/WhyCard.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import BigCTA from '$lib/components/ui/cta/BigCTA.svelte';
	import { generateWebPageSchema } from '$lib/utils/seo';

	// Helper to extract localized text
	function getLocalizedText(
		obj: Record<string, string> | string | undefined,
		locale: string
	): string {
		if (!obj) return '';
		if (typeof obj === 'string') return obj;
		return obj[locale] || obj['id'] || Object.values(obj)[0] || '';
	}

	// Process steps from Sanity
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

	// Why Us reasons from Sanity
	const whyUsReasons = $derived(
		(data.servicesPage?.whySection?.whyItems || []).map(
			(item: {
				_key?: string;
				icon?: string;
				title?: Record<string, string>;
				subtitle?: Record<string, string>;
			}) => ({
				icon: item.icon || '',
				title: getLocalizedText(item.title, data.locale),
				description: getLocalizedText(item.subtitle, data.locale)
			})
		)
	);

	// Animation states
	let servicesVisible = $state(true);
	let prefersReducedMotion = $state(false);

	// Transform Sanity services data to component format
	const services = $derived(
		(data.services || []).map(
			(
				service: {
					_id: string;
					slug?: string;
					title?: string;
					description?: string;
					icon?: string;
					seo?: { description?: Record<string, string> };
					features?: Array<{ title?: string }>;
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
					id: service.slug || service._id,
					title: service.title || '',
					description: service.seo?.description || '',
					icon: service.icon || 'sparkles',
					href: resolve(`/services/${service.slug || ''}`),
					color: iconColors[index % iconColors.length]
				};
			}
		)
	);

	// Intersection Observer for scroll animations
	onMount(() => {
		// Check for reduced motion preference
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			servicesVisible = true;
			return;
		}

		// Set servicesVisible to true after a short delay as fallback
		setTimeout(() => {
			if (!servicesVisible) {
				servicesVisible = true;
			}
		}, 1000);

		// Animate hero elements after a delay
		setTimeout(() => {
			// Animation trigger
		}, 100);

		// Animate services section when it comes into view
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					if (id === 'services-section') {
						servicesVisible = true;
						// Stagger animation for service cards
						setTimeout(() => {
							// Trigger animation for each service card
						}, 200);
					}
				}
			});
		}, observerOptions);

		// Observe sections
		const sections = [
			'services-section',
			'stats-section',
			'process-section',
			'why-us-section',
			'cta-section'
		];

		sections.forEach((id) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});

	// SEO data from Sanity with fallbacks - reactive to data changes
	const pageTitle = $derived(data.servicesPage?.seo?.title || 'Our Services');

	const pageDescription = $derived(
		data.servicesPage?.seo?.description ||
			'Explore Banten IT Solutions comprehensive digital services including web design, custom software development, ERP systems, AI & automation, IT infrastructure, and creative services.'
	);

	const breadcrumbs = $derived.by(() => {
		const homeLabel =
			data.navigation?.items?.find((item: { href: string }) => item.href === '/')?.label || 'Home';
		// SEO title dari query sudah di-flatten ke string langsung sesuai locale
		const title = data.servicesPage?.seo?.title || 'Our Services';
		return [
			{ name: homeLabel, url: '/' },
			{ name: title, url: '/services' }
		];
	});

	const heroCtaText1 = $derived.by(() => {
		const locale = data.locale;
		const ctaData = data.servicesPage?.hero?.ctaText1;
		return ctaData?.[locale] || ctaData || 'Dapatkan Konsultasi Gratis';
	});

	const heroCtaText2 = $derived.by(() => {
		const locale = data.locale;
		const ctaData = data.servicesPage?.hero?.ctaText2;
		return ctaData?.[locale] || ctaData || 'Jelajahi Layanan';
	});

	const webPageSchema = $derived(generateWebPageSchema(pageTitle, pageDescription, '/services'));

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<SEO
	title={pageTitle}
	description={pageDescription}
	image={data.information?.siteLogo?.asset?.url}
	imageAlt={data.information?.siteLogo?.alt || pageTitle}
	siteIcon={data.information?.siteIcon?.asset?.url}
	locale={data.locale}
	alternates={data.alternateLocales}
	{breadcrumbs}
	jsonLd={[webPageSchema as unknown]}
/>

<!-- HERO SECTION -->
<PageHero
	badge={data.servicesPage?.hero?.badge}
	title={data.servicesPage?.hero?.title}
	subtitle={data.servicesPage?.hero?.subtitle}
	locale={data.locale}
	{breadcrumbs}
	customButtons={[
		{
			label: heroCtaText1,
			href: resolve(data.servicesPage?.hero?.ctaLink1) || resolve('/contact'),
			isPrimary: true
		},
		{
			label: heroCtaText2,
			href: '#services-section',
			isSecondary: true,
			onclick: () => scrollToSection('services-section')
		}
	]}
/>

<!-- SERVICES GRID SECTION -->
<section id="services-section" class="py-10 lg:py-16 bg-white">
	<div class="container-base">
		<WaveHeader
			badge={data.servicesPage?.servicesSection?.badge}
			badgeIcon={Sparkles}
			title={data.servicesPage?.servicesSection?.title}
			subtitle={data.servicesPage?.servicesSection?.subtitle}
			headingId="services-heading"
		/>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service, index (service.id)}
				<ServiceCard {service} {index} locale={data.locale} />
			{/each}
		</div>
	</div>
</section>

<!-- ============================================
	      PROCESS SECTION
	      ============================================ -->
<section id="process-section" class="py-10 lg:py-16 relative overflow-hidden">
	<Background gradientTheme="teal" />

	<div class="container-base relative z-10">
		<WaveHeader
			badge={data.servicesPage?.processSection?.badge}
			badgeIcon={Rocket}
			title={data.servicesPage?.processSection?.title}
			subtitle={data.servicesPage?.processSection?.subtitle}
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

<!-- ============================================
	      WHY CHOOSE US SECTION
	      ============================================ -->
<section id="why-us-section" class="py-10 lg:py-16 relative overflow-hidden">
	<Background gradientTheme="ocean" />

	<div class="container-base relative z-10">
		<WaveHeader
			badge={data.servicesPage?.whySection?.badge}
			badgeIcon={HeartHandshake}
			title={data.servicesPage?.whySection?.title}
			subtitle={data.servicesPage?.whySection?.subtitle}
			headingId="why-us-heading"
		/>

		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
			{#each whyUsReasons as reason (reason.title)}
				<WhyCard icon={reason.icon} title={reason.title} description={reason.description} />
			{/each}
		</div>
	</div>
</section>

<!-- ============================================
	      CTA SECTION
	      ============================================ -->
<BigCTA
	locale={data.locale}
	cta={{
		badge: data.servicesPage?.ctaSection?.badge || '',
		heading: data.servicesPage?.ctaSection?.title || '',
		text: data.servicesPage?.ctaSection?.subtitle || '',
		getStarted: data.servicesPage?.ctaSection?.ctaText1 || '',
		getStartedLink: data.servicesPage?.ctaSection?.ctaLink1 || '/contact',
		exploreServices: data.servicesPage?.ctaSection?.ctaText2 || '',
		exploreLink: data.servicesPage?.ctaSection?.ctaLink2 || '/portfolio'
	}}
/>
