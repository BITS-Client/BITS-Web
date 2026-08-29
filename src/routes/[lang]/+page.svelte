<script lang="ts">
	import { page } from '$app/stores';
	import { resolvePath } from '$lib/utils';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import HomeHero from '$lib/components/ui/hero/HomeHero.svelte';
	import ServicesSection from '$lib/components/ui/section/ServicesSection.svelte';
	import PortfolioSection from '$lib/components/ui/section/PortfolioSection.svelte';
	import BlogSection from '$lib/components/ui/section/BlogSection.svelte';
	import TestimonialsSection from '$lib/components/ui/section/TestimonialsSection.svelte';
	import StatsSection from '$lib/components/ui/section/StatsSection.svelte';
	import { generateOrganizationSchema, generateWebPageSchema } from '$lib/utils/seo';

	let { data } = $props();

	// Function to resolve paths with locale
	function resolve(path: string): string {
		return resolvePath(path, data.locale);
	}

	// Generate JSON-LD schemas
	const organizationSchema = $derived(
		generateOrganizationSchema({
			logo: data.information?.siteLogo?.asset?.url
		})
	);
	const webPageSchema = $derived(
		generateWebPageSchema(
			data.homePage?.seo?.title,
			data.homePage?.seo?.description,
			$page.url.pathname
		)
	);

	// Homepage breadcrumbs (single item)
	const homepageBreadcrumbs = $derived([
		{
			name: data.locale === 'id' ? 'Beranda' : 'Home',
			url: resolve('/')
		}
	]);

	interface ServiceData {
		_id: string;
		title: string;
		slug: string;
		icon: string;
		description: string;
		longDescription: string;
		seo?: { description?: string };
		features: Array<{ _key: string; icon: string; title: string; description: string }>;
		order: number;
	}

	interface ProjectData {
		_id: string;
		title: string;
		slug: { current: string };
		client: { name: string; iconUrl?: string; logoUrl?: string };
		description?: string;
		image?: string;
		imageUrl?: string;
		category: { title: string };
		techStack?: string[];
		featured: boolean;
		publishedAt: string;
	}

	interface Testimonial {
		id: number;
		name: string;
		content: string;
		projectTitle: string;
		projectSlug: string;
		projectCategory: string;
		clientIcon?: string;
	}

	interface StatData {
		_key: string;
		value: string;
		label: string;
	}

	interface ProjectTestimonialData {
		testimonial: {
			name: string;
			content: string;
		};
		client: {
			name: string;
			logoUrl?: string;
			iconUrl?: string;
		};
		projectTitle: string;
		projectSlug: string;
		projectCategory: string;
	}

	const services = $derived(
		(data.services || []).map((service: ServiceData, index: number) => {
			const colors = [
				'from-pink-500 to-rose-500',
				'from-blue-500 to-cyan-500',
				'from-green-500 to-emerald-500',
				'from-purple-500 to-violet-500',
				'from-teal-500 to-cyan-500',
				'from-fuchsia-500 to-pink-500'
			];

			return {
				id: service.slug || service._id,
				title: service.title,
				description: service.seo?.description || '',
				icon: service.icon,
				href: `/services/${service.slug || ''}`,
				color: colors[index]
			};
		})
	);

	const portfolioItems = $derived(
		(data.projects || []).map((project: ProjectData, index: number) => {
			const colors = [
				'from-blue-500 to-purple-500',
				'from-green-500 to-teal-500',
				'from-purple-500 to-pink-500',
				'from-orange-500 to-red-500',
				'from-cyan-500 to-blue-500',
				'from-yellow-500 to-orange-500',
				'from-pink-500 to-rose-500',
				'from-indigo-500 to-purple-500'
			];

			return {
				id: index + 1,
				title: project.title,
				category: project.category?.title,
				description: project.description || '',
				image: project.imageUrl || project.image || '',
				color: colors[index % colors.length],
				tech: (project.techStack || []).filter(Boolean),
				year: project.publishedAt ? new Date(project.publishedAt).getFullYear().toString() : '',
				client: project.client?.name,
				clientIcon: project.client?.iconUrl || project.client?.logoUrl || '',
				href: `/portfolio/${project.slug?.current}`
			};
		})
	);

	const testimonials = $derived<Testimonial[]>(
		(data.testimonials || [])
			.filter((item: ProjectTestimonialData) => item.testimonial?.name)
			.map((item: ProjectTestimonialData, index: number) => ({
				id: index + 1,
				name: item.testimonial?.name,
				content: item.testimonial?.content,
				projectTitle: item.projectTitle,
				projectSlug: item.projectSlug,
				projectCategory: item.projectCategory,
				clientIcon: item.client?.iconUrl || item.client?.logoUrl || ''
			}))
	);

	const companyStats = $derived(
		(data.homePage?.companyStatsSection?.items || []).map((stat: StatData, index: number) => {
			const rawValue = (stat.value || '').trim();
			const match = rawValue.match(/^(\d+)(.*)$/);

			return {
				value: match ? Number(match[1]) : 0,
				label: stat.label,
				suffix: match ? match[2] : rawValue,
				iconIndex: index
			};
		})
	);
</script>

<SEO
	title={data.homePage?.seo?.title}
	description={data.homePage?.seo?.description}
	image={data.information?.siteLogo?.asset?.url}
	imageAlt={data.information?.siteLogo?.alt || data.homePage?.seo?.title}
	siteIcon={data.information?.siteIcon?.asset?.url}
	locale={data.locale}
	alternates={data.alternateLocales}
	breadcrumbs={homepageBreadcrumbs}
	jsonLd={[organizationSchema as unknown, webPageSchema as unknown]}
/>

<HomeHero locale={data.locale} homePage={data.homePage} information={data.information} />

<ServicesSection locale={data.locale} {services} servicesSection={data.homePage?.servicesSection} />

<PortfolioSection
	locale={data.locale}
	{portfolioItems}
	portfolioSection={data.homePage?.portfolioSection}
/>

<BlogSection locale={data.locale} posts={data.posts} blogSection={data.homePage?.blogSection} />

{#if testimonials.length > 0}
	<TestimonialsSection
		locale={data.locale}
		{testimonials}
		testimonialsSection={data.homePage?.testimonialsSection}
	/>
{/if}

<StatsSection
	locale={data.locale}
	{companyStats}
	statsSection={data.homePage?.companyStatsSection}
/>
