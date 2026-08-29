<script lang="ts">
	import { ArrowRight, Calendar, Eye } from '$lib/icons/lucide';

	interface BlogPost {
		slug: string;
		title: string;
		excerpt: string;
		category: string;
		categoryLabel: string;
		categoryColor: string;
		image: string;
		author: { name: string; role: string; avatar: string };
		tags: string[];
		date: string;
	}

	interface Props {
		post: BlogPost;
		locale: string;
		onclick?: () => void;
	}

	let { post, locale, onclick }: Props = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function resolve(path: string): string {
		return `/${locale}${path}`;
	}
</script>

<article class="article-row" style="--card-color: {post.categoryColor}">
	<a href={resolve(`/blog/${post.slug}`)} class="row-link" {onclick}>
		<div class="row-image">
			{#if post.image}
				<img src={post.image} alt={post.title} loading="lazy" class="row-image-content" />
			{:else}
				<div class="row-placeholder">
					<span class="row-placeholder-icon">📖</span>
				</div>
			{/if}
			<div class="row-overlay">
				<Eye class="w-5 h-5" />
			</div>
		</div>

		<div class="row-content">
			<div class="row-header">
				<span class="row-category" style="--cat-color: {post.categoryColor}">
					{post.categoryLabel}
				</span>
				<div class="row-meta">
					<span class="row-date">
						<Calendar class="w-3.5 h-3.5" />
						{formatDate(post.date)}
					</span>
				</div>
			</div>

			<h3 class="row-title">{post.title}</h3>
			<p class="row-excerpt">{post.excerpt}</p>

			<div class="row-footer">
				<div class="row-author">
					{#if post.author.avatar}
						<img
							src={post.author.avatar}
							alt={post.author.name}
							class="row-avatar-img"
							loading="lazy"
						/>
					{:else}
						<div class="row-avatar">
							<span>{post.author?.name?.charAt(0) || 'B'}</span>
						</div>
					{/if}
					<div class="row-author-info">
						<span class="row-author-name">{post.author.name}</span>
						<span class="row-author-role">{post.author.role}</span>
					</div>
				</div>
				<div class="row-tags">
					{#each post.tags.slice(0, 2) as tag (tag)}
						<span class="row-tag">#{tag}</span>
					{/each}
				</div>
			</div>
		</div>

		<div class="row-action">
			<div class="row-arrow">
				<ArrowRight class="w-full h-full" />
			</div>
		</div>
	</a>
</article>

<style>
	.article-row {
		background: white;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
	}

	:global(.dark) .article-row {
		background: var(--color-bg);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.article-row:hover {
		border-color: var(--card-color, var(--color-primary));
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
		transform: translateY(-4px);
	}

	:global(.dark) .article-row:hover {
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
	}

	.row-link {
		display: flex;
		align-items: stretch;
		gap: 1.25rem;
		padding: 1.25rem;
		height: 100%;
	}

	@media (max-width: 640px) {
		.row-link {
			flex-direction: column;
			gap: 1.25rem;
			padding: 1rem;
		}
	}

	.row-image {
		position: relative;
		width: 180px;
		flex-shrink: 0;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	@media (max-width: 640px) {
		.row-image {
			width: 100%;
			aspect-ratio: 16/9;
		}
	}

	.row-image-content {
		width: 100%;
		height: 100%;
		min-height: 120px;
		object-fit: cover;
		transition: transform 0.4s ease;
		display: block;
	}

	.row-placeholder {
		width: 100%;
		height: 100%;
		min-height: 120px;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--card-color, var(--color-primary)) 15%, transparent) 0%,
			color-mix(in srgb, var(--card-color, var(--color-primary)) 8%, transparent) 100%
		);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.4s ease;
	}

	.article-row:hover .row-image-content,
	.article-row:hover .row-placeholder {
		transform: scale(1.05);
	}

	.row-placeholder-icon {
		font-size: 2rem;
		opacity: 0.4;
	}

	.row-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			var(--card-color, var(--color-primary)) 0%,
			rgba(30, 64, 175, 0.95) 100%
		);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.article-row:hover .row-overlay {
		opacity: 1;
	}

	.row-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.row-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.625rem;
	}

	.row-category {
		padding: 0.25rem 0.625rem;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--cat-color, var(--color-primary)) 15%, transparent);
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--cat-color, var(--color-primary));
		text-transform: uppercase;
		letter-spacing: 0.04em;
		border: 1px solid color-mix(in srgb, var(--cat-color, var(--color-primary)) 50%, transparent);
	}

	.row-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: var(--color-gray-500);
	}

	.row-date {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.row-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-gray-900);
		line-height: 1.4;
		margin-bottom: 0.375rem;
		transition: color 0.3s ease;
	}

	:global(.dark) .row-title {
		color: white;
	}

	.article-row:hover .row-title {
		color: var(--card-color, var(--color-primary));
	}

	.row-excerpt {
		font-size: 0.875rem;
		color: var(--color-gray-600);
		line-height: 1.6;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		margin-bottom: 0.75rem;
	}

	:global(.dark) .row-excerpt {
		color: var(--color-gray-400);
	}

	.row-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: auto;
	}

	.row-author {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.row-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(
			135deg,
			var(--card-color, var(--color-primary)) 0%,
			color-mix(in srgb, var(--card-color, var(--color-primary)) 70%, #6366f1) 100%
		);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.row-avatar-img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.row-author-info {
		display: flex;
		flex-direction: column;
	}

	.row-author-name {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--color-gray-900);
	}

	:global(.dark) .row-author-name {
		color: white;
	}

	.row-author-role {
		font-size: 0.6875rem;
		color: var(--color-gray-500);
	}

	.row-tags {
		display: flex;
		gap: 0.375rem;
	}

	@media (max-width: 768px) {
		.row-tags {
			display: none;
		}
	}

	.row-tag {
		padding: 0.25rem 0.5rem;
		border-radius: 9999px;
		background: var(--color-gray-100);
		font-size: 0.6875rem;
		color: var(--color-gray-600);
		border: 1px solid var(--color-gray-300);
	}

	:global(.dark) .row-tag {
		background: var(--color-bg-secondary);
		color: var(--color-gray-400);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.row-action {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding: 0 0.5rem;
	}

	.row-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.625rem;
		border-radius: 50%;
		background: var(--color-gray-100);
		color: var(--color-gray-900);
		border: 1px solid #94a3b8;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	:global(.dark) .row-arrow {
		background: rgba(255, 255, 255, 0.05);
		color: white;
		border-color: rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 640px) {
		.row-action {
			position: absolute;
			bottom: 1.25rem;
			right: 1rem;
			padding: 0;
			z-index: 10;
		}

		.row-arrow {
			background: var(--card-color, var(--color-primary));
			color: white;
			border: none;
			box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
			width: 2.75rem;
			height: 2.75rem;
			padding: 0.65rem;
		}

		.row-footer {
			padding-right: 3rem;
		}
	}

	.article-row:hover .row-arrow {
		background: var(--card-color, var(--color-primary));
		color: white;
		border-color: var(--card-color, var(--color-primary));
		transform: rotate(-45deg) scale(1.1);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	}

	@media (max-width: 640px) {
		.article-row:hover .row-arrow {
			transform: rotate(-45deg) scale(1.1);
			box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
		}
	}
</style>
