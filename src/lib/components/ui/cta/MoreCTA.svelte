<script lang="ts">
	import { ArrowRight } from '$lib/icons/lucide';

	interface Props {
		linkText?: string;
		href?: string;
		class?: string;
		onclick?: (event: MouseEvent) => void;
	}

	let { linkText, href = '#', class: className = '', onclick }: Props = $props();
</script>

{#if linkText}
	<div class="section-view-all {className}">
		<a {href} class="section-view-all-link" {onclick}>
			{linkText}
			<ArrowRight class="w-4 h-4" />
		</a>
	</div>
{/if}

<style>
	.section-view-all {
		display: flex;
		justify-content: center;
		margin-top: 2.5rem;
	}

	.section-view-all-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		background: linear-gradient(
			135deg,
			rgba(224, 242, 254, 0.9) 0%,
			rgba(219, 234, 254, 0.85) 50%,
			rgba(240, 253, 244, 0.9) 100%
		);
		color: #3b82f6;
		border: 2px solid rgba(59, 130, 246, 0.3);
		border-radius: 9999px;
		transition: all 0.3s ease;
	}

	.section-view-all-link:hover {
		transform: translateY(-2px);
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.15));
		border-color: rgba(59, 130, 246, 0.5);
	}

	:global(:root.dark) .section-view-all-link {
		background: linear-gradient(
			135deg,
			rgba(15, 23, 42, 0.9) 0%,
			rgba(30, 27, 75, 0.85) 50%,
			rgba(15, 23, 42, 0.9) 100%
		);
		color: #60a5fa;
		border-color: rgba(96, 165, 250, 0.3);
	}

	:global(:root.dark) .section-view-all-link:hover {
		background: linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.15));
		border-color: rgba(96, 165, 250, 0.6);
	}
</style>
