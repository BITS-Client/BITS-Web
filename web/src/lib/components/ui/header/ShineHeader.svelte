<script lang="ts">
	import { Trophy, Sparkles } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';

	type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple';

	interface Props {
		badge?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		badgeIconLeft?: any;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		badgeIconRight?: any;
		badgeColor?: BadgeColor;
		badgeTextColor?: string;
		badgeIconLeftColor?: string;
		badgeIconRightColor?: string;
		title?: string;
		subtitle?: string;
		class?: string;
		animation?: 'fade' | 'fly-up' | 'fly-down' | 'fly-left' | 'fly-right' | 'scale';
		animationDelay?: number;
	}

	const colorMap: Record<BadgeColor, { bg: string; border: string; text: string; glow: string }> = {
		primary: {
			bg: 'rgba(255, 255, 255, 0.9)',
			border: 'rgba(59, 130, 246, 0.3)',
			text: '#2563eb',
			glow: 'rgba(59, 130, 246, 0.4)'
		},
		secondary: {
			bg: 'rgba(255, 255, 255, 0.9)',
			border: 'rgba(34, 197, 94, 0.3)',
			text: '#16a34a',
			glow: 'rgba(34, 197, 94, 0.4)'
		},
		success: {
			bg: 'rgba(255, 255, 255, 0.9)',
			border: 'rgba(16, 185, 129, 0.3)',
			text: '#059669',
			glow: 'rgba(16, 185, 129, 0.4)'
		},
		warning: {
			bg: 'rgba(255, 255, 255, 0.9)',
			border: 'rgba(245, 158, 11, 0.3)',
			text: '#d97706',
			glow: 'rgba(245, 158, 11, 0.4)'
		},
		danger: {
			bg: 'rgba(255, 255, 255, 0.9)',
			border: 'rgba(239, 68, 68, 0.3)',
			text: '#dc2626',
			glow: 'rgba(239, 68, 68, 0.4)'
		},
		purple: {
			bg: 'rgba(255, 255, 255, 0.9)',
			border: 'rgba(139, 92, 246, 0.3)',
			text: '#7c3aed',
			glow: 'rgba(139, 92, 246, 0.4)'
		}
	};

	let {
		badge,
		badgeIconLeft,
		badgeIconRight,
		badgeColor = 'primary',
		badgeTextColor,
		badgeIconLeftColor,
		badgeIconRightColor,
		title,
		subtitle,
		class: className = '',
		animation = 'fly-up',
		animationDelay
	}: Props = $props();

	const BadgeIconLeft = $derived(badgeIconLeft || Trophy);
	const BadgeIconRight = $derived(badgeIconRight || Sparkles);
	const colors = $derived(colorMap[badgeColor]);
	const textColor = $derived(badgeTextColor || colors.text);
	const titleMain = $derived(title?.split(' ').slice(0, 2).join(' ') || '');
	const titleAccent = $derived(title?.split(' ').slice(2).join(' ') || '');
</script>

<ScrollReveal {animation} delay={animationDelay}>
	<div class="section-header text-center mb-10 lg:mb-16 {className}">
		{#if badge}
			<div class="section-badge-wrapper">
				<div
					class="section-badge group"
					style="--badge-bg: {colors.bg}; --badge-border: {colors.border}; --badge-text: {textColor}; --badge-glow: {colors.glow}"
				>
					<div class="section-badge-ring"></div>
					<div class="section-badge-glow"></div>
					<BadgeIconLeft class="w-4 h-4" style="color: {badgeIconLeftColor || colors.text}" />
					<span class="section-badge-text">{badge}</span>
					<BadgeIconRight
						class="w-4 h-4 section-badge-icon"
						style="color: {badgeIconRightColor || colors.text}"
					/>
					<div class="section-badge-sparkle section-badge-sparkle-1"></div>
					<div class="section-badge-sparkle section-badge-sparkle-2"></div>
					<div class="section-badge-sparkle section-badge-sparkle-3"></div>
				</div>
			</div>
		{/if}

		{#if title}
			<h2 class="section-title">
				{#if titleMain}
					<span class="section-title-line section-title-line-1">{titleMain}</span>
				{/if}
				{#if titleAccent}
					<span class="section-title-highlight">
						<span class="section-title-gradient">{titleAccent}</span>
						<span class="section-title-underline"></span>
					</span>
				{/if}
			</h2>
		{/if}

		{#if subtitle}
			<p class="section-subtitle">
				{subtitle}
			</p>
		{/if}

		<div class="section-header-line">
			<div class="section-header-line-inner"></div>
		</div>
	</div>
</ScrollReveal>

<style>
	.section-header {
		position: relative;
	}

	.section-badge-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}

	.section-badge {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--badge-bg);
		border: 1px solid var(--badge-border);
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--badge-text);
		overflow: hidden;
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.1);
	}

	:global(:root.dark) .section-badge {
		background: rgba(59, 130, 246, 0.15);
		border-color: rgba(59, 130, 246, 0.3);
	}

	.section-badge-ring {
		position: absolute;
		inset: -3px;
		border-radius: 9999px;
		border: 2px solid transparent;
		background: linear-gradient(135deg, var(--badge-glow), var(--badge-glow)) border-box;
		-webkit-mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		animation: section-badge-ring-pulse 3s ease-in-out infinite;
	}

	.section-badge-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, var(--badge-glow), transparent);
		transform: translateX(-100%);
		animation: section-badge-shine 3s ease-in-out infinite;
	}

	:global(:root.dark) .section-badge-glow {
		background: linear-gradient(90deg, transparent, var(--badge-glow), transparent);
	}

	:global(:root.dark) .section-badge {
		background: rgba(59, 130, 246, 0.15);
		border-color: rgba(59, 130, 246, 0.3);
	}

	.section-badge-ring {
		position: absolute;
		inset: -3px;
		border-radius: 9999px;
		border: 2px solid transparent;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3)) border-box;
		-webkit-mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		animation: section-badge-ring-pulse 3s ease-in-out infinite;
	}

	@keyframes section-badge-ring-pulse {
		0%,
		100% {
			opacity: 0;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
	}

	.section-badge-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
		transform: translateX(-100%);
		animation: section-badge-shine 3s ease-in-out infinite;
	}

	:global(:root.dark) .section-badge-glow {
		background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.4), transparent);
	}

	@keyframes section-badge-shine {
		0% {
			transform: translateX(-100%);
		}
		50%,
		100% {
			transform: translateX(100%);
		}
	}

	:global(.section-badge-icon) {
		color: var(--badge-text);
	}

	.section-badge-sparkle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: var(--badge-text);
		border-radius: 50%;
		animation: section-sparkle-pop 2s ease-in-out infinite;
	}

	.section-badge-sparkle-1 {
		top: 2px;
		right: 20%;
		animation-delay: 0s;
	}

	.section-badge-sparkle-2 {
		bottom: 2px;
		left: 25%;
		animation-delay: 0.5s;
	}

	.section-badge-sparkle-3 {
		top: 50%;
		right: 5%;
		animation-delay: 1s;
	}

	@keyframes section-sparkle-pop {
		0%,
		100% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.section-title {
		position: relative;
		font-size: clamp(2.5rem, 7vw, 4.5rem);
		font-weight: 900;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		color: var(--color-gray-900);
	}

	:global(:root.dark) .section-title {
		color: white;
	}

	.section-title-line {
		display: block;
	}

	.section-title-highlight {
		display: block;
		position: relative;
	}

	.section-title-gradient {
		background: linear-gradient(135deg, #22c55e 0%, #3b82f6 40%, #9333ea 70%, #a855f7 100%);
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: section-title-gradient 5s ease infinite;
		display: inline-block;
		line-height: 1.3;
		padding-bottom: 0.1em;
		margin-bottom: 0.5rem;
	}

	@keyframes section-title-gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	:global(:root.dark) .section-title-gradient {
		background: linear-gradient(135deg, #4ade80 0%, #60a5fa 30%, #a855f7 60%, #c084fc 100%);
		-webkit-background-clip: text;
		background-clip: text;
		filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.4));
	}

	.section-title-underline {
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 4px;
		background: linear-gradient(90deg, transparent, #22c55e, #3b82f6, transparent);
		border-radius: 2px;
		animation: section-underline-pulse 3s ease-in-out infinite;
	}

	:global(:root.dark) .section-title-underline {
		background: linear-gradient(90deg, transparent, #4ade80, #60a5fa, transparent);
		box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
	}

	@keyframes section-underline-pulse {
		0%,
		100% {
			width: 60%;
			opacity: 0.8;
		}
		50% {
			width: 80%;
			opacity: 1;
		}
	}

	.section-subtitle {
		font-size: 1.125rem;
		line-height: 1.75;
		color: var(--color-gray-600);
		max-width: 40rem;
		margin: 0 auto 1.5rem;
	}

	:global(:root.dark) .section-subtitle {
		color: rgba(255, 255, 255, 0.6);
	}

	@media (min-width: 768px) {
		.section-subtitle {
			font-size: 1.25rem;
		}
	}

	.section-header-line {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.section-header-line-inner {
		width: 100px;
		height: 2px;
		background: linear-gradient(90deg, transparent, #22c55e, #3b82f6, transparent);
		border-radius: 1px;
	}

	:global(:root.dark) .section-header-line-inner {
		background: linear-gradient(
			90deg,
			transparent,
			rgba(74, 222, 128, 0.5),
			rgba(96, 165, 250, 0.5),
			transparent
		);
	}
</style>
