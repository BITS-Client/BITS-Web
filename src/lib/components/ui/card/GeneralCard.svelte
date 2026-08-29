<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { ArrowRight, Building } from '$lib/icons/lucide';

	interface Props {
		project: {
			slug: string;
			title: string;
			client: string;
			clientIcon: string;
			description: string;
			image?: string;
			category: string;
			techStack: string[];
			featured: boolean;
			year?: string;
		};
		categoryLabel: string;
		index: number;
		locale?: string;
		color?: string;
		type?: 'blog' | 'portfolio';
	}

	let {
		project,
		categoryLabel,
		index,
		locale = 'id',
		color = 'from-blue-500 via-purple-500 to-pink-500',
		type = 'portfolio'
	}: Props = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}
</script>

<a href={resolve(`/${type}/${project.slug}`)} class="portfolio-card" style="--index: {index}">
	<div class="portfolio-card-inner">
		<div class="portfolio-card-gradient bg-linear-to-br {color}"></div>
		<div class="portfolio-card-gradient-overlay"></div>

		<div class="portfolio-card-image-wrapper">
			{#if project.image}
				<img src={project.image} alt={project.title} class="portfolio-card-image" loading="lazy" />
			{:else}
				<div class="portfolio-card-placeholder">
					<Building class="w-8 h-8" />
				</div>
			{/if}
		</div>

		<div class="portfolio-card-content">
			<div class="portfolio-card-top">
				<span class="portfolio-card-category">
					<span class="portfolio-category-dot"></span>
					{categoryLabel}
				</span>
				<div class="portfolio-card-arrow">
					<ArrowRight class="w-4 h-4" />
				</div>
			</div>

			<h3 class="portfolio-card-title">{project.title}</h3>

			{#if project.description}
				<p class="portfolio-card-description">{project.description}</p>
			{/if}

			{#if project.techStack.length > 0}
				<div class="portfolio-card-tech">
					{#each project.techStack.slice(0, 2) as tech (tech)}
						<span class="portfolio-tech-pill">{tech}</span>
					{/each}
					{#if project.techStack.length > 2}
						<span class="portfolio-tech-more">+{project.techStack.length - 2}</span>
					{/if}
				</div>
			{/if}

			<div class="portfolio-card-footer">
				<span class="portfolio-client">
					{#if project.clientIcon}
						<img src={project.clientIcon} alt={project.client} class="portfolio-client-icon" />
					{:else}
						<svg
							class="portfolio-client-icon"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M3 21h18M5 21V7l8-4v18M13 21V3l4 3v15M19 21V11l-4 3v7" />
						</svg>
					{/if}
					{project.client}
				</span>
				{#if project.year}
					<span class="portfolio-year">{project.year}</span>
				{/if}
			</div>
		</div>
	</div>
</a>

<style>
	.portfolio-card {
		position: relative;
		display: block;
		height: 100%;
		min-height: 260px;
		border-radius: 1.5rem;
		text-decoration: none;
		cursor: pointer;
		transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		animation: cardReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(var(--index) * 60ms);
		opacity: 0;
	}

	@keyframes cardReveal {
		to {
			opacity: 1;
		}
	}

	.portfolio-card:hover {
		transform: translateY(-6px) scale(1.01);
		z-index: 10;
	}

	.portfolio-card-inner {
		position: relative;
		height: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.98);
		border-radius: 1.5rem;
		border: 1px solid var(--color-gray-300);
		box-shadow:
			0 4px 8px -2px rgba(0, 0, 0, 0.1),
			0 12px 24px -4px rgba(0, 0, 0, 0.12),
			0 24px 48px -8px rgba(0, 0, 0, 0.08);
		overflow: hidden;
	}

	:global(.dark) .portfolio-card-inner {
		background: rgba(15, 23, 42, 0.95);
		border-color: rgba(255, 255, 255, 0.15);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.3),
			0 10px 15px -3px rgba(0, 0, 0, 0.3),
			0 20px 25px -5px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.portfolio-card-gradient {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.portfolio-card:hover .portfolio-card-gradient {
		opacity: 0.08;
	}

	:global(.dark) .portfolio-card-gradient {
		opacity: 0.05;
	}

	:global(.dark) .portfolio-card:hover .portfolio-card-gradient {
		opacity: 0.15;
	}

	.portfolio-card-gradient-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
	}

	.portfolio-card:hover .portfolio-card-inner {
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.2),
			0 16px 32px -8px rgba(0, 0, 0, 0.15);
		transform: translateY(-4px);
	}

	:global(.dark) .portfolio-card:hover .portfolio-card-inner {
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 12px 24px -8px rgba(0, 0, 0, 0.4);
	}

	.portfolio-card-image-wrapper {
		position: relative;
		height: 140px;
		overflow: hidden;
	}

	.portfolio-card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.portfolio-card:hover .portfolio-card-image {
		transform: scale(1.05);
	}

	.portfolio-card-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
		color: #3b82f6;
	}

	.portfolio-card-content {
		padding: 1rem;
	}

	.portfolio-card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.portfolio-card-category {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-gray-600);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	:global(.dark) .portfolio-card-category {
		color: rgba(255, 255, 255, 0.6);
	}

	.portfolio-category-dot {
		width: 6px;
		height: 6px;
		background: linear-gradient(135deg, #22c55e, #3b82f6);
		border-radius: 50%;
	}

	.portfolio-card-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 50%;
		color: var(--color-gray-600);
		transition: all 0.3s ease;
	}

	:global(.dark) .portfolio-card-arrow {
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.6);
	}

	.portfolio-card:hover .portfolio-card-arrow {
		background: #22c55e;
		color: white;
		transform: translateX(3px);
	}

	.portfolio-card-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-gray-900);
		margin-bottom: 0.375rem;
		line-height: 1.3;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .portfolio-card-title {
		color: white;
	}

	.portfolio-card-description {
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--color-gray-600);
		margin-bottom: 0.75rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.dark) .portfolio-card-description {
		color: rgba(255, 255, 255, 0.6);
	}

	.portfolio-card-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
	}

	.portfolio-tech-pill {
		padding: 0.2rem 0.5rem;
		font-size: 0.6875rem;
		font-weight: 500;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 9999px;
		color: var(--color-gray-600);
	}

	:global(.dark) .portfolio-tech-pill {
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.6);
	}

	.portfolio-tech-more {
		font-weight: 600;
	}

	.portfolio-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	:global(.dark) .portfolio-card-footer {
		border-color: rgba(255, 255, 255, 0.06);
	}

	.portfolio-client {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-gray-700);
	}

	:global(.dark) .portfolio-client {
		color: rgba(255, 255, 255, 0.8);
	}

	.portfolio-client-icon {
		width: 18px;
		height: 18px;
		object-fit: cover;
		border-radius: 50%;
	}

	.portfolio-year {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-gray-500);
	}

	:global(.dark) .portfolio-year {
		color: rgba(255, 255, 255, 0.4);
	}

	@media (prefers-reduced-motion: reduce) {
		.portfolio-card {
			animation: none;
			opacity: 1;
		}

		.portfolio-card:hover {
			transform: none;
		}

		.portfolio-card-image {
			transition: none;
		}
	}
</style>
