<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import ShareBar from '$lib/components/ui/misc/ShareBar.svelte';
	import BlogContent from '$lib/components/ui/content/BlogContent.svelte';
	import AuthorCard from '$lib/components/ui/card/AuthorCard.svelte';
	import TableOfContents from '$lib/components/ui/navigation/TableOfContents.svelte';
	import type { TocItem } from '$lib/utils/toc';

	interface Props {
		copied: boolean;
		oncopy: () => void;
		onshareTwitter: () => void;
		onshareLinkedIn: () => void;
		onshareFacebook: () => void;
		onshareWhatsApp: () => void;
		onshareTelegram: () => void;
		onshareThreads: () => void;
		onshareEmail: () => void;
		shareTitle: string;
		content: any[];
		tags: string[];
		author: { name: string; role: string; bio: string; avatar: string };
		writtenByLabel: string;
		tableOfContents: TocItem[];
		activeTocId: string;
		onTocClick: (headingId: string) => void;
		inThisArticleLabel: string;
	}

	let {
		copied,
		oncopy,
		onshareTwitter,
		onshareLinkedIn,
		onshareFacebook,
		onshareWhatsApp,
		onshareTelegram,
		onshareThreads,
		onshareEmail,
		shareTitle,
		content,
		tags,
		author,
		writtenByLabel,
		tableOfContents,
		activeTocId,
		onTocClick,
		inThisArticleLabel
	}: Props = $props();
</script>

<div class="article-layout">
	<div class="share-column">
		<ShareBar
			{copied}
			{oncopy}
			{onshareTwitter}
			{onshareLinkedIn}
			{onshareFacebook}
			{onshareWhatsApp}
			{onshareTelegram}
			{onshareThreads}
			{onshareEmail}
			{shareTitle}
			showMobile={true}
		/>
	</div>

	<div class="article-main">
		<BlogContent {content} {tags} />
		<AuthorCard {author} {writtenByLabel} />
	</div>

	{#if tableOfContents.length > 0}
		<aside class="right-sidebar">
			<div class="sidebar-sticky">
				<TableOfContents
					items={tableOfContents}
					title={inThisArticleLabel}
					activeId={activeTocId}
					onclick={onTocClick}
				/>
			</div>
		</aside>
	{/if}
</div>

<style>
	.article-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 900px;
		margin: 0 auto;
	}

	@media (min-width: 1200px) {
		.article-layout {
			grid-template-columns: 80px 1fr 240px;
			max-width: 1200px;
			gap: 3rem;
		}
	}

	.share-column {
		display: none;
	}

	@media (min-width: 1200px) {
		.share-column {
			display: block;
		}
	}

	.article-main {
		min-width: 0;
	}

	.right-sidebar {
		display: none;
	}

	@media (min-width: 1200px) {
		.right-sidebar {
			display: block;
		}
	}

	.sidebar-sticky {
		position: sticky;
		top: 8rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	:global(.article-section) {
		background: white;
		padding: 3rem 0 5rem;
	}

	:global(.dark) :global(.article-section) {
		background: var(--color-bg);
	}
</style>
