<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { ArrowRight } from '$lib/icons/lucide';

	interface Props {
		cta: {
			badge?: string;
			heading?: string;
			text?: string;
			getStarted?: string;
			getStartedLink?: string;
			exploreServices?: string;
			exploreLink?: string;
		};
		locale: string;
	}

	let { cta, locale }: Props = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}
</script>

{#if cta?.heading || cta?.text}
	<section class="portfolio-cta" aria-labelledby="cta-heading">
		<div class="cta-bg" aria-hidden="true">
			<div class="cta-orb cta-orb-1"></div>
			<div class="cta-orb cta-orb-2"></div>
			<div class="cta-orb cta-orb-3"></div>
		</div>

		<div class="container-base relative z-10">
			<div class="cta-content">
				{#if cta.badge}
					<span class="cta-badge">{cta.badge}</span>
				{/if}
				{#if cta.heading}
					<h2 id="cta-heading" class="cta-heading">{cta.heading}</h2>
				{/if}
				{#if cta.text}
					<p class="cta-text">{cta.text}</p>
				{/if}

				<div class="cta-actions">
					{#if cta.getStarted}
						<a href={resolve(cta.getStartedLink || '/contact')} class="cta-primary">
							<span>{cta.getStarted}</span>
							<ArrowRight class="w-4 h-4" />
						</a>
					{/if}
					{#if cta.exploreServices}
						<a href={resolve(cta.exploreLink || '/services')} class="cta-secondary">
							<span>{cta.exploreServices}</span>
							<ArrowRight class="w-4 h-4" />
						</a>
					{/if}
				</div>
			</div>
		</div>
	</section>
{/if}

<style>
	.portfolio-cta {
		position: relative;
		background: linear-gradient(
			135deg,
			#f1f5f9 0%,
			#c7d2fe 25%,
			#bae6fd 50%,
			#d1fae5 75%,
			#f1f5f9 100%
		);
		overflow: hidden;
		padding: 5rem 0;
	}

	:global(.dark) .portfolio-cta {
		background: linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e3a8a 100%);
	}

	.cta-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.cta-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.6;
	}

	.cta-orb-1 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
		top: -100px;
		right: -50px;
	}

	.cta-orb-2 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, #818cf8 0%, transparent 70%);
		bottom: -50px;
		left: -50px;
	}

	.cta-orb-3 {
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, #f472b6 0%, transparent 70%);
		top: 50%;
		left: 50%;
	}

	.cta-content {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.cta-badge {
		display: inline-block;
		padding: 0.5rem 1.25rem;
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
		color: #0369a1;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 1.5rem;
	}

	:global(.dark) .cta-badge {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.12);
		color: #38bdf8;
	}

	.cta-heading {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 800;
		color: var(--color-gray-900);
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	:global(.dark) .cta-heading {
		color: white;
	}

	.cta-text {
		font-size: 1.125rem;
		color: var(--color-gray-600);
		margin-bottom: 2rem;
		line-height: 1.7;
	}

	:global(.dark) .cta-text {
		color: rgba(255, 255, 255, 0.7);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		color: white;
		font-weight: 600;
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
	}

	.cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
	}

	.cta-primary span {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cta-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.9);
		color: var(--color-gray-700);
		font-weight: 600;
		border-radius: 9999px;
		text-decoration: none;
		border: 2px solid rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
	}

	.cta-secondary span {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.dark) .cta-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 2px solid rgba(255, 255, 255, 0.3);
	}

	.cta-secondary:hover {
		transform: translateY(-2px);
	}

	:global(.dark) .cta-secondary:hover {
		background: rgba(255, 255, 255, 0.15);
	}
</style>
