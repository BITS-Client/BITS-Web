<script lang="ts">
	import { ArrowRight, ChevronLeft, ChevronRight } from '$lib/icons/lucide';

	interface RelatedPost {
		slug: string;
		title: string;
		image: string;
		category: string;
		categoryLabel: string;
		categoryColor: string;
		date: string;
	}

	interface Props {
		posts: RelatedPost[];
		locale: string;
		readArticleLabel: string;
		onresolve: (path: string) => string;
	}

	let { posts, locale: _locale, readArticleLabel, onresolve }: Props = $props();

	// Slider state
	let currentIndex = $state(0);
	const cardsPerView = 3;

	// Calculate max index (ensure we don't go past the last set of cards)
	const maxIndex = $derived(Math.max(0, posts.length - cardsPerView));

	// Visible posts based on current index
	const visiblePosts = $derived(posts.slice(currentIndex, currentIndex + cardsPerView));

	// Navigation functions
	function goNext() {
		if (currentIndex < maxIndex) {
			currentIndex++;
		}
	}

	function goPrev() {
		if (currentIndex > 0) {
			currentIndex--;
		}
	}

	// Check if navigation is possible
	const canGoNext = $derived(currentIndex < maxIndex);
	const canGoPrev = $derived(currentIndex > 0);

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<section class="related-section">
	<div class="related-bg" aria-hidden="true">
		<div class="related-orb related-orb-1"></div>
		<div class="related-orb related-orb-2"></div>
		<div class="related-orb related-orb-3"></div>
	</div>

	<div class="container-base">
		<!-- Slider Header with Navigation -->
		{#if posts.length > cardsPerView}
			<div class="slider-header">
				<div class="slider-nav">
					<button class="slider-btn" onclick={goPrev} disabled={!canGoPrev} aria-label="Previous">
						<ChevronLeft class="w-5 h-5" />
					</button>
					<div class="slider-dots">
						{#each Array(maxIndex + 1) as _, i (i)}
							<button
								class="slider-dot"
								class:active={i === currentIndex}
								onclick={() => (currentIndex = i)}
								aria-label="Go to slide {i + 1}"
							></button>
						{/each}
					</div>
					<button class="slider-btn" onclick={goNext} disabled={!canGoNext} aria-label="Next">
						<ChevronRight class="w-5 h-5" />
					</button>
				</div>
			</div>
		{/if}

		<!-- Cards Grid -->
		<div class="related-grid">
			{#each visiblePosts as relatedPost, index (relatedPost.slug)}
				<a
					href={onresolve(`/blog/${relatedPost.slug}`)}
					class="related-card"
					style="--index: {index}"
				>
					<div class="related-card-glow"></div>
					<div class="related-card-inner">
						<div class="related-image">
							{#if relatedPost.image}
								<img
									src={relatedPost.image}
									alt={relatedPost.title}
									class="related-image-img"
									onerror={(e) => {
										const target = e.target as HTMLImageElement;
										target.style.display = 'none';
										if (target.nextElementSibling) {
											(target.nextElementSibling as HTMLElement).style.display = 'flex';
										}
									}}
								/>
							{/if}
							<div
								class="related-placeholder"
								style="display: {relatedPost.image ? 'none' : 'flex'};"
							>
								<span>📖</span>
							</div>
							<span
								class="related-category-badge"
								style="background: {relatedPost.categoryColor || 'var(--color-primary)'}"
								>{relatedPost.categoryLabel ||
									(relatedPost.category || '').charAt(0).toUpperCase() +
										(relatedPost.category || '').slice(1)}</span
							>
						</div>
						<div class="related-content">
							<h3 class="related-card-title">{relatedPost.title}</h3>
							<div class="related-meta">
								<span class="related-date">{formatDate(relatedPost.date)}</span>
								<span class="related-read-more">
									{readArticleLabel}
									<ArrowRight class="w-4 h-4" />
								</span>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.related-section {
		position: relative;
		padding: 4rem 0;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			#f1f5f9 0%,
			#c7d2fe 25%,
			#bae6fd 50%,
			#d1fae5 75%,
			#f1f5f9 100%
		);
	}

	:global(.dark) .related-section {
		background: linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 100%);
	}

	.related-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.related-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.6;
	}

	.related-orb-1 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
		top: -100px;
		right: -50px;
	}

	.related-orb-2 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, #818cf8 0%, transparent 70%);
		bottom: -50px;
		left: -50px;
	}

	.related-orb-3 {
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, #f472b6 0%, transparent 70%);
		top: 50%;
		left: 50%;
	}

	/* Slider Header */
	.slider-header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.slider-nav {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.slider-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(0, 0, 0, 0.1);
		color: var(--color-gray-700);
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(8px);
	}

	.slider-btn:hover:not(:disabled) {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
		transform: scale(1.05);
	}

	.slider-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	:global(.dark) .slider-btn {
		background: rgba(30, 41, 59, 0.9);
		border-color: rgba(255, 255, 255, 0.1);
		color: var(--color-gray-300);
	}

	:global(.dark) .slider-btn:hover:not(:disabled) {
		background: var(--color-primary);
		color: white;
	}

	.slider-dots {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.slider-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 9999px;
		background: var(--color-gray-300);
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.slider-dot:hover {
		background: var(--color-gray-400);
		transform: scale(1.2);
	}

	.slider-dot.active {
		width: 1.5rem;
		background: var(--color-primary);
	}

	:global(.dark) .slider-dot {
		background: var(--color-gray-600);
	}

	:global(.dark) .slider-dot:hover {
		background: var(--color-gray-500);
	}

	:global(.dark) .slider-dot.active {
		background: var(--color-primary);
	}

	.related-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.related-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 1.25rem;
		}
	}

	.related-card {
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		animation: fadeInUp 0.4s ease forwards;
		animation-delay: calc(var(--index) * 0.1s);
		opacity: 0;
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

	.related-card:hover {
		transform: translateY(-4px);
	}

	.related-card-glow {
		position: absolute;
		inset: -2px;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary), #8b5cf6);
		border-radius: inherit;
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: -1;
		filter: blur(12px);
	}

	.related-card:hover .related-card-glow {
		opacity: 0.4;
	}

	.related-card-inner {
		position: relative;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(12px);
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: inherit;
		overflow: hidden;
		height: 100%;
	}

	:global(.dark) .related-card-inner {
		background: rgba(30, 41, 59, 0.6);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.related-image {
		position: relative;
		aspect-ratio: 16/9;
		overflow: hidden;
	}

	.related-image-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.related-card:hover .related-image-img {
		transform: scale(1.05);
	}

	.related-placeholder {
		aspect-ratio: 16/9;
		background: linear-gradient(
			135deg,
			var(--color-primary) / 5 0%,
			var(--color-secondary) / 5 100%
		);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		transition: transform 0.5s ease;
	}

	.related-card:hover .related-placeholder {
		transform: scale(1.05);
	}

	.related-category-badge {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		display: inline-block;
		padding: 0.375rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.6875rem;
		font-weight: 600;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.related-content {
		padding: 1rem 1.25rem 1.25rem;
	}

	.related-card-title {
		font-size: 0.9375rem;
		font-weight: 700;
		color: var(--color-gray-900);
		line-height: 1.4;
		margin-bottom: 0.75rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		transition: color 0.3s ease;
	}

	:global(.dark) .related-card-title {
		color: white;
	}

	.related-card:hover .related-card-title {
		color: var(--color-primary);
	}

	.related-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.related-date {
		font-size: 0.75rem;
		color: var(--color-gray-500);
	}

	:global(.dark) .related-date {
		color: var(--color-gray-400);
	}

	.related-read-more {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		color: var(--color-gray-500);
		font-size: 0.8125rem;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.related-card:hover .related-read-more {
		color: var(--color-primary);
	}

	.related-read-more :global(svg) {
		transition: transform 0.3s ease;
	}

	.related-card:hover .related-read-more :global(svg) {
		transform: translateX(3px);
	}
</style>
