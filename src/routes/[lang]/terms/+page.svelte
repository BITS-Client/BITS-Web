<script lang="ts">
	import { FileText, Scale, AlertCircle, Gavel } from '$lib/icons/lucide';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import LegalHero from '$lib/components/ui/hero/LegalHero.svelte';
	import LegalContent from '$lib/components/ui/content/LegalContent.svelte';
	import ContactCard from '$lib/components/ui/card/ContactCard.svelte';

	import { generateWebPageSchema } from '$lib/utils/seo';

	let { data } = $props();

	// SEO data from Sanity
	const pageTitle = $derived(data.termsPage?.seo?.title || '');
	const pageDescription = $derived(data.termsPage?.seo?.description || '');

	const webPageSchema = $derived(generateWebPageSchema(pageTitle, pageDescription, '/terms'));

	// Hero data
	const heroBadge = $derived(data.termsPage?.hero?.badge || '');
	const heroTitle = $derived(data.termsPage?.hero?.title || '');
	const heroSubtitle = $derived(data.termsPage?.hero?.subtitle || '');
	const lastUpdatedLabel = $derived(data.termsPage?.hero?.lastUpdated || '');

	// Content data
	const contentTocLabel = $derived(data.termsPage?.content?.tocLabel || '');
	const contentSectionLabel = $derived(data.termsPage?.content?.sectionLabel || '');
	const contentNoticeTitle = $derived(data.termsPage?.content?.noticeTitle || '');
	const contentNoticeSubtitle = $derived(data.termsPage?.content?.noticeSubtitle || '');

	// Contact data
	const contactTitle = $derived(data.termsPage?.contact?.title || '');

	// Breadcrumbs
	const breadcrumbs = $derived([
		{ name: 'Home', url: '/' },
		{ name: pageTitle, url: '/terms' }
	]);

	// Icon mapping
	const iconMap: Record<string, typeof FileText> = {
		FileText,
		Scale,
		Gavel
	};

	// Sections from Sanity
	interface SectionItem {
		subtitle: string;
		text: string;
	}

	interface SectionData {
		id: string;
		title: string;
		icon: typeof FileText;
		color: string;
		content: SectionItem[];
	}

	const sections = $derived.by((): SectionData[] => {
		const sanitySections = data.termsPage?.sections || [];
		const sectionConfig: Record<string, { icon: string; color: string }> = {
			acceptance: { icon: 'FileText', color: 'from-blue-500 to-cyan-500' },
			services: { icon: 'FileText', color: 'from-purple-500 to-pink-500' },
			intellectualProperty: { icon: 'FileText', color: 'from-green-500 to-emerald-500' },
			userObligations: { icon: 'Scale', color: 'from-orange-500 to-red-500' },
			paymentTerms: { icon: 'FileText', color: 'from-teal-500 to-cyan-500' },
			limitationLiability: { icon: 'FileText', color: 'from-indigo-500 to-purple-500' },
			indemnification: { icon: 'Scale', color: 'from-yellow-500 to-orange-500' },
			termination: { icon: 'FileText', color: 'from-red-500 to-rose-500' },
			governingLaw: { icon: 'Gavel', color: 'from-violet-500 to-purple-500' },
			changes: { icon: 'FileText', color: 'from-rose-500 to-pink-500' }
		};

		return sanitySections.map((section: Record<string, unknown>, index: number) => {
			const key = (section.key as string) || `section-${index}`;
			const config = sectionConfig[key] || sectionConfig.acceptance;
			return {
				id: key,
				title: section.title as string,
				icon: iconMap[config.icon] || FileText,
				color: config.color,
				content:
					(section.items as Array<{ subtitle?: string; text?: string }>)?.map((item) => ({
						subtitle: item.subtitle || '',
						text: item.text || ''
					})) || []
			};
		});
	});
</script>

<SEO
	title={pageTitle}
	description={pageDescription}
	type="website"
	image={data.information?.siteLogo?.asset?.url}
	imageAlt={data.information?.siteLogo?.alt || pageTitle}
	siteIcon={data.information?.siteIcon?.asset?.url}
	locale={data.locale}
	{breadcrumbs}
	jsonLd={[webPageSchema as unknown]}
/>

<LegalHero
	badge={heroBadge}
	title={heroTitle}
	subtitle={heroSubtitle}
	lastUpdated={lastUpdatedLabel}
	{breadcrumbs}
	locale={data.locale}
	primaryIcon={Gavel}
	secondaryIcon={Scale}
/>

<LegalContent
	{sections}
	tocLabel={contentTocLabel}
	sectionLabel={contentSectionLabel}
	noticeTitle={contentNoticeTitle}
	noticeSubtitle={contentNoticeSubtitle}
	noticeIcon={AlertCircle}
	noticeColor="from-red-500/10 to-red-600/10 dark:from-red-500/15 dark:to-red-600/10"
/>

<section class="py-10 lg:py-16">
	<div class="container-base">
		<ContactCard
			email="admin@bits.co.id"
			phone="+62 819 678 048"
			address="Jl. Komp. Taman Pesona, Taktakan, Kota Serang, Banten 42162, Indonesia"
			title={contactTitle}
		/>
	</div>
</section>
