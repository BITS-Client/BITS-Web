<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { ListOrdered, ChevronRight } from '$lib/icons/lucide';

	export interface TocItem {
		level: number;
		text: string;
		id: string;
	}

	interface Props {
		items: TocItem[];
		title: string;
		activeId: string;
		onclick: (headingId: string) => void;
	}

	let { items, title, activeId, onclick }: Props = $props();

	function handleClick(e: Event) {
		const button = e.currentTarget as HTMLButtonElement;
		const headingId = button.dataset.headingId;
		if (headingId) {
			onclick(headingId);
		}
	}

	function isActive(headingId: string) {
		return activeId === headingId;
	}

	export function extractHeadingsFromBlocks(blocks: any[]): TocItem[] {
		if (!blocks || !Array.isArray(blocks)) return [];

		const headings: TocItem[] = [];

		blocks.forEach((block: any) => {
			if (block._type === 'block' && block.style && block.style.startsWith('h') && block.children) {
				const text = block.children.map((c: any) => c.text).join('');
				const id = text
					.toLowerCase()
					.replace(/[^\w\s-]/g, '')
					.replace(/\s+/g, '-');
				const level = parseInt(block.style.replace('h', ''));

				headings.push({ level, text, id });
			}
		});

		return headings;
	}
</script>

<div class="toc-card">
	<div class="toc-header">
		<ListOrdered class="w-5 h-5" />
		<h3>{title}</h3>
	</div>
	<nav class="toc-nav">
		{#each items as item (item.id)}
			<button
				class="toc-item"
				class:active={isActive(item.id)}
				data-heading-id={item.id}
				onclick={handleClick}
			>
				<span class="toc-text">{item.text}</span>
				<ChevronRight class="toc-arrow w-4 h-4" />
			</button>
		{/each}
	</nav>
</div>

<style>
	.toc-card {
		background: #ffffff;
		border-radius: 1rem;
		padding: 1.5rem;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.08),
			0 8px 10px -6px rgba(0, 0, 0, 0.05);
		border: 1px solid #94a3b8;
	}

	:global(.dark) .toc-card {
		background: var(--color-bg-secondary);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow: none;
	}

	.toc-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid var(--color-gray-200);
		color: var(--color-gray-900);
		font-weight: 600;
	}

	:global(.dark) .toc-header {
		border-color: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.toc-header h3 {
		font-size: 0.875rem;
		font-weight: 700;
	}

	.toc-nav {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.toc-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 0.75rem;
		border-radius: 0.5rem;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
		width: 100%;
	}

	.toc-item:hover {
		background: var(--color-gray-100);
	}

	:global(.dark) .toc-item:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	.toc-item.active {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
	}

	:global(.dark) .toc-item.active {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
	}

	.toc-text {
		flex: 1;
		font-size: 0.8125rem;
		color: var(--color-gray-700);
		transition: color 0.2s ease;
	}

	:global(.dark) .toc-text {
		color: #e2e8f0;
	}

	.toc-item.active .toc-text {
		color: var(--color-primary);
		font-weight: 500;
	}

	:global(.dark) .toc-item.active .toc-text {
		color: #60a5fa;
	}

	:global(.toc-arrow) {
		opacity: 0;
		transform: translateX(-4px);
		transition: all 0.2s ease;
		color: var(--color-primary);
		width: 1rem;
		height: 1rem;
	}

	:global(.toc-item:hover .toc-arrow),
	:global(.toc-item.active .toc-arrow) {
		opacity: 1;
		transform: translateX(0);
	}
</style>
