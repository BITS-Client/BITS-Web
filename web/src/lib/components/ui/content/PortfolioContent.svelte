<script lang="ts">
	import { fly } from 'svelte/transition';

	interface GalleryImage {
		_key: string;
		url?: string;
		alt?: string;
	}

	interface ContentSection {
		label: string;
		content: string;
		number: number;
		color: string;
	}

	interface Props {
		sections: ContentSection[];
		gallery?: GalleryImage[];
		locale?: string;
		galleryImageLabel?: string;
	}

	let {
		sections,
		gallery = [],
		locale: _locale,
		galleryImageLabel = 'Gallery Image'
	}: Props = $props();

	// Carousel state and functions
	let currentImageIndex = $state(0);

	function nextImage() {
		if (gallery.length > 0) {
			currentImageIndex = (currentImageIndex + 1) % gallery.length;
		}
	}

	function previousImage() {
		if (gallery.length > 0) {
			currentImageIndex = currentImageIndex === 0 ? gallery.length - 1 : currentImageIndex - 1;
		}
	}

	function selectImage(index: number) {
		currentImageIndex = index;
	}

	function carouselKeyboard(node: HTMLElement) {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				previousImage();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				nextImage();
			}
		};

		node.addEventListener('keydown', handleKeydown);

		return {
			destroy() {
				node.removeEventListener('keydown', handleKeydown);
			}
		};
	}
</script>

<section class="py-10 lg:py-16 bg-white" aria-labelledby="content-heading">
	<div class="container-base">
		<h2 id="content-heading" class="sr-only">Content Details</h2>
		<div class="max-w-4xl mx-auto space-y-16">
			<!-- Content Sections -->
			{#each sections as section (section.number)}
				<div in:fly={{ y: 30, duration: 500, delay: section.number * 100 }}>
					<h3 class="heading-3 text-[var(--color-gray-900)] mb-6 flex items-center gap-3">
						<span
							class="w-10 h-10 flex items-center justify-center rounded-full {section.color} text-lg font-bold"
						>
							{section.number}
						</span>
						{section.label}
					</h3>
					<p class="text-[var(--color-gray-600)] text-lg leading-relaxed pl-14">
						{section.content}
					</p>
				</div>
			{/each}

			<!-- Gallery -->
			{#if gallery.length > 0}
				<div class="carousel-container" use:carouselKeyboard>
					<div class="main-image-wrapper">
						{#each gallery as image, index (image._key || index)}
							<div
								class="main-image {currentImageIndex === index ? 'active' : ''}"
								role="tabpanel"
								aria-labelledby={`thumb-${image._key || index}`}
							>
								<img
									src={image.url || ''}
									alt={image.alt || `${galleryImageLabel} ${index + 1}`}
									class="main-image-element"
									loading={index === 0 ? 'eager' : 'lazy'}
									decoding="async"
								/>
							</div>
						{/each}

						<button
							class="nav-button nav-prev"
							aria-label="Previous image"
							onclick={() => previousImage()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button class="nav-button nav-next" aria-label="Next image" onclick={() => nextImage()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>

						<div class="image-counter">
							<span class="counter-current">{currentImageIndex + 1}</span>
							<span class="counter-divider">/</span>
							<span class="counter-total">{gallery.length}</span>
						</div>
					</div>

					<div class="thumbnail-strip" role="tablist">
						{#each gallery as image, index (image._key || index)}
							<button
								class="thumbnail-item {currentImageIndex === index ? 'active' : ''}"
								role="tab"
								aria-label={`View image ${index + 1}`}
								aria-selected={currentImageIndex === index}
								aria-controls={`thumb-${image._key || index}`}
								onclick={() => selectImage(index)}
							>
								<img
									src={image.url || ''}
									alt=""
									class="thumbnail-image"
									loading="lazy"
									decoding="async"
								/>
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Carousel Container */
	.carousel-container {
		max-width: 1200px;
		margin: 0 auto;
		animation: carousel-appear 0.8s ease-out;
		animation-delay: 0.3s;
		animation-fill-mode: both;
	}

	@keyframes carousel-appear {
		from {
			opacity: 0;
			transform: translateY(40px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Main Image Wrapper */
	.main-image-wrapper {
		position: relative;
		aspect-ratio: 16 / 9;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
		border-radius: 1.25rem;
		overflow: hidden;
		box-shadow:
			0 30px 60px -15px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 255, 255, 0.05),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	/* Main Image with Fade Transition */
	.main-image {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.main-image.active {
		opacity: 1;
	}

	.main-image-element {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}

	/* Navigation Buttons */
	.nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 3.5rem;
		height: 3.5rem;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		color: white;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.nav-button:hover {
		background: rgba(0, 0, 0, 0.6);
		transform: translateY(-50%) scale(1.15);
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
	}

	.nav-button:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.nav-button svg {
		width: 1.5rem;
		height: 1.5rem;
		stroke-width: 2.5;
	}

	.nav-prev {
		left: 1.5rem;
	}

	.nav-next {
		right: 1.5rem;
	}

	/* Image Counter */
	.image-counter {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.625rem 1.25rem;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
		color: white;
		font-size: 0.875rem;
		font-weight: 600;
		z-index: 10;
		letter-spacing: 0.05em;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}

	.counter-current {
		font-weight: 700;
		font-size: 1rem;
	}

	.counter-divider {
		color: rgba(255, 255, 255, 0.5);
		margin: 0 0.125rem;
	}

	.counter-total {
		color: rgba(255, 255, 255, 0.7);
	}

	/* Thumbnail Strip */
	.thumbnail-strip {
		display: flex;
		gap: 0.75rem;
		margin-top: 1.5rem;
		padding: 0.75rem;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}

	.thumbnail-strip::-webkit-scrollbar {
		height: 6px;
	}

	.thumbnail-strip::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 3px;
	}

	.thumbnail-strip::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
	}

	.thumbnail-strip::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}

	/* Thumbnail Item */
	.thumbnail-item {
		flex-shrink: 0;
		width: 6rem;
		height: 4rem;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 2px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
		background: rgba(0, 0, 0, 0.3);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.thumbnail-item::before {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s ease;
	}

	.thumbnail-item:hover::before {
		opacity: 0;
	}

	.thumbnail-item:focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.thumbnail-item.active {
		border-color: rgba(255, 255, 255, 0.4);
		box-shadow:
			0 0 24px rgba(255, 255, 255, 0.2),
			0 0 0 1px rgba(255, 255, 255, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		transform: translateY(-3px) scale(1.05);
	}

	.thumbnail-item.active::before {
		opacity: 0;
	}

	.thumbnail-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.main-image-wrapper {
			aspect-ratio: 4 / 3;
			border-radius: 1rem;
		}

		.nav-button {
			width: 3rem;
			height: 3rem;
		}

		.nav-button svg {
			width: 1.25rem;
			height: 1.25rem;
		}

		.nav-prev {
			left: 0.75rem;
		}

		.nav-next {
			right: 0.75rem;
		}

		.image-counter {
			top: 0.75rem;
			right: 0.75rem;
			padding: 0.5rem 1rem;
			font-size: 0.75rem;
		}

		.thumbnail-item {
			width: 5rem;
			height: 3.5rem;
			border-radius: 0.625rem;
		}

		.thumbnail-strip {
			gap: 0.5rem;
			padding: 0.5rem;
		}
	}

	@media (max-width: 480px) {
		.nav-button {
			width: 2.75rem;
			height: 2.75rem;
		}

		.nav-button svg {
			width: 1.125rem;
			height: 1.125rem;
		}

		.thumbnail-item {
			width: 4rem;
			height: 3rem;
			border-radius: 0.5rem;
		}
	}
</style>
