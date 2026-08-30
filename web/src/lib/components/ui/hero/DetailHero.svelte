<script lang="ts">
	import type { Snippet } from 'svelte';
	import Breadcrumb from '$lib/components/ui/navigation/Breadcrumb.svelte';

	interface Props {
		title: string;
		description?: string;
		category?: string;
		imageUrl?: string;
		locale: string;
		breadcrumbs: Array<{ name: string; url: string }>;
		author?: { name: string; iconUrl?: string; logoUrl?: string };
		authorRole?: string;
		tags?: string[];
		actions?: Snippet;
	}

	let {
		title,
		description = '',
		category = '',
		imageUrl,
		locale,
		breadcrumbs,
		author,
		authorRole = 'Client',
		tags = [],
		actions
	}: Props = $props();
</script>

<section class="detail-hero">
	<div class="hero-bg" aria-hidden="true">
		{#if imageUrl}
			<div
				class="featured-image-bg"
				style="background-image: url('{imageUrl}');"
				aria-label="{title} featured image"
				role="img"
			></div>
			<div class="image-overlay"></div>
		{:else}
			<div class="mesh-gradient"></div>
			<div class="floating-shapes">
				<div class="shape shape-1"></div>
				<div class="shape shape-2"></div>
				<div class="shape shape-3"></div>
			</div>
			<div class="grid-overlay"></div>
		{/if}
	</div>

	<div class="container-base relative z-10 py-10 lg:py-16">
		{#if breadcrumbs.length > 0}
			<Breadcrumb items={breadcrumbs} {locale} />
		{/if}

		<div class="hero-content py-6">
			{#if category}
				<span class="hero-category-badge">
					{category}
				</span>
			{/if}

			<h1 class="hero-title">{title}</h1>

			{#if description}
				<p class="hero-excerpt">{description}</p>
			{/if}

			<!-- Meta Section -->
			{#if author || tags.length > 0 || actions}
				<div class="hero-meta">
					<!-- Author/Client Info -->
					{#if author}
						<div class="author-info">
							<div class="author-avatar">
								{#if author.iconUrl || author.logoUrl}
									<img
										src={author.iconUrl || author.logoUrl}
										alt={author.name}
										class="author-avatar-img"
									/>
								{:else}
									<span class="author-initials">{author.name.charAt(0) || '?'}</span>
								{/if}
							</div>
							<div class="author-details">
								<span class="author-name">{author.name}</span>
								<span class="author-role">{authorRole}</span>
							</div>
						</div>
					{/if}

					{#if author && tags.length > 0}
						<div class="meta-divider"></div>
					{/if}

					<!-- Tags/Tech Stack -->
					{#if tags.length > 0}
						<div class="meta-items">
							{#each tags.slice(0, 3) as tag (tag)}
								<span class="meta-item tech-pill">{tag}</span>
							{/each}
							{#if tags.length > 3}
								<span class="meta-item tech-pill">+{tags.length - 3}</span>
							{/if}
						</div>
					{/if}

					<!-- Additional Actions -->
					{#if actions}
						<div class="hero-actions">
							{@render actions()}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="hero-wave">
		<svg viewBox="0 0 1440 100" preserveAspectRatio="none">
			<path
				d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,65 1440,50 L1440,100 L0,100 Z"
				fill="currentColor"
			/>
		</svg>
	</div>
</section>

<style>
	.detail-hero {
		position: relative;
		min-height: 70vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
	}

	.mesh-gradient {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(135deg, #0f172a 0%, #1e293b 30%, var(--color-primary-dark) 60%, #312e81 100%),
			radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.35) 0%, transparent 50%),
			radial-gradient(ellipse at 70% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%);
		background-blend-mode: normal, screen, screen;
	}

	:global(.dark) .mesh-gradient {
		background:
			linear-gradient(135deg, #020617 0%, #0f172a 30%, #1e1b4b 60%, #312e81 100%),
			radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 70% 30%, rgba(16, 185, 129, 0.15) 0%, transparent 50%);
	}

	.floating-shapes {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.shape {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.15);
		animation: float-shape 20s ease-in-out infinite;
	}

	.shape-1 {
		width: 400px;
		height: 400px;
		top: -100px;
		right: -100px;
	}

	.shape-2 {
		width: 300px;
		height: 300px;
		bottom: 20%;
		left: 10%;
		animation-delay: -7s;
	}

	.shape-3 {
		width: 200px;
		height: 200px;
		top: 40%;
		right: 20%;
		animation-delay: -14s;
	}

	@keyframes float-shape {
		0%,
		100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(20px, -20px) rotate(120deg);
		}
		66% {
			transform: translate(-10px, 10px) rotate(240deg);
		}
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size: 50px 50px;
		mask-image: linear-gradient(180deg, black 0%, transparent 100%);
	}

	.hero-wave {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color: white;
		line-height: 0;
	}

	:global(.dark) .hero-wave {
		color: var(--color-bg);
	}

	.hero-wave svg {
		width: 100%;
		height: 60px;
	}

	.featured-image-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(15, 23, 42, 0.85) 0%,
			rgba(30, 41, 59, 0.7) 30%,
			rgba(30, 29, 75, 0.8) 60%,
			rgba(49, 46, 129, 0.85) 100%
		);
	}

	:global(.dark) .image-overlay {
		background: linear-gradient(
			135deg,
			rgba(2, 6, 23, 0.85) 0%,
			rgba(15, 23, 42, 0.7) 30%,
			rgba(30, 27, 75, 0.8) 60%,
			rgba(49, 46, 129, 0.85) 100%
		);
	}

	.hero-content {
		max-width: 800px;
		animation: hero-appear 0.8s ease-out;
	}

	@keyframes hero-appear {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-category-badge {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		font-size: 0.875rem;
		font-weight: 600;
		color: white;
		margin-bottom: 1.5rem;
		margin-right: 0.5rem;
		text-transform: capitalize;
		position: relative;
	}

	.hero-category-badge::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 9999px;
		background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6);
		background-size: 300% 300%;
		z-index: -1;
		animation: gradient-rotate 3s ease infinite;
	}

	@keyframes gradient-rotate {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.tech-pill {
		padding: 0.375rem 0.75rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		border-radius: 9999px;
		font-size: 0.8125rem;
		font-weight: 500;
		color: white;
		position: relative;
	}

	.tech-pill {
		padding: 0.375rem 0.75rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(8px);
		border-radius: 9999px;
		font-size: 0.8125rem;
		font-weight: 500;
		color: white;
		position: relative;
	}

	.tech-pill::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 9999px;
		background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6);
		background-size: 300% 300%;
		z-index: -1;
		animation: gradient-rotate 3s ease infinite;
	}

	@keyframes gradient-rotate {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.hero-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		line-height: 1.15;
		color: white;
		margin-bottom: 1.5rem;
	}

	.hero-excerpt {
		font-size: 1.25rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.75);
		margin-bottom: 2rem;
		max-width: 700px;
	}

	.hero-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem;
	}

	.author-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.author-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 1.125rem;
		overflow: hidden;
		position: relative;
	}

	.author-avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.author-details {
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-weight: 600;
		color: white;
	}

	.author-role {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.meta-divider {
		width: 1px;
		height: 40px;
		background: rgba(255, 255, 255, 0.2);
		display: none;
	}

	@media (min-width: 640px) {
		.meta-divider {
			display: block;
		}
	}

	.meta-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.9375rem;
	}

	.hero-actions {
		margin-left: auto;
		display: flex;
		gap: 0.75rem;
	}

	@media (max-width: 640px) {
		.hero-actions {
			margin-left: 0;
			margin-top: 1rem;
			width: 100%;
		}
	}

	:global(.detail-hero nav[aria-label='Breadcrumb']),
	:global(.detail-hero nav[aria-label='Breadcrumb'] a),
	:global(.detail-hero nav[aria-label='Breadcrumb'] span),
	:global(.detail-hero nav[aria-label='Breadcrumb'] svg) {
		color: white !important;
	}

	:global(.detail-hero nav[aria-label='Breadcrumb']) {
		margin-bottom: 0.75rem;
	}
</style>
