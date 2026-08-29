<script lang="ts">
	import { Sparkles, Search } from '$lib/icons/lucide';
	import ContactCTA from '$lib/components/ui/cta/ContactCTA.svelte';
	import Breadcrumb from '$lib/components/ui/navigation/Breadcrumb.svelte';
	import type { Component } from 'svelte';

	interface BreadcrumbItem {
		name: string;
		url: string;
	}

	interface HeroStat {
		_key: string;
		value: string;
		label: string;
	}

	interface SearchButtonProps {
		label: string;
		onclick: () => void;
	}

	interface CustomButtonProps {
		label: string;
		href: string;
		isPrimary?: boolean;
		isSecondary?: boolean;
		onclick?: () => void;
	}

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		email?: string | null;
		telp?: string | null;
		whatsapp?: string | null;
		emailLabel?: string;
		telpLabel?: string;
		whatsappLabel?: string;
		locale?: string;
		breadcrumbs?: BreadcrumbItem[];
		stats?: HeroStat[];
		icon?: Component;
		searchButton?: SearchButtonProps | null;
		customButtons?: CustomButtonProps[];
	}

	let {
		badge = '',
		title = '',
		subtitle = '',
		email = '',
		telp = '',
		whatsapp = '',
		emailLabel = 'Email',
		telpLabel = 'Phone',
		whatsappLabel = 'WhatsApp',
		locale = 'id',
		breadcrumbs = [],
		stats = [],
		icon: Icon = Sparkles as unknown as Component,
		searchButton = null,
		customButtons = []
	}: Props = $props();

	const titleMain = $derived(title.split(' ').slice(0, 2).join(' '));
	const titleAccent = $derived(title.split(' ').slice(2).join(' '));
</script>

<section class="page-hero">
	<div class="hero-bg" aria-hidden="true">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
		<div class="grid-pattern"></div>
	</div>

	<div class="container-base relative z-10 py-10 lg:py-16">
		{#if breadcrumbs.length > 0}
			<Breadcrumb items={breadcrumbs} class="mb-8" {locale} />
		{/if}

		<div class="max-w-4xl">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-500/20 mb-6 badge-animate shadow-sm"
			>
				<Icon class="w-4 h-4 text-blue-600" />
				<span class="text-sm font-medium text-gray-900">{badge}</span>
			</div>

			<h1
				class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.18] text-gray-900 mb-6 hero-title"
			>
				{titleMain}
				{#if titleAccent}
					<span class="hero-headline2"> {titleAccent}</span>
				{/if}
			</h1>

			<p class="text-lg lg:text-xl text-gray-700 mb-8 hero-subtitle max-w-2xl">
				{subtitle}
			</p>

			<div class="hero-actions-row">
				{#if stats.length > 0}
					<div class="hero-stats">
						{#each stats as stat, index (stat._key)}
							<div class="hero-stat-item" style="--index: {index}">
								<span class="hero-stat-value">{stat.value}</span>
								<span class="hero-stat-label">{stat.label}</span>
							</div>
						{/each}
					</div>
				{/if}

				{#if customButtons.length > 0}
					<div class="quick-contact-grid hero-quick">
						{#each customButtons as button, index (index)}
							<a
								href={button.href}
								class="quick-contact-card"
								class:primary={button.isPrimary}
								class:secondary={button.isSecondary}
								onclick={(e) => {
									if (button.onclick) {
										e.preventDefault();
										button.onclick();
									}
								}}
							>
								<span>{button.label}</span>
							</a>
						{/each}
					</div>
				{:else if email || telp || whatsapp}
					<div class="quick-contact-grid hero-quick">
						{#if email}
							<ContactCTA href="mailto:{email}" icon="mail" label={emailLabel} />
						{/if}
						{#if telp}
							<ContactCTA href="tel:{telp.replace(/\s+/g, '')}" icon="phone" label={telpLabel} />
						{/if}
						{#if whatsapp}
							<ContactCTA
								href="https://wa.me/{whatsapp}"
								icon="whatsapp"
								label={whatsappLabel}
								isExternal={true}
							/>
						{/if}
					</div>
				{/if}
			</div>

			{#if searchButton}
				<button class="search-trigger-btn" onclick={searchButton.onclick} aria-label="Open search">
					<Search class="w-5 h-5" aria-hidden="true" />
					<span>{searchButton.label}</span>
				</button>
			{/if}
		</div>
	</div>

	<div class="wave-divider" aria-hidden="true">
		<svg
			viewBox="0 0 1440 120"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<path
				d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
				fill="currentColor"
			/>
		</svg>
	</div>
</section>

<style>
	.page-hero {
		position: relative;
		background: linear-gradient(
			135deg,
			#f1f5f9 0%,
			#c7d2fe 25%,
			#bae6fd 50%,
			#d1fae5 75%,
			#f1f5f9 100%
		);
		overflow: hidden;
		min-height: 70vh;
		display: flex;
		flex-direction: column;
	}

	:global(.dark) .page-hero {
		background: linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 100%);
	}

	:global(.dark) .page-hero .hero-title {
		color: white !important;
	}

	:global(.dark) .page-hero .hero-subtitle {
		color: white !important;
	}

	:global(.dark) .page-hero .badge-animate span {
		color: white !important;
	}

	:global(.dark) .page-hero .badge-animate {
		background-color: rgba(30, 41, 59, 0.8) !important;
		border-color: rgba(255, 255, 255, 0.2) !important;
		box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.3);
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.6;
		animation: floatOrb 15s ease-in-out infinite;
	}

	.orb-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
		top: -150px;
		right: -100px;
	}

	.orb-2 {
		width: 350px;
		height: 350px;
		background: radial-gradient(circle, #818cf8 0%, transparent 70%);
		bottom: -100px;
		left: -100px;
		animation-delay: -5s;
	}

	.orb-3 {
		width: 250px;
		height: 250px;
		background: radial-gradient(circle, #f472b6 0%, transparent 70%);
		top: 40%;
		left: 30%;
		animation-delay: -10s;
	}

	@keyframes floatOrb {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(30px, -30px);
		}
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	.badge-animate {
		animation: fadeInDown 0.6s ease-out 0.2s both;
	}

	.hero-title {
		animation: fadeInUp 0.8s ease-out 0.3s both;
	}

	.hero-headline2 {
		display: inline;
		background: linear-gradient(135deg, #10b981 0%, #3b82f6 40%, #8b5cf6 70%, #ec4899 100%);
		background-size: 300% 300%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: hero-headline-gradient 6s ease infinite;
	}

	:global(:root.dark) .hero-headline2 {
		background: linear-gradient(135deg, #34d399 0%, #60a5fa 35%, #a78bfa 65%, #f472b6 100%);
		background-size: 300% 300%;
		-webkit-background-clip: text;
		background-clip: text;
		filter: drop-shadow(0 0 40px rgba(52, 211, 153, 0.4));
	}

	.hero-subtitle {
		animation: fadeInUp 0.8s ease-out 0.4s both;
	}

	.hero-actions-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		animation: fadeInUp 0.8s ease-out 0.5s both;
	}

	.hero-actions-row .hero-stats {
		margin-right: 1rem;
	}

	.hero-actions-row .hero-quick {
		padding-bottom: 0;
		margin-top: 1.5rem;
	}

	.search-trigger-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1.5rem;
		background: white;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		color: #111827;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		animation: fadeInUp 0.8s ease-out 0.5s both;
	}

	.search-trigger-btn:hover {
		background: #f9fafb;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.search-trigger-btn :global(svg) {
		color: #374151;
	}

	:global(.dark) .search-trigger-btn {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	:global(.dark) .search-trigger-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	}

	:global(.dark) .search-trigger-btn :global(svg) {
		color: rgba(255, 255, 255, 0.9);
	}

	.hero-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
		animation: fadeInUp 0.8s ease-out 0.5s both;
	}

	.hero-stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem 0.75rem;
		background: white;
		backdrop-filter: blur(8px);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 0.75rem;
		min-width: 70px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		animation: statReveal 0.5s ease-out forwards;
		animation-delay: calc(0.6s + var(--index) * 0.1s);
		opacity: 0;
		transform: translateY(20px);
	}

	@keyframes statReveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-stat-value {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--color-gray-900);
		line-height: 1.2;
	}

	.hero-stat-label {
		font-size: 0.625rem;
		font-weight: 500;
		color: var(--color-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-top: 0.125rem;
		text-align: center;
	}

	:global(.dark) .hero-stat-item {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .hero-stat-value {
		color: white;
	}

	:global(.dark) .hero-stat-label {
		color: rgba(255, 255, 255, 0.7);
	}

	.hero-quick {
		animation: fadeInUp 0.8s ease-out 0.5s both;
	}

	.quick-contact-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding-bottom: 1.5rem;
	}

	.quick-contact-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		color: white;
		font-weight: 600;
		transition: all 0.3s ease;
		text-decoration: none;
	}

	.quick-contact-card:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-4px);
	}

	.quick-contact-card.primary {
		background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
		border: none;
		color: white;
	}

	.quick-contact-card.primary:hover {
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.quick-contact-card.secondary {
		background: transparent;
		border: 2px solid rgba(255, 255, 255, 0.6);
		color: white;
	}

	.quick-contact-card.secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.8);
		transform: translateY(-4px);
	}

	.quick-contact-card.secondary {
		background: transparent;
		border: 2px solid var(--color-primary);
		color: var(--color-primary);
	}

	.quick-contact-card.secondary:hover {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	:global(.dark) .quick-contact-card:not(.primary):not(.secondary) {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	:global(.dark) .quick-contact-card:not(.primary):not(.secondary):hover {
		background: rgba(255, 255, 255, 0.2);
	}

	:global(.dark) .quick-contact-card.primary {
		background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
		color: white;
	}

	:global(.dark) .quick-contact-card.secondary {
		background: transparent;
		border: 2px solid rgba(255, 255, 255, 0.5);
		color: white;
	}

	:global(.dark) .quick-contact-card.secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.8);
	}

	.wave-divider {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color: white;
		line-height: 0;
	}

	:global(.dark) .wave-divider {
		color: var(--color-bg);
	}

	.wave-divider svg {
		width: 100%;
		height: 80px;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
