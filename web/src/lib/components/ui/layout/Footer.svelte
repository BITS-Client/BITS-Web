<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		Mail,
		Phone,
		MapPin,
		Send,
		Sparkles,
		Heart,
		MessageCircle,
		Github,
		Instagram,
		ArrowUp
	} from '$lib/icons/lucide';
	import { resolvePath } from '$lib/utils';
	import './Footer.css';

	interface FooterProps {
		information: {
			siteTitle?: string;
			siteDescription?: string;
			siteLogo?: { asset?: { url?: string }; alt?: string };
			siteEmail?: string;
			siteTelp?: string;
			siteWhatsApp?: string;
			siteAddress?: string;
			googleMaps?: string;
			instagram?: string;
			tiktok?: string;
			youtube?: string;
			github?: string;
		} | null;
		navigation: {
			items?: Array<{
				href: string;
				label: string;
				isService: boolean;
				order: number;
			}>;
		} | null;
		general: {
			newsletterTitle?: string;
			newsletterSubtitle?: string;
			newsletterButton?: string;
			newsletterBadge?: string;
			emailPlaceholder?: string;
			subscribeSuccess?: string;
			quickLinksTitle?: string;
			servicesFooterTitle?: string;
			locationTitle?: string;
			connectWithUs?: string;
			craftedWith?: string;
			inIndonesia?: string;
			privacyPolicy?: string;
			termsOfService?: string;
			socialLabels?: Record<string, { en?: string; id?: string }>;
		} | null;
		services: Array<{
			_id: string;
			title: string;
			slug?: { current?: string };
			icon?: string;
		}>;
		clients: Array<{
			_id: string;
			name?: string;
			logoUrl?: string;
			website?: string;
		}>;
		locale: 'id' | 'en';
	}

	let {
		information,
		navigation,
		general,
		services: servicesData,
		clients: clientsData,
		locale
	}: FooterProps = $props();

	// Helper function to get localized label
	function getSocialLabel(key: string): string | undefined {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const label = (general?.socialLabels as any)?.[key];
		// Handle both object format { en: "...", id: "..." } and simple string format
		if (typeof label === 'object' && label !== null) {
			return locale === 'id' ? label.id : label.en;
		}
		// If it's already a string (from localized query), return it directly
		return label;
	}

	const footerServices = $derived(
		(servicesData || []).slice(0, 6).map((s) => {
			const slug = typeof s.slug === 'string' ? s.slug : s.slug?.current;
			return {
				id: s._id,
				title: s.title,
				href: `/services/${slug ?? ''}`
			};
		})
	);

	// Function to resolve paths with locale
	function resolve(path: string): string {
		return resolvePath(path, locale);
	}

	const quickLinksLeft = $derived((navigation?.items || []).slice(0, 3));
	const quickLinksRight = $derived((navigation?.items || []).slice(3, 6));
	const servicesLeft = $derived(footerServices.slice(0, 3));
	const servicesRight = $derived(footerServices.slice(3, 6));

	const currentYear = new Date().getFullYear();

	let email = $state('');
	let isSubscribing = $state(false);
	let subscribeSuccess = $state(false);

	// Scroll reveal state
	let footerElement: HTMLElement;
	let isVisible = $state(false);
	let prefersReducedMotion = $state(false);

	// Newsletter error state
	let subscribeError = $state('');

	// Handle newsletter submit
	async function handleNewsletterSubmit(e: Event) {
		e.preventDefault();
		if (!email) return;

		isSubscribing = true;
		subscribeError = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (response.ok && data.success) {
				subscribeSuccess = true;
				email = '';

				setTimeout(() => {
					subscribeSuccess = false;
				}, 5000);
			} else {
				subscribeError = data.message;
				setTimeout(() => {
					subscribeError = '';
				}, 5000);
			}
		} catch {
			subscribeError = 'Network error. Please try again.';
			setTimeout(() => {
				subscribeError = '';
			}, 5000);
		} finally {
			isSubscribing = false;
		}
	}

	// Scroll to top
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			isVisible = true;
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (footerElement) {
			observer.observe(footerElement);
		}

		return () => {
			if (footerElement) {
				observer.unobserve(footerElement);
			}
		};
	});
</script>

<footer bind:this={footerElement} class="footer-wrapper relative overflow-hidden">
	<!-- Background Effects -->
	<div class="footer-bg" aria-hidden="true">
		<!-- Animated Mesh Grid -->
		<div class="mesh-grid"></div>

		<!-- Floating Orbs -->
		<div class="orb orb-1"></div>
		<div class="orb orb-2"></div>
		<div class="orb orb-3"></div>

		<!-- Particle Effect -->
		<div class="particles">
			{#each Array.from( { length: 20 }, () => ({ x: Math.random() * 100, duration: 3 + Math.random() * 4 }) ) as particle, i (i)}
				<div
					class="particle particle-{i % 5}"
					style="--delay: {i * 0.3}s; --x: {particle.x}%; --duration: {particle.duration}s;"
				></div>
			{/each}
		</div>
	</div>

	<!-- Clients Section -->
	{#if clientsData && clientsData.length > 0}
		<div class="clients-section">
			<div class="container-base">
				<div class="clients-marquee">
					<div class="marquee-track">
						{#each [...clientsData, ...clientsData] as client, index (index)}
							<div class="client-logo" style="--index: {index}">
								{#if client.logoUrl}
									<img src={client.logoUrl} alt={client.name} class="brand-image" />
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Newsletter Section -->
	<div class="newsletter-section">
		<div class="container-base relative z-10">
			{#if isVisible}
				<div
					id="footer-newsletter"
					class="newsletter-card"
					in:fly={{ y: 50, duration: 600, delay: 100 }}
				>
					<div class="newsletter-content">
						<div class="newsletter-text">
							<div class="newsletter-badge">
								<Sparkles class="w-4 h-4" />
								<span>{general?.newsletterBadge}</span>
							</div>
							<h3 class="newsletter-title">
								{general?.newsletterTitle}
							</h3>
							<p class="newsletter-description">
								{general?.newsletterSubtitle}
							</p>
						</div>

						<form class="newsletter-form" onsubmit={handleNewsletterSubmit}>
							<div class="input-wrapper">
								<Mail class="input-icon" aria-hidden="true" />
								<input
									type="email"
									bind:value={email}
									placeholder={general?.emailPlaceholder}
									class="newsletter-input"
									aria-label="Email address for newsletter"
									required
									disabled={isSubscribing}
								/>
								<button
									type="submit"
									class="newsletter-btn"
									disabled={isSubscribing || !email}
									aria-label="Subscribe to newsletter"
								>
									{#if isSubscribing}
										<span class="btn-spinner"></span>
									{:else if subscribeSuccess}
										<span class="btn-success">✓</span>
									{:else}
										<Send class="w-5 h-5" />
										<span class="btn-text">{general?.newsletterButton}</span>
									{/if}
								</button>
							</div>
							{#if subscribeSuccess}
								<p class="success-message" in:fly={{ y: 10, duration: 300 }}>
									✓ {general?.subscribeSuccess}
								</p>
							{:else if subscribeError}
								<p class="error-message" in:fly={{ y: 10, duration: 300 }}>
									{subscribeError}
								</p>
							{/if}
						</form>
					</div>

					<!-- Decorative Elements -->
					<div class="newsletter-decoration" aria-hidden="true">
						<div class="decoration-circle decoration-1"></div>
						<div class="decoration-circle decoration-2"></div>
						<div class="decoration-line"></div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Main Footer Content -->
	<div class="main-content">
		<div class="container-base py-12 lg:py-16">
			{#if isVisible}
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
					<!-- Company Info -->
					<div class="lg:col-span-4 footer-column" in:fly={{ y: 30, duration: 600, delay: 200 }}>
						<div class="footer-card">
							<a
								href={resolve('/')}
								class="logo-wrapper group focus-ring rounded-lg inline-flex items-center gap-3"
								aria-label="Banten IT Solutions - Home"
							>
								<div class="logo-icon">
									{#if information?.siteLogo?.asset?.url}
										<img
											src={information.siteLogo.asset.url}
											alt={information.siteLogo.alt ||
												information.siteTitle ||
												'Banten IT Solutions'}
											class="logo-image"
										/>
									{:else}
										<svg
											viewBox="0 0 40 40"
											class="w-10 h-10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
										>
											<defs>
												<linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
													<stop offset="0%" style="stop-color:var(--color-primary)" />
													<stop offset="100%" style="stop-color:var(--color-secondary)" />
												</linearGradient>
											</defs>
											<rect width="40" height="40" rx="10" fill="url(#logoGradient)" />
											<path
												d="M10 12h8c2 0 4 1 4 3.5S20 19 18 19c2.5 0 4.5 1.5 4.5 4s-2 4-4.5 4H10V12zm4 5.5h3c1 0 2-.5 2-1.5s-1-1.5-2-1.5h-3v3zm0 7h4c1.2 0 2.2-.6 2.2-1.8 0-1.2-1-1.7-2.2-1.7h-4v3.5z"
												fill="white"
											/>
											<circle cx="30" cy="15" r="3" fill="white" class="logo-dot" />
										</svg>
									{/if}
								</div>
								<span class="logo-text">{information?.siteTitle}</span>
							</a>

							<p class="company-description mt-4">
								{information?.siteDescription}
							</p>
						</div>
					</div>

					<!-- Services -->
					<div class="lg:col-span-5 footer-column" in:fly={{ y: 30, duration: 600, delay: 400 }}>
						<div class="footer-card">
							<h3 class="footer-heading">
								<span class="heading-line"></span>
								{general?.servicesFooterTitle}
							</h3>
							<nav class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5" aria-label="Services">
								{#each servicesLeft as service, i (i)}
									<a href={resolve(service.href)} class="footer-link" style="--delay: {i * 50}ms">
										<span class="link-dot"></span>
										<span class="link-text">{service.title}</span>
									</a>
								{/each}
								{#each servicesRight as service, i (i)}
									<a
										href={resolve(service.href)}
										class="footer-link"
										style="--delay: {(i + 3) * 50}ms"
									>
										<span class="link-dot"></span>
										<span class="link-text">{service.title}</span>
									</a>
								{/each}
							</nav>
						</div>
					</div>

					<!-- Quick Links -->
					<div class="lg:col-span-3 footer-column" in:fly={{ y: 30, duration: 600, delay: 300 }}>
						<div class="footer-card">
							<h3 class="footer-heading">
								<span class="heading-line"></span>
								{general?.quickLinksTitle}
							</h3>
							<nav class="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5" aria-label="Quick links">
								{#each quickLinksLeft as link, i (i)}
									<a href={resolve(link.href)} class="footer-link" style="--delay: {i * 50}ms">
										<span class="link-dot"></span>
										<span class="link-text">{link.label}</span>
									</a>
								{/each}
								{#each quickLinksRight as link, i (i)}
									<a
										href={resolve(link.href)}
										class="footer-link"
										style="--delay: {(i + 3) * 50}ms"
									>
										<span class="link-dot"></span>
										<span class="link-text">{link.label}</span>
									</a>
								{/each}
							</nav>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Social Media Bar -->
	<div class="social-bar">
		<div class="container-base">
			{#if isVisible}
				<div class="social-content" in:fly={{ y: 20, duration: 600, delay: 600 }}>
					<p class="social-text">{general?.connectWithUs}</p>
					<div class="social-links">
						<!-- Email -->
						<a
							href="mailto:{information?.siteEmail}"
							class="social-link hover:bg-[#ea4335]"
							style="--delay: 0ms"
							aria-label="Email us"
						>
							<span class="social-icon">
								<Mail class="w-5 h-5" />
							</span>
							<span class="social-label">{getSocialLabel('email')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- Phone -->
						<a
							href="tel:{information?.siteTelp}"
							class="social-link hover:bg-[#4285f4]"
							style="--delay: 100ms"
							aria-label="Call us"
						>
							<span class="social-icon">
								<Phone class="w-5 h-5" />
							</span>
							<span class="social-label">{getSocialLabel('phone')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- WhatsApp -->
						<a
							href="https://wa.me/{information?.siteWhatsApp}"
							target="_blank"
							rel="noopener noreferrer"
							class="social-link hover:bg-[#25d366]"
							style="--delay: 200ms"
							aria-label="WhatsApp (opens in new tab)"
						>
							<span class="social-icon">
								<MessageCircle class="w-5 h-5" />
							</span>
							<span class="social-label">{getSocialLabel('whatsapp')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- Google Maps -->
						<a
							href={information?.googleMaps}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link hover:bg-[#4285f4]"
							style="--delay: 300ms"
							aria-label="Google Maps (opens in new tab)"
						>
							<span class="social-icon">
								<MapPin class="w-5 h-5" />
							</span>
							<span class="social-label">{getSocialLabel('maps')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- GitHub -->
						<a
							href={information?.github}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link hover:bg-[#6e5494]"
							style="--delay: 400ms"
							aria-label="GitHub (opens in new tab)"
						>
							<span class="social-icon">
								<Github class="w-5 h-5" />
							</span>
							<span class="social-label">{getSocialLabel('github')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- YouTube -->
						<a
							href={information?.youtube}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link hover:bg-[#FF0000]"
							style="--delay: 500ms"
							aria-label="YouTube (opens in new tab)"
						>
							<span class="social-icon">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
									/>
								</svg>
							</span>
							<span class="social-label">{getSocialLabel('youtube')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- Instagram -->
						<a
							href={information?.instagram}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]"
							style="--delay: 600ms"
							aria-label="Instagram (opens in new tab)"
						>
							<span class="social-icon">
								<Instagram class="w-5 h-5" />
							</span>
							<span class="social-label">{getSocialLabel('instagram')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>

						<!-- TikTok -->
						<a
							href={information?.tiktok}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link hover:bg-black"
							style="--delay: 700ms"
							aria-label="TikTok (opens in new tab)"
						>
							<span class="social-icon">
								<svg
									class="w-5 h-5"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
									/>
								</svg>
							</span>
							<span class="social-label">{getSocialLabel('tiktok')}</span>
							<span class="social-glow" aria-hidden="true"></span>
						</a>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="bottom-bar">
		<div class="container-base py-6">
			{#if isVisible}
				<div class="bottom-content" in:fade={{ duration: 600, delay: 700 }}>
					<!-- Copyright -->
					<p class="copyright">
						<span>&copy; {currentYear}</span>
						<span class="brand">{information?.siteTitle}</span>
						<span class="divider">•</span>
						<span>{general?.craftedWith}</span>
						<Heart class="heart-icon" aria-label="love" />
						<span>{general?.inIndonesia}</span>
					</p>

					<div class="bottom-right">
						<nav class="legal-links" aria-label="Legal">
							{#each [{ label: general?.privacyPolicy, href: '/privacy' }, { label: general?.termsOfService, href: '/terms' }] as link, i (i)}
								<a href={resolve(link.href)} class="legal-link">
									{link.label}
								</a>
								{#if i < 1}
									<span class="legal-divider">|</span>
								{/if}
							{/each}
						</nav>

						<!-- Scroll to Top -->
						<button onclick={scrollToTop} class="scroll-top-btn" aria-label="Scroll to top">
							<ArrowUp class="w-5 h-5" />
							<span class="btn-ring" aria-hidden="true"></span>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</footer>
