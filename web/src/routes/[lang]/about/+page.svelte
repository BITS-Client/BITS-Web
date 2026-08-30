<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { Star, Award, Users, Zap, CheckCircle, Globe, Sparkles } from '$lib/icons/lucide';
	import { getIconComponent } from '$lib/icons';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import AboutHero from '$lib/components/ui/hero/AboutHero.svelte';
	import VisionSection from '$lib/components/ui/section/VisionSection.svelte';
	import TimelineSection from '$lib/components/ui/section/TimelineSection.svelte';
	import ValueSection from '$lib/components/ui/section/ValueSection.svelte';
	import TeamSection from '$lib/components/ui/section/TeamSection.svelte';
	import { generateOrganizationSchema, generateWebPageSchema } from '$lib/utils/seo';
	import { onMount } from 'svelte';
	import { urlFor } from '$lib/sanity/client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Resolve path with locale prefix
	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}

	// Timeline from Sanity data
	const timeline = $derived(
		(data.aboutPage?.timeline?.stories || []).map(
			(item: { _key: string; icon: string; year: string; title: string; description: string }) => {
				const iconMap: Record<string, typeof Star> = {
					Star,
					Award,
					Users,
					Zap,
					CheckCircle,
					Globe
				};
				return {
					year: item.year,
					title: item.title,
					description: item.description,
					icon: iconMap[item.icon] || Star
				};
			}
		)
	);

	// Principles from Sanity data
	const principles = $derived(
		(data.aboutPage?.principles?.keys || []).map(
			(item: { _key: string; icon: string; title: string; description: string }, index: number) => {
				const colors = [
					'from-rose-500 to-pink-500',
					'from-amber-500 to-orange-500',
					'from-cyan-500 to-blue-500',
					'from-emerald-500 to-green-500'
				];
				return {
					icon: getIconComponent(item.icon) || Sparkles,
					title: item.title,
					description: item.description,
					color: colors[index] || 'from-gray-500 to-gray-600'
				};
			}
		)
	);

	// Team members from Sanity data
	const teamMembers = $derived(
		(data.teamMembers || []).map(
			(member: {
				name: string;
				role: string;
				bio: string;
				image?: unknown;
				social?: { instagram?: string; github?: string; youtube?: string };
			}) => ({
				name: member.name,
				role: member.role,
				bio: member.bio,
				image: member.image ? urlFor(member.image).width(400).height(400).url() : '',
				initials: (member.name || '?')
					.split(' ')
					.map((n: string) => n[0])
					.join('')
					.slice(0, 2),
				social: member.social
			})
		)
	);

	// IntersectionObserver for scroll animations
	let reducedMotion = $state(false);

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reducedMotion) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		// Function to observe all scroll-animate elements
		const observeElements = () => {
			if (reducedMotion) return;

			// Disconnect existing observer first
			observer.disconnect();

			// Use setTimeout to ensure DOM is rendered before observing
			setTimeout(() => {
				document.querySelectorAll('.scroll-animate').forEach((el) => {
					observer.observe(el);
				});
			}, 0);
		};

		// Initially observe elements
		observeElements();

		// Update animations when principles change (like language switch)
		$effect(() => {
			// This will run when principles change
			const _ = principles; // Reference principles to make this effect reactive to principles changes

			if (!reducedMotion) {
				// Use microtask to ensure DOM is updated before setting up animations
				queueMicrotask(() => {
					observeElements();
				});
			}
		});

		return () => {
			observer.disconnect();
		};
	});

	// SEO data from Sanity with fallbacks - reactive to data changes
	const pageTitle = $derived.by(() => {
		return data.aboutPage?.seo?.title || 'About Us';
	});

	const pageDescription = $derived.by(() => {
		return data.aboutPage?.seo?.description || '';
	});

	const breadcrumbs = $derived.by(() => {
		const homeLabel =
			data.navigation?.items?.find((item: { href: string }) => item.href === '/')?.label || 'Home';
		// SEO title dari query sudah di-flatten ke string langsung sesuai locale
		const title = data.aboutPage?.seo?.title || 'About Us';
		return [
			{ name: homeLabel, url: '/' },
			{ name: title, url: '/about' }
		];
	});

	const organizationSchema = $derived(
		generateOrganizationSchema({
			logo: data.information?.siteLogo?.asset?.url
		})
	);
	const webPageSchema = $derived(generateWebPageSchema(pageTitle, pageDescription, '/about'));
</script>

<SEO
	title={pageTitle}
	description={pageDescription}
	image={data.information?.siteLogo?.asset?.url}
	imageAlt={data.information?.siteLogo?.alt || pageTitle}
	siteIcon={data.information?.siteIcon?.asset?.url}
	locale={data.locale}
	{breadcrumbs}
	jsonLd={[organizationSchema as unknown, webPageSchema as unknown]}
/>

<!-- Cinematic Hero Section -->
<AboutHero
	badge={data.aboutPage?.hero?.badge}
	title={data.aboutPage?.hero?.title}
	subtitle={data.aboutPage?.hero?.subtitle}
	contactLabel={data.aboutPage?.hero?.contact}
	portfolioLabel={data.aboutPage?.hero?.portfolio}
	contactUrl={resolve('/contact')}
	portfolioUrl={resolve('/portfolio')}
	experienceLabel={data.aboutPage?.hero?.experience}
	experienceValue={data.aboutPage?.hero?.experienceValue}
	clientLabel={data.aboutPage?.hero?.client}
	clientValue={data.aboutPage?.hero?.clientValue}
	projectLabel={data.aboutPage?.hero?.project}
	projectValue={data.aboutPage?.hero?.projectValue}
	{breadcrumbs}
	locale={data.locale}
/>

<!-- Mission & Vision Section -->
<VisionSection
	badge={data.aboutPage?.vision?.badge}
	title={data.aboutPage?.vision?.title}
	subtitle={data.aboutPage?.vision?.subtitle}
	visionTitle={data.aboutPage?.vision?.visionTitle}
	visionDesc={data.aboutPage?.vision?.visionDesc}
	missionTitle={data.aboutPage?.vision?.missionTitle}
	missionDesc={data.aboutPage?.vision?.missionDesc}
/>

<!-- Timeline Section - Ultimate Cinematic Redesign -->
<TimelineSection
	badge={data.aboutPage?.timeline?.badge}
	title={data.aboutPage?.timeline?.title}
	subtitle={data.aboutPage?.timeline?.subtitle}
	end={data.aboutPage?.timeline?.end}
	{timeline}
/>

<!-- Core Principles Section - Redesigned with Full Animation -->
<ValueSection
	badge={data.aboutPage?.principles?.badge}
	title={data.aboutPage?.principles?.title}
	subtitle={data.aboutPage?.principles?.subtitle}
	ready={data.aboutPage?.principles?.ready}
	readySubtitle={data.aboutPage?.principles?.readySubtitle}
	connect={data.aboutPage?.principles?.connect}
	contactUrl={resolve('/contact')}
	{principles}
/>

<!-- Team Section -->
<TeamSection
	badge={data.aboutPage?.teams?.badge}
	title={data.aboutPage?.teams?.title}
	subtitle={data.aboutPage?.teams?.subtitle}
	{teamMembers}
	cta={{
		title: data.aboutPage?.teams?.ctaTitle,
		subtitle: data.aboutPage?.teams?.ctaSubtitle,
		button: data.aboutPage?.teams?.ctaButton,
		icon: data.aboutPage?.teams?.ctaIcon,
		contactUrl: resolve('/contact')
	}}
/>

<style>
</style>
