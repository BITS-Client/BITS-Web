<script lang="ts">
	import { Home } from '$lib/icons/lucide';
	import { page } from '$app/stores';

	interface Props {
		title: string;
		description: string;
		buttonLabel?: string;
		href?: string;
	}

	let {
		title,
		description,
		buttonLabel = 'Back to Home',
		href = `/${$page.params.lang || 'id'}`
	}: Props = $props();
</script>

<section class="not-found">
	<div class="container-base">
		<div class="not-found-content">
			<div class="not-found-icon">📄</div>
			<h1 class="not-found-title">{title}</h1>
			<p class="not-found-text">{description}</p>
			<a {href} class="not-found-btn primary">
				<Home class="w-5 h-5" />
				<span>{buttonLabel}</span>
			</a>
		</div>
	</div>
</section>

<style>
	.not-found {
		padding: 6rem 0;
		background: white;
		min-height: 60vh;
		display: flex;
		align-items: center;
	}

	:global(.dark) .not-found {
		background: var(--color-bg);
	}

	.not-found-content {
		text-align: center;
		max-width: 480px;
		margin: 0 auto;
	}

	.not-found-icon {
		font-size: 4rem;
		margin-bottom: 1.5rem;
	}

	.not-found-title {
		font-size: 2rem;
		font-weight: 800;
		color: var(--color-gray-900);
		margin-bottom: 1rem;
	}

	:global(.dark) .not-found-title {
		color: white;
	}

	.not-found-text {
		color: var(--color-gray-600);
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	:global(.dark) .not-found-text {
		color: var(--color-gray-400);
	}

	.not-found-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 0.9375rem;
		transition: all 0.3s ease;
		text-decoration: none;
		background: var(--color-primary);
		color: white;
	}

	.not-found-btn:hover {
		background: var(--color-primary-dark);
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
	}
</style>
