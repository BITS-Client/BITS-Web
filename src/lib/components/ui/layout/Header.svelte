<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { resolvePath } from '$lib/utils';
	import { iconMap, getIconComponent } from '$lib/icons';
	import ThemeSwitcher from '$lib/components/ui/navigation/ThemeSwitcher.svelte';
	import LanguageSwitcher from '$lib/components/ui/navigation/LanguageSwitcher.svelte';
	import './Header.css';

	const Icons = {
		Code: iconMap.code,
		CodeXml: iconMap['code-xml'],
		Zap: iconMap.zap,
		Database: iconMap.database,
		Cpu: iconMap.cpu,
		Server: iconMap.server,
		Palette: iconMap.palette,
		Wallpaper: iconMap.wallpaper,
		Bot: iconMap.bot,
		ChevronDown: iconMap['chevron-down'],
		ArrowRight: iconMap['arrow-right']
	};

	interface HeaderProps {
		information: {
			siteTitle?: string;
			siteLogo?: { asset?: { url?: string }; alt?: string };
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
			skipToContent?: string;
			closeMenu?: string;
			openMenu?: string;
		} | null;
		services: Array<{
			_id: string;
			title: string;
			slug?: { current?: string };
			icon?: string;
			seo?: { description?: Record<string, string> };
		}>;
		servicesPage?: {
			ctaSection?: {
				title?: string;
				subtitle?: string;
				ctaText1?: string;
				ctaLink1?: string;
			};
		} | null;
		locale: 'id' | 'en';
	}

	let {
		information,
		navigation,
		general,
		services: servicesData,
		servicesPage,
		locale
	}: HeaderProps = $props();

	const services = $derived(
		(servicesData || [])
			.map((s) => {
				const slug = typeof s.slug === 'string' ? s.slug : s.slug?.current;
				const icon = s.icon;
				const description = s.seo?.description || '';
				return {
					id: s._id,
					title: s.title,
					icon: getIconComponent(icon ?? ''),
					description,
					href: resolve(`/services/${slug ?? ''}`)
				};
			})
			.filter((s) => s.title) // Only show services with title
			.slice(0, 8)
	);

	// CTA section from servicesPage.ctaSection
	const cta = $derived(servicesPage?.ctaSection);

	const navItems = $derived(navigation?.items?.sort((a, b) => a.order - b.order) || []);

	const siteLogoUrl = $derived(information?.siteLogo?.asset?.url);
	const siteTitle = $derived(information?.siteTitle);

	// Function to resolve paths with locale
	function resolve(path: string): string {
		return resolvePath(path, locale);
	}

	let mobileMenuOpen = $state(false);
	let servicesDropdownOpen = $state(false);
	let mobileServicesOpen = $state(false);
	let headerScrolled = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (!mobileMenuOpen) {
			mobileServicesOpen = false;
		}
		if (typeof document !== 'undefined') {
			document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
		}
	}

	function toggleMobileServices() {
		mobileServicesOpen = !mobileServicesOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		mobileServicesOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			servicesDropdownOpen = false;
			closeMobileMenu();
		}
	}

	function handleScroll() {
		headerScrolled = window.scrollY > 20;
	}

	function openServicesMenu() {
		servicesDropdownOpen = true;
	}

	function closeServicesMenu() {
		servicesDropdownOpen = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} onscroll={handleScroll} />

<header
	class="header-spectacular fixed top-0 left-0 right-0 z-50"
	class:header-scrolled={headerScrolled}
>
	<!-- Animated gradient border at bottom -->
	<div class="header-border-glow" aria-hidden="true"></div>

	<!-- Shimmer effect layer -->
	<div class="header-shimmer" aria-hidden="true"></div>

	<!-- Ambient glow underneath header -->
	<div class="header-ambient-glow" class:active={headerScrolled} aria-hidden="true"></div>

	<!-- Particle effect overlay -->
	<div class="header-particles" aria-hidden="true">
		<span class="particle particle-1"></span>
		<span class="particle particle-2"></span>
		<span class="particle particle-3"></span>
	</div>

	<!-- Skip Link for Accessibility -->
	<a href="#main-content" class="skip-to-content">
		{general?.skipToContent}
	</a>

	<div class="container-base relative z-10">
		<nav class="nav-main" aria-label="Main navigation">
			<!-- ===== LOGO SECTION ===== -->
			<a href={resolve('/')} class="logo-spectacular" aria-label="{siteTitle} - Home">
				<div class="logo-container">
					<div class="logo-ring-outer" aria-hidden="true"></div>
					<div class="logo-ring-inner" aria-hidden="true"></div>
					<div class="logo-glow-pulse" aria-hidden="true"></div>
					<img src={siteLogoUrl} alt={information?.siteLogo?.alt || siteTitle} class="logo-img" />
				</div>
			</a>

			<!-- ===== DESKTOP NAVIGATION ===== -->
			<div class="desktop-nav">
				{#each navItems as nav, idx (idx)}
					{#if nav.isService}
						<!-- Services Dropdown -->
						<div
							class="services-mega-wrapper"
							onmouseenter={openServicesMenu}
							onmouseleave={closeServicesMenu}
							role="none"
						>
							<a
								href={resolve(nav.href)}
								class="nav-item nav-item-services"
								aria-expanded={servicesDropdownOpen}
								aria-haspopup="true"
								aria-controls="dropdown-menu-services"
								style="--nav-delay: {idx * 80}ms"
							>
								<span class="nav-item-label">{nav.label}</span>
								<span class="nav-item-underline" aria-hidden="true"></span>
								<span class="nav-item-glow" aria-hidden="true"></span>
								<span class="nav-chevron" class:chevron-rotated={servicesDropdownOpen}>
									<Icons.ChevronDown class="w-4 h-4" />
								</span>
							</a>

							<!-- Mega Menu Panel -->
							<div class="mega-menu-container">
								<div
									id="dropdown-menu-services"
									class="mega-menu-panel"
									class:mega-menu-open={servicesDropdownOpen}
									role="menu"
									aria-label="Services menu"
								>
									<!-- Animated Background -->
									<div class="mega-menu-bg" aria-hidden="true">
										<div class="mega-menu-gradient"></div>
										<div class="mega-menu-grid"></div>
										<div class="mega-menu-orb orb-1"></div>
										<div class="mega-menu-orb orb-2"></div>
									</div>

									<div class="mega-menu-content">
										<!-- Services Grid -->
										<div class="mega-services-grid">
											{#each services as service, sIdx (service.id)}
												<a
													href={service.href}
													class="mega-service-card"
													role="menuitem"
													onclick={closeServicesMenu}
													style="--item-delay: {sIdx * 50}ms"
												>
													<div class="service-card-glow" aria-hidden="true"></div>
													<div class="service-card-icon">
														<service.icon class="w-6 h-6" />
													</div>
													<div class="service-card-content">
														<h4 class="service-card-title">{service.title}</h4>
														<p class="service-card-desc">{service.description}</p>
													</div>
												</a>
											{/each}
										</div>

										<!-- CTA Section -->
										<div class="mega-menu-cta">
											{#if cta?.title || cta?.subtitle}
												<div class="cta-content">
													{#if cta?.title}
														<h4 class="cta-title">
															<span class="cta-hl-1"
																>{cta.title?.split(' ').slice(0, 2).join(' ')}</span
															>
															<span class="cta-hl-2"
																>{cta.title?.split(' ').slice(2).join(' ')}</span
															>
														</h4>
													{/if}
													{#if cta?.subtitle}
														<p class="cta-desc">{cta.subtitle}</p>
													{/if}
												</div>
											{/if}
											{#if cta?.ctaText1}
												<a
													href={resolve(cta?.ctaLink1 || '/contact')}
													class="cta-button"
													onclick={closeServicesMenu}
												>
													{cta.ctaText1}
												</a>
											{/if}
										</div>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<!-- Regular Nav Item -->
						<a href={resolve(nav.href)} class="nav-item" style="--nav-delay: {idx * 80}ms">
							<span class="nav-item-label">{nav.label}</span>
							<span class="nav-item-underline" aria-hidden="true"></span>
							<span class="nav-item-glow" aria-hidden="true"></span>
						</a>
					{/if}
				{/each}
			</div>

			<!-- ===== RIGHT SECTION (Controls + Mobile Toggle) ===== -->
			<div class="nav-right">
				<div class="desktop-controls">
					<div class="nav-control-btn" style="--control-delay: 440ms">
						<LanguageSwitcher />
					</div>
					<div class="nav-control-btn" style="--control-delay: 500ms">
						<ThemeSwitcher />
					</div>
				</div>

				<div class="mobile-controls">
					<LanguageSwitcher />
					<ThemeSwitcher />
				</div>

				<!-- Hamburger Button -->
				<button
					class="hamburger-spectacular"
					onclick={toggleMobileMenu}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-nav-menu"
					aria-label={mobileMenuOpen ? general?.closeMenu : general?.openMenu}
				>
					<div class="hamburger-glow" aria-hidden="true"></div>
					<div class="hamburger-lines">
						<span class="h-line h-line-1" class:active={mobileMenuOpen}></span>
						<span class="h-line h-line-2" class:active={mobileMenuOpen}></span>
						<span class="h-line h-line-3" class:active={mobileMenuOpen}></span>
					</div>
				</button>
			</div>
		</nav>
	</div>

	<!-- ===== MOBILE MENU ===== -->
	{#if mobileMenuOpen}
		<div
			id="mobile-nav-menu"
			class="mobile-menu-spectacular"
			transition:slide={{ duration: 450, easing: cubicOut }}
		>
			<div class="mobile-menu-backdrop" aria-hidden="true"></div>
			<div class="mobile-menu-gradient" aria-hidden="true"></div>

			<nav class="mobile-menu-nav container-base" aria-label="Mobile navigation">
				{#each navItems as nav, idx (idx)}
					{#if nav.isService}
						<!-- Services Accordion -->
						<div class="mobile-section">
							<button
								class="mobile-nav-btn"
								onclick={toggleMobileServices}
								aria-expanded={mobileServicesOpen}
								aria-controls="mobile-services-list"
								style="--item-delay: {idx * 50}ms"
							>
								<div class="mobile-nav-btn-inner">
									<span class="mobile-nav-label">{nav.label}</span>
								</div>
								<span class="mobile-nav-chevron" class:chevron-rotated={mobileServicesOpen}>
									<Icons.ChevronDown class="w-5 h-5" />
								</span>
							</button>

							{#if mobileServicesOpen}
								<div
									id="mobile-services-list"
									class="mobile-services-accordion"
									transition:slide={{ duration: 350, easing: cubicOut }}
								>
									{#each services as service, sIdx (sIdx)}
										<a
											href={service.href}
											class="mobile-service-item"
											onclick={closeMobileMenu}
											style="--service-delay: {sIdx * 50}ms"
										>
											<div class="mobile-service-icon">
												<service.icon class="w-5 h-5" />
											</div>
											<span class="mobile-service-text">{service.title}</span>
											<span class="mobile-service-arrow">
												<Icons.ArrowRight class="w-4 h-4" />
											</span>
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{:else}
						<!-- Regular Nav Item -->
						<a
							href={resolve(nav.href)}
							class="mobile-nav-link"
							onclick={closeMobileMenu}
							style="--item-delay: {idx * 50}ms"
						>
							<span class="mobile-nav-label">{nav.label}</span>
							<span class="mobile-nav-arrow">
								<Icons.ArrowRight class="w-4 h-4" />
							</span>
						</a>
					{/if}
				{/each}
			</nav>
		</div>
	{/if}
</header>

<!-- Spacer for fixed header -->
<div class="header-spacer" aria-hidden="true"></div>
