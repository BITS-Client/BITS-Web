<script lang="ts">
	import { resolvePath } from '$lib/utils';
	import { getIconComponent } from '$lib/icons';
	import { Sparkles } from '$lib/icons/lucide';

	interface ServiceCardProps {
		service: {
			id: string;
			title: string;
			description: string;
			icon: string;
			href: string;
			color: string;
		};
		index: number;
		locale?: 'id' | 'en';
	}

	let { service, index, locale = 'id' }: ServiceCardProps = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}

	// Get icon component with sparkles as fallback
	const IconComponent = $derived(getIconComponent(service.icon) || Sparkles);
</script>

<a href={resolve(service.href)} class="service-card service-card-{index + 1} group">
	<div class="service-card-border"></div>

	<div class="service-card-bg-glow"></div>

	<div class="service-card-inner">
		<div class="service-card-gradient bg-gradient-to-br {service.color}"></div>

		<div class="service-card-holographic"></div>

		<div class="service-card-shimmer"></div>

		<div class="service-card-content">
			<div class="service-card-number">0{index + 1}</div>

			<div class="service-card-icon-wrapper">
				<div class="service-card-icon-ring service-card-icon-ring-outer"></div>
				<div class="service-card-icon-ring service-card-icon-ring-middle"></div>
				<div class="service-card-icon-ring service-card-icon-ring-inner"></div>
				<div class="service-card-icon-pulse"></div>
				<div class="service-card-icon">
					<IconComponent class="w-5 h-5" />
				</div>
			</div>

			<h3 class="service-card-title">{service.title}</h3>

			<p class="service-card-description">{service.description}</p>
		</div>

		<div class="service-card-progress">
			<div class="service-card-progress-bg"></div>
			<div class="service-card-progress-bar"></div>
			<div class="service-card-progress-glow"></div>
		</div>
	</div>

	<div class="service-card-shine"></div>

	<div class="service-card-reflection"></div>
</a>

<style>
	.service-card {
		position: relative;
		display: block;
		height: 100%;
		min-height: 260px;
		border-radius: 1.5rem;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		transform-style: preserve-3d;
		perspective: 1000px;
	}

	.service-card:hover {
		transform: translateY(-8px) scale(1.01);
		z-index: 10;
	}

	.service-card:focus {
		outline: none;
	}

	.service-card:focus-visible .service-card-inner {
		outline: 3px solid #ec4899;
		outline-offset: 4px;
	}

	:global(:root.dark) .service-card:focus-visible .service-card-inner {
		outline-color: #f472b6;
	}

	.service-card-border {
		position: absolute;
		inset: 0;
		padding: 2px;
		border-radius: 1.5rem;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.06));
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0.8;
		transition: all 0.4s ease;
	}

	:global(:root.dark) .service-card-border {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02));
	}

	.service-card:hover .service-card-border {
		opacity: 1;
	}

	.service-card-1:hover .service-card-border {
		background: linear-gradient(135deg, #ec4899, #f43f5e);
	}

	.service-card-2:hover .service-card-border {
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
	}

	.service-card-3:hover .service-card-border {
		background: linear-gradient(135deg, #10b981, #14b8a6);
	}

	.service-card-4:hover .service-card-border {
		background: linear-gradient(135deg, #8b5cf6, #a855f7);
	}

	.service-card-5:hover .service-card-border {
		background: linear-gradient(135deg, #14b8a6, #06b6d4);
	}

	.service-card-6:hover .service-card-border {
		background: linear-gradient(135deg, #f43f5e, #ec4899);
	}

	.service-card-bg-glow {
		position: absolute;
		inset: -2px;
		border-radius: 1.75rem;
		opacity: 0;
		filter: blur(16px);
		transition: opacity 0.5s ease;
		z-index: -1;
	}

	.service-card:hover .service-card-bg-glow {
		opacity: 0.5;
	}

	:global(:root.dark) .service-card:hover .service-card-bg-glow {
		opacity: 0.7;
	}

	.service-card-1 .service-card-bg-glow {
		background: linear-gradient(135deg, #ec4899, #f43f5e);
	}

	.service-card-2 .service-card-bg-glow {
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
	}

	.service-card-3 .service-card-bg-glow {
		background: linear-gradient(135deg, #10b981, #14b8a6);
	}

	.service-card-4 .service-card-bg-glow {
		background: linear-gradient(135deg, #8b5cf6, #a855f7);
	}

	.service-card-5 .service-card-bg-glow {
		background: linear-gradient(135deg, #14b8a6, #06b6d4);
	}

	.service-card-6 .service-card-bg-glow {
		background: linear-gradient(135deg, #f43f5e, #ec4899);
	}

	.service-card-inner {
		position: relative;
		height: 100%;
		padding: 1.25rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-radius: 1.5rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow:
			0 4px 8px -2px rgba(0, 0, 0, 0.1),
			0 12px 24px -4px rgba(0, 0, 0, 0.12),
			0 24px 48px -8px rgba(0, 0, 0, 0.08);
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		overflow: hidden;
	}

	:global(:root.dark) .service-card-inner {
		background: rgba(15, 23, 42, 0.8);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.3),
			0 10px 15px -3px rgba(0, 0, 0, 0.3),
			0 20px 25px -5px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.service-card:hover .service-card-inner {
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.2),
			0 16px 32px -8px rgba(0, 0, 0, 0.15);
	}

	:global(:root.dark) .service-card:hover .service-card-inner {
		background: rgba(15, 23, 42, 0.95);
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 12px 24px -8px rgba(0, 0, 0, 0.4);
	}

	.service-card-gradient {
		position: absolute;
		inset: 0;
		opacity: 0.05;
		transition: opacity 0.5s ease;
	}

	.service-card:hover .service-card-gradient {
		opacity: 0.12;
	}

	:global(:root.dark) .service-card-gradient {
		opacity: 0.08;
	}

	:global(:root.dark) .service-card:hover .service-card-gradient {
		opacity: 0.2;
	}

	.service-card-holographic {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			transparent 0%,
			rgba(255, 255, 255, 0.05) 40%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.05) 60%,
			transparent 100%
		);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
	}

	.service-card:hover .service-card-holographic {
		opacity: 1;
	}

	:global(:root.dark) .service-card-holographic {
		background: linear-gradient(
			135deg,
			transparent 0%,
			rgba(96, 165, 250, 0.05) 40%,
			rgba(139, 92, 246, 0.08) 50%,
			rgba(52, 211, 153, 0.05) 60%,
			transparent 100%
		);
	}

	.service-card-shimmer {
		position: absolute;
		top: 0;
		left: -100%;
		width: 60%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.3),
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.3),
			transparent
		);
		transform: skewX(-25deg);
		transition: left 0.8s cubic-bezier(0.23, 1, 0.32, 1);
		pointer-events: none;
	}

	:global(:root.dark) .service-card-shimmer {
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.1),
			transparent
		);
	}

	.service-card:hover .service-card-shimmer {
		left: 160%;
	}

	.service-card-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.service-card-number {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 3.5rem;
		font-weight: 900;
		color: rgba(0, 0, 0, 0.03);
		line-height: 1;
		transition: all 0.5s ease;
		pointer-events: none;
	}

	:global(:root.dark) .service-card-number {
		color: rgba(255, 255, 255, 0.03);
	}

	.service-card:hover .service-card-number {
		color: rgba(0, 0, 0, 0.06);
		transform: scale(1.1);
	}

	:global(:root.dark) .service-card:hover .service-card-number {
		color: rgba(255, 255, 255, 0.06);
	}

	.service-card-1:hover .service-card-number {
		color: rgba(236, 72, 153, 0.1);
	}

	.service-card-2:hover .service-card-number {
		color: rgba(59, 130, 246, 0.1);
	}

	.service-card-3:hover .service-card-number {
		color: rgba(16, 185, 129, 0.1);
	}

	.service-card-4:hover .service-card-number {
		color: rgba(139, 92, 246, 0.1);
	}

	.service-card-5:hover .service-card-number {
		color: rgba(20, 184, 166, 0.1);
	}

	.service-card-6:hover .service-card-number {
		color: rgba(244, 63, 94, 0.1);
	}

	.service-card-icon-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		margin-bottom: 1rem;
	}

	.service-card-icon-ring {
		position: absolute;
		border-radius: 50%;
		border: 2px solid rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease;
	}

	:global(:root.dark) .service-card-icon-ring {
		border-color: rgba(255, 255, 255, 0.08);
	}

	.service-card-icon-ring-outer {
		inset: -6px;
		border-width: 2px;
	}

	.service-card-icon-ring-middle {
		inset: -3px;
		border-width: 2px;
		border-color: rgba(0, 0, 0, 0.25);
	}

	.service-card-icon-ring-inner {
		inset: 0;
		border-width: 2px;
		border-color: rgba(0, 0, 0, 0.3);
	}

	.service-card:hover .service-card-icon-ring-outer {
		border-color: rgba(0, 0, 0, 0.4);
	}

	:global(:root.dark) .service-card:hover .service-card-icon-ring-outer {
		border-color: rgba(255, 255, 255, 0.3);
	}

	.service-card-icon-pulse {
		position: absolute;
		inset: -12px;
		border-radius: 50%;
		border: 1px solid currentColor;
		opacity: 0;
		animation: service-icon-pulse 2s ease-out infinite;
	}

	.service-card-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: rgba(0, 0, 0, 0.15);
		border: 2px solid rgba(0, 0, 0, 0.25);
		border-radius: 50%;
		color: var(--color-gray-700);
		transition: all 0.5s ease;
	}

	:global(:root.dark) .service-card-icon {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.9);
	}

	.service-card:hover .service-card-icon {
		background: transparent;
		border-color: transparent;
	}

	.service-card-1 .service-card-icon {
		color: #ec4899;
	}

	.service-card-2 .service-card-icon {
		color: #3b82f6;
	}

	.service-card-3 .service-card-icon {
		color: #10b981;
	}

	.service-card-4 .service-card-icon {
		color: #8b5cf6;
	}

	.service-card-5 .service-card-icon {
		color: #14b8a6;
	}

	.service-card-6 .service-card-icon {
		color: #f43f5e;
	}

	@keyframes service-icon-pulse {
		0% {
			transform: scale(0.8);
			opacity: 0.5;
		}
		100% {
			transform: scale(1.2);
			opacity: 0;
		}
	}

	.service-card-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--color-gray-900);
		margin-bottom: 0.5rem;
		line-height: 1.3;
	}

	:global(:root.dark) .service-card-title {
		color: white;
	}

	.service-card-description {
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--color-gray-600);
		flex: 1;
		margin-bottom: 1.5rem;
	}

	:global(:root.dark) .service-card-description {
		color: rgba(255, 255, 255, 0.6);
	}

	.service-card-progress {
		position: absolute;
		bottom: 1.25rem;
		left: 1.5rem;
		right: 1.5rem;
	}

	.service-card-progress-bg {
		height: 3px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 2px;
		overflow: hidden;
	}

	:global(:root.dark) .service-card-progress-bg {
		background: rgba(255, 255, 255, 0.06);
	}

	.service-card-progress-bar {
		height: 100%;
		width: 0;
		background: linear-gradient(90deg, #ec4899, #8b5cf6);
		border-radius: 2px;
		transition: width 1s ease;
	}

	.service-card:hover .service-card-progress-bar {
		width: 100%;
	}

	.service-card-progress-glow {
		position: absolute;
		top: 50%;
		right: 0;
		width: 20px;
		height: 20px;
		background: linear-gradient(90deg, rgba(236, 72, 153, 0.8), rgba(139, 92, 246, 0.8));
		border-radius: 50%;
		transform: translateY(-50%) scale(0);
		filter: blur(4px);
		opacity: 0;
		transition: all 0.5s ease;
		transition-delay: 0.3s;
	}

	.service-card:hover .service-card-progress-glow {
		transform: translateY(-50%) scale(1);
		opacity: 1;
	}

	.service-card-shine {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background: linear-gradient(to top, rgba(255, 255, 255, 0.1), transparent);
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.service-card:hover .service-card-shine {
		opacity: 1;
	}

	.service-card-reflection {
		position: absolute;
		inset: 0;
		border-radius: 1.5rem;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.3) 0%,
			transparent 50%,
			rgba(255, 255, 255, 0.05) 100%
		);
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.service-card:hover .service-card-reflection {
		opacity: 1;
	}
</style>
