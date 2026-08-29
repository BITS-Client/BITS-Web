<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	/* eslint-disable svelte/no-at-html-tags */
	interface Props {
		content: any[];
		tags?: string[];
	}

	let { content, tags = [] }: Props = $props();

	function blocksToHtml(blocks: any[]): string {
		if (!blocks || !Array.isArray(blocks)) return '';

		return blocks
			.map((block: any) => {
				if (block._type === 'block' && block.style && block.children) {
					const text = block.children.map((c: any) => c.text).join('');
					const id = text
						.toLowerCase()
						.replace(/[^\w\s-]/g, '')
						.replace(/\s+/g, '-');

					const tag = block.style.startsWith('h') ? block.style : 'p';
					return `<${tag} id="${id}" class="toc-heading">${text}</${tag}>`;
				}
				return '';
			})
			.filter(Boolean)
			.join('');
	}
</script>

<div class="blog-content">
	<div class="article-content prose">
		{#if content}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html blocksToHtml(content)}
		{/if}
	</div>

	{#if tags.length > 0}
		<div class="tags-section">
			<div class="tags-list">
				{#each tags as tag (tag)}
					<span class="tag-link">{tag}</span>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.blog-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.article-content.prose {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--color-gray-700);
	}

	:global(.dark) .article-content.prose {
		color: var(--color-gray-300);
	}

	.article-content.prose :global(h2) {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-gray-900);
		margin-top: 3rem;
		margin-bottom: 1.25rem;
		scroll-margin-top: 100px;
	}

	:global(.dark) .article-content.prose :global(h2) {
		color: white;
	}

	.article-content.prose :global(h3) {
		font-size: 1.375rem;
		font-weight: 600;
		color: var(--color-gray-900);
		margin-top: 2rem;
		margin-bottom: 1rem;
		scroll-margin-top: 100px;
	}

	:global(.dark) .article-content.prose :global(h3) {
		color: white;
	}

	.article-content.prose :global(h4) {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-gray-900);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		scroll-margin-top: 100px;
	}

	:global(.dark) .article-content.prose :global(h4) {
		color: white;
	}

	.article-content.prose :global(p) {
		margin-bottom: 1.5rem;
	}

	.article-content.prose :global(ul),
	.article-content.prose :global(ol) {
		margin-bottom: 1.5rem;
		padding-left: 1.5rem;
	}

	.article-content.prose :global(li) {
		margin-bottom: 0.5rem;
	}

	.article-content.prose :global(strong) {
		font-weight: 600;
		color: var(--color-gray-900);
	}

	:global(.dark) .article-content.prose :global(strong) {
		color: white;
	}

	.article-content.prose :global(a) {
		color: var(--color-primary);
		text-decoration: underline;
	}

	.tags-section {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-gray-200);
	}

	:global(.dark) .tags-section {
		border-color: var(--color-gray-700);
	}

	.tags-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag-link {
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		background: var(--color-gray-100);
		font-size: 0.875rem;
		color: var(--color-gray-600);
		transition: all 0.2s ease;
		border: 1px solid var(--color-gray-300);
	}

	:global(.dark) .tag-link {
		background: var(--color-bg-secondary);
		color: var(--color-gray-400);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.tag-link:hover {
		background: var(--color-primary);
		color: white;
	}
</style>
