<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { ChevronRight, Home } from '$lib/icons/lucide';

	interface BreadcrumbItem {
		name: string;
		url: string;
	}

	interface Props {
		items?: BreadcrumbItem[];
		class?: string;
		showIcon?: boolean;
		locale?: string;
	}

	let { items = [], class: className = '', showIcon = true, locale = 'en' }: Props = $props();

	// Resolve path with locale prefix
	function resolve(path: string): string {
		return resolvePath(path, locale);
	}
</script>

{#if items && items.length > 0}
	<nav class="flex items-center flex-wrap gap-x-2 gap-y-1.5 {className}" aria-label="Breadcrumb">
		{#each items as item, i (item.url)}
			{@const isLast = i === items.length - 1}
			{#if i > 0}
				<ChevronRight
					class="w-4 h-4 text-gray-900 dark:text-gray-400 shrink-0"
					aria-hidden="true"
				/>
			{/if}

			<div class="flex items-center gap-1.5 min-w-0">
				{#if i === 0 && showIcon}
					<Home class="w-4 h-4 shrink-0" aria-hidden="true" />
				{/if}

				{#if isLast}
					<span class="text-sm font-medium truncate py-0.5">
						{item.name}
					</span>
				{:else}
					<a
						href={resolve(item.url)}
						class="text-sm hover:text-gray-700 dark:hover:text-gray-600 transition-colors truncate py-0.5"
					>
						{item.name}
					</a>
				{/if}
			</div>
		{/each}
	</nav>
{/if}
