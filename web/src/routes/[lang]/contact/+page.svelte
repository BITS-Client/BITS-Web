<script lang="ts">
	import { env } from '$env/dynamic/public';
	import {
		Cpu,
		Code,
		MessageSquare,
		Server,
		Cloud,
		Palette,
		Megaphone,
		Headphones
	} from '$lib/icons/lucide';
	import SEO from '$lib/components/ui/seo/SEO.svelte';
	import ContactCard from '$lib/components/ui/card/ContactCard.svelte';
	import PageHero from '$lib/components/ui/hero/PageHero.svelte';
	import ContactForm from '$lib/components/ui/form/ContactForm.svelte';
	import ContactFAQ from '$lib/components/ui/content/ContactFAQ.svelte';
	import { generateWebPageSchema } from '$lib/utils/seo';
	import type { ContactFormData } from '$lib/types/contact';

	type ContactDetailItem = { value: string; label: string };
	type ContactInquiryType = {
		value: string;
		label: string;
		description: string;
		detailLabel?: string;
		detailPlaceholder?: string;
		detailItems?: ContactDetailItem[];
	};

	let { data } = $props();

	// Turnstile site key - Cloudflare test key in dev, real key from env in production
	const isDev = import.meta.env.DEV;
	const TURNSTILE_SITE_KEY = isDev ? '1x00000000000000000000AA' : env.PUBLIC_TURNSTILE_SITE_KEY;

	// SEO schema
	const webPageSchema = $derived(
		generateWebPageSchema(
			data.contactPage?.seo?.title?.[data.locale] || data.contactPage?.seo?.title?.en || 'Contact',
			data.contactPage?.seo?.description?.[data.locale] ||
				data.contactPage?.seo?.description?.en ||
				'',
			'/contact'
		)
	);

	// Breadcrumbs
	const breadcrumbs = $derived([
		{ name: data.homeLabel || 'Home', url: '/' },
		{ name: data.contactPage?.seo?.title || 'Contact', url: '/contact' }
	]);

	// Inquiry types
	const inquiryTypes = $derived.by(() => {
		const defaultTypes = [
			{
				value: 'hardware',
				label: 'Infrastructure & Networking',
				icon: Cpu,
				description: 'Server, network, CCTV, and hardware',
				gradient: 'from-blue-500 to-cyan-500'
			},
			{
				value: 'software',
				label: 'Software Development',
				icon: Code,
				description: 'Web, mobile, ERP, and custom software',
				gradient: 'from-purple-500 to-pink-500'
			},
			{
				value: 'consultation',
				label: 'IT Consulting & Training',
				icon: MessageSquare,
				description: 'IT strategy, training, and advisory',
				gradient: 'from-emerald-500 to-teal-500'
			}
		];

		const iconMap: Record<string, typeof Cpu> = {
			software: Code,
			infrastructure: Server,
			cloud: Cloud,
			design: Palette,
			printing: Megaphone,
			consultation: Headphones,
			hardware: Cpu
		};

		const gradientMap: Record<string, string> = {
			software: 'from-purple-500 to-pink-500',
			infrastructure: 'from-blue-500 to-cyan-500',
			cloud: 'from-indigo-500 to-blue-500',
			design: 'from-fuchsia-500 to-rose-500',
			printing: 'from-orange-500 to-amber-500',
			consultation: 'from-emerald-500 to-teal-500',
			hardware: 'from-blue-500 to-cyan-500'
		};

		const fromCms = (data.contactPage?.form?.inquiryTypeItems || []).map(
			(item: {
				value: string;
				label: string;
				description?: string;
				detailLabel?: string;
				detailPlaceholder?: string;
				detailItems?: { value: string; label: string }[];
			}) => ({
				value: item.value,
				label: item.label,
				icon: iconMap[item.value] || MessageSquare,
				description: item.description || item.label,
				gradient: gradientMap[item.value] || 'from-gray-500 to-slate-500',
				detailLabel: item.detailLabel,
				detailPlaceholder: item.detailPlaceholder,
				detailItems: item.detailItems || []
			})
		);

		return fromCms.length > 0 ? fromCms : defaultTypes;
	});

	// FAQ items
	const faqItems = $derived(
		(data.contactPage?.faq?.faqItems || []).map(
			(item: { _key: string; question: string; answer: string }) => ({
				_key: item._key,
				question: item.question,
				answer: item.answer
			})
		)
	);

	// Form submission handler
	async function handleFormSubmit(formData: ContactFormData, token: string) {
		const inquiryTypeMap: Record<string, string> = {
			hardware: 'Hardware',
			software: 'Software',
			infrastructure: 'Infrastructure',
			cloud: 'Cloud',
			design: 'Design',
			printing: 'Printing',
			consultation: 'Consultation'
		};

		function getSelectedLabel(value: string, options: { value: string; label: string }[]): string {
			const found = options.find((opt) => opt.value === value);
			return found?.label || value;
		}

		const selectedInquiry = inquiryTypes.find(
			(type: ContactInquiryType) => type.value === formData.inquiryType
		);
		const selectedDetailItems = selectedInquiry?.detailItems || [];

		const payload = {
			name: formData.name,
			email: formData.email,
			phone: formData.phone || undefined,
			inquiryType: inquiryTypeMap[formData.inquiryType] || 'Consultation',
			message: formData.message,
			...(formData.inquiryType === 'consultation' && {
				timeline: formData.preferredDate || undefined,
				consultationTopic: formData.consultationTopic
					? getSelectedLabel(formData.consultationTopic, selectedDetailItems)
					: undefined
			}),
			...(formData.inquiryType !== 'consultation' && {
				consultationTopic: formData.consultationTopic
					? getSelectedLabel(formData.consultationTopic, selectedDetailItems)
					: undefined
			}),
			turnstile_token: token
		};

		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		const result = await response.json();

		if (!response.ok || !result.success) {
			throw new Error(result.message || 'Failed to submit form');
		}

		return result;
	}
</script>

<SEO
	title={data.contactPage?.seo?.title}
	description={data.contactPage?.seo?.description}
	image={data.information?.siteLogo?.asset?.url}
	imageAlt={data.information?.siteLogo?.alt || data.contactPage?.seo?.title}
	siteIcon={data.information?.siteIcon?.asset?.url}
	locale={data.locale}
	{breadcrumbs}
	jsonLd={[webPageSchema as unknown]}
/>

<!-- Hero Section -->
<PageHero
	badge={data.contactPage?.hero?.badge}
	title={data.contactPage?.hero?.title}
	subtitle={data.contactPage?.hero?.subtitle}
	email={data.information?.siteEmail}
	telp={data.information?.siteTelp}
	whatsapp={data.information?.siteWhatsApp}
	emailLabel={data.contactPage?.hero?.email}
	telpLabel={data.contactPage?.hero?.telp}
	whatsappLabel={data.contactPage?.hero?.whatsapp}
	locale={data.locale}
	{breadcrumbs}
/>

<!-- Contact Section -->
<section class="py-10 lg:py-16 bg-white contact-main" aria-labelledby="contact-form-heading">
	<div class="container-base">
		<div class="grid lg:grid-cols-5 gap-12 lg:gap-16">
			<!-- Contact Form -->
			<div class="lg:col-span-3">
				<ContactForm
					formTitle={data.contactPage?.form?.title}
					formSubtitle={data.contactPage?.form?.subtitle}
					nameLabel={data.contactPage?.form?.name}
					namePlaceholder={data.contactPage?.form?.namePlaceholder}
					emailLabel={data.contactPage?.form?.email}
					emailPlaceholder={data.contactPage?.form?.emailPlaceholder}
					phoneLabel={data.contactPage?.form?.phone}
					phonePlaceholder={data.contactPage?.form?.phonePlaceholder}
					typeLabel={data.contactPage?.form?.type}
					{inquiryTypes}
					consultationTopicLabel={data.contactPage?.form?.type}
					consultationTopicPlaceholder={data.contactPage?.form?.type}
					messageLabel={data.contactPage?.form?.message}
					messagePlaceholder={data.contactPage?.form?.messagePlaceholder}
					verificationLabel={data.contactPage?.form?.verification}
					verifiedLabel={data.contactPage?.form?.verified}
					turnstileRequiredLabel={data.contactPage?.form?.turnstileRequired}
					sendingLabel={data.contactPage?.form?.sending}
					sendLabel={data.contactPage?.form?.send}
					successTitle={data.contactPage?.form?.successTitle}
					successDesc={data.contactPage?.form?.successDesc}
					errorTitle={data.contactPage?.form?.errorTitle}
					turnstileSiteKey={TURNSTILE_SITE_KEY}
					locale={data.locale}
					onSubmit={handleFormSubmit}
				/>
			</div>

			<!-- Contact Info Sidebar -->
			<aside class="lg:col-span-2">
				<div class="sidebar-content">
					<ContactCard
						email={data.information?.siteEmail}
						phone={data.information?.siteTelp}
						address={data.information?.siteAddress}
						emailLabel={data.contactPage?.info?.emailUs}
						phoneLabel={data.contactPage?.info?.callUs}
						addressLabel={data.contactPage?.info?.visit}
						title={data.contactPage?.info?.contactInfo}
					/>

					<!-- Support Info -->
					<div class="support-card">
						<div class="support-icon-wrapper">
							<div class="support-icon-bg"></div>
							<div class="support-icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="w-6 h-6"
									><path
										d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									></path></svg
								>
							</div>
						</div>
						<h4 class="support-title">{data.contactPage?.info?.needHelp}</h4>
						<p class="support-text">{data.contactPage?.info?.helpDesc}</p>
						<a
							href="https://wa.me/{data.information?.siteWhatsApp}"
							target="_blank"
							rel="noopener noreferrer"
							class="support-btn"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="w-4 h-4"
								><path
									d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
								></path></svg
							>
							<span>{data.contactPage?.info?.chatWhatsApp}</span>
						</a>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<ContactFAQ
	badge={data.contactPage?.faq?.badge}
	title={data.contactPage?.faq?.title}
	subtitle={data.contactPage?.faq?.subtitle}
	{faqItems}
	helpTitle={data.contactPage?.faq?.helpTitle}
	helpDesc={data.contactPage?.faq?.helpDesc}
	emailLabel={data.contactPage?.faq?.email}
	whatsappLabel={data.contactPage?.faq?.whatsapp}
	siteEmail={data.information?.siteEmail}
	siteWhatsApp={data.information?.siteWhatsApp}
/>

<style>
	.contact-main {
		:global(.dark) & {
			background: var(--color-bg);
		}
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.support-card {
		position: relative;
		border-radius: 1.5rem;
		overflow: hidden;
		background: white;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		padding: 1.25rem;
		text-align: center;
		border: 1px solid #94a3b8;
	}

	@media (min-width: 640px) {
		.support-card {
			padding: 1.5rem;
			box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
		}
	}

	:global(.dark) .support-card {
		background: var(--color-bg-secondary);
		box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.support-icon-wrapper {
		position: relative;
		width: 70px;
		height: 70px;
		margin: 0 auto 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.support-icon-bg {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		animation: supportPulse 3s ease-in-out infinite;
		opacity: 0.2;
	}

	@keyframes supportPulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.3;
		}
	}

	.support-icon {
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 1rem;
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);
	}

	:global(.dark) .support-icon {
		background: linear-gradient(135deg, var(--color-secondary), #059669);
		box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
	}

	.support-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-gray-900);
		margin-bottom: 0.5rem;
	}

	:global(.dark) .support-title {
		color: white;
	}

	.support-text {
		color: var(--color-gray-600);
		font-size: 0.9375rem;
		margin-bottom: 1.5rem;
	}

	:global(.dark) .support-text {
		color: var(--color-gray-400);
	}

	.support-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		color: white;
		font-weight: 600;
		border-radius: 0.75rem;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.support-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
	}
</style>
