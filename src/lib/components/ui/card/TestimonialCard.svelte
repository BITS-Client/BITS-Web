<script lang="ts">
	import { resolvePath } from '$lib/utils';

	interface TestimonialItem {
		id: number;
		name: string;
		content: string;
		projectTitle: string;
		projectSlug: string;
		clientIcon?: string;
	}

	interface Props {
		testimonial: TestimonialItem;
		locale: 'id' | 'en';
		_index: number;
	}

	let { testimonial, locale, _index }: Props = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}
</script>

<div class="testimonial-card">
	<div class="testimonial-card-bg-glow"></div>
	<div class="testimonial-card-holographic"></div>
	<div class="testimonial-card-glow"></div>
	<div class="testimonial-card-border"></div>
	<div class="testimonial-card-shine"></div>
	<div class="testimonial-card-inner">
		<div class="testimonial-bubble-accent"></div>

		<div class="testimonial-content">
			<p class="testimonial-message">
				"{testimonial.content}"
			</p>
		</div>

		<div class="testimonial-author">
			{#if testimonial.clientIcon}
				<img src={testimonial.clientIcon} alt={testimonial.name} class="testimonial-client-icon" />
			{:else}
				<div class="testimonial-avatar">
					<span class="testimonial-avatar-initial">{testimonial.name.charAt(0)}</span>
				</div>
			{/if}

			<div class="testimonial-info">
				<span class="testimonial-name">{testimonial.name}</span>
				<div class="testimonial-meta">
					<span class="testimonial-project-name">{testimonial.projectTitle}</span>
				</div>
			</div>

			<a
				href={resolve(`/portfolio/${testimonial.projectSlug}`)}
				class="testimonial-arrow"
				aria-label="View project"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
	.testimonial-card {
		position: relative;
		border-radius: 1.25rem;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.testimonial-card:hover {
		transform: translateY(-8px);
	}

	.testimonial-card::before {
		content: '';
		position: absolute;
		inset: 0;
		padding: 1px;
		background: linear-gradient(
			135deg,
			rgba(59, 130, 246, 0.4),
			rgba(139, 92, 246, 0.3),
			rgba(16, 185, 129, 0.3)
		);
		border-radius: 1.25rem;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0.5;
		transition: opacity 0.3s ease;
		z-index: 2;
	}

	.testimonial-card:hover::before {
		opacity: 1;
	}

	:global(:root.dark) .testimonial-card::before {
		background: linear-gradient(
			135deg,
			rgba(96, 165, 250, 0.5),
			rgba(167, 139, 250, 0.4),
			rgba(52, 211, 153, 0.4)
		);
	}

	.testimonial-card-inner {
		position: relative;
		height: 100%;
		min-height: 240px;
		display: flex;
		flex-direction: column;
		background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
		border-radius: 1.25rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow:
			0 4px 8px -2px rgba(0, 0, 0, 0.1),
			0 12px 24px -4px rgba(0, 0, 0, 0.1),
			0 2px 4px rgba(0, 0, 0, 0.06);
		overflow: hidden;
		transition: all 0.3s ease;
	}

	:global(:root.dark) .testimonial-card-inner {
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.3),
			0 10px 15px -3px rgba(0, 0, 0, 0.2),
			0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.testimonial-card:hover .testimonial-card-inner {
		box-shadow:
			0 24px 48px -8px rgba(0, 0, 0, 0.15),
			0 16px 24px -8px rgba(0, 0, 0, 0.1),
			0 0 0 1px rgba(59, 130, 246, 0.15);
	}

	:global(:root.dark) .testimonial-card:hover .testimonial-card-inner {
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.4),
			0 15px 10px -5px rgba(0, 0, 0, 0.2),
			0 0 0 1px rgba(96, 165, 250, 0.15);
	}

	.testimonial-bubble-accent {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, var(--color-primary), #8b5cf6, var(--color-secondary));
		border-radius: 1.25rem 1.25rem 0 0;
	}

	.testimonial-bubble-accent::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 6px solid var(--color-primary);
	}

	:global(:root.dark) .testimonial-bubble-accent::after {
		border-top-color: #60a5fa;
	}

	.testimonial-content {
		position: relative;
		z-index: 2;
		flex: 1;
		margin: 1rem;
		padding: 1.25rem 1rem;
		background: white;
		border-radius: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.06),
			inset 0 0 0 1px rgba(0, 0, 0, 0.03);
	}

	.testimonial-content::before {
		content: '';
		position: absolute;
		top: -8px;
		left: 1.5rem;
		width: 0;
		height: 0;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 8px solid white;
	}

	:global(:root.dark) .testimonial-content {
		background: #0f172a;
		border-color: rgba(255, 255, 255, 0.08);
	}

	:global(:root.dark) .testimonial-content::before {
		border-bottom-color: #0f172a;
	}

	.testimonial-message {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: #475569;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(:root.dark) .testimonial-message {
		color: rgba(255, 255, 255, 0.8);
	}

	.testimonial-author {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0 1rem 1rem 1rem;
	}

	.testimonial-avatar {
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
	}

	.testimonial-avatar-initial {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		text-transform: uppercase;
	}

	.testimonial-client-icon {
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		object-fit: cover;
		flex-shrink: 0;
		border: 2px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.testimonial-info {
		flex: 1;
		min-width: 0;
	}

	.testimonial-name {
		display: block;
		font-size: 0.9375rem;
		font-weight: 700;
		color: #1e293b;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.2;
		margin-bottom: 0.25rem;
		transition: color 0.3s ease;
	}

	:global(:root.dark) .testimonial-name {
		color: white;
	}

	.testimonial-card:hover .testimonial-name {
		color: var(--color-primary);
	}

	.testimonial-meta {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: #64748b;
		flex-wrap: wrap;
	}

	:global(:root.dark) .testimonial-meta {
		color: rgba(255, 255, 255, 0.6);
	}

	.testimonial-project-name {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.testimonial-arrow {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(59, 130, 246, 0.1);
		border-radius: 50%;
		color: var(--color-primary);
		opacity: 0.9;
		transition: all 0.3s ease;
	}

	.testimonial-card:hover .testimonial-arrow {
		background: var(--color-primary);
		color: white;
		opacity: 1;
		transform: translateX(3px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}
</style>
