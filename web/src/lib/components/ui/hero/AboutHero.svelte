<script lang="ts">
	import { Sparkles } from '$lib/icons/lucide';
	import Breadcrumb from '$lib/components/ui/navigation/Breadcrumb.svelte';

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		contactLabel?: string;
		portfolioLabel?: string;
		contactUrl?: string;
		portfolioUrl?: string;
		experienceLabel?: string;
		experienceValue?: string;
		clientLabel?: string;
		clientValue?: string;
		projectLabel?: string;
		projectValue?: string;
		breadcrumbs?: Array<{ name: string; url: string }>;
		locale?: string;
	}

	let {
		badge = '',
		title = '',
		subtitle = '',
		contactLabel = 'Contact Us',
		portfolioLabel = 'Portfolio',
		contactUrl = '/contact',
		portfolioUrl = '/portfolio',
		experienceLabel = '',
		experienceValue = '',
		clientLabel = '',
		clientValue = '',
		projectLabel = '',
		projectValue = '',
		breadcrumbs = [],
		locale = 'id'
	}: Props = $props();

	const titleMain = $derived(title.split(' ').slice(0, 2).join(' '));
	const titleAccent = $derived(title.split(' ').slice(2).join(' '));
	const normalizedExperienceValue = $derived(
		typeof experienceValue === 'string' ? experienceValue : ''
	);
	const experienceDigits = $derived(normalizedExperienceValue.replace(/\D/g, ''));
	const experienceSuffix = $derived(normalizedExperienceValue.replace(/\d/g, ''));
</script>

<section class="about-hero">
	<div class="hero-bg" aria-hidden="true">
		<div class="gradient-mesh">
			<div class="mesh-orb mesh-1"></div>
			<div class="mesh-orb mesh-2"></div>
			<div class="mesh-orb mesh-3"></div>
			<div class="mesh-orb mesh-4"></div>
		</div>

		<div class="particles-container">
			{#each Array(30) as _, i (i)}
				<div class="particle particle-{i % 3}" style="--i: {i}"></div>
			{/each}
		</div>

		<div class="stars-container">
			{#each Array(15) as _, i (i)}
				<div class="star" style="--star-i: {i}"></div>
			{/each}
		</div>

		<div class="grid-pattern"></div>
		<div class="spotlight"></div>
	</div>

	<div class="container-base relative z-10 py-10 lg:py-16">
		<Breadcrumb items={breadcrumbs} class="mb-8" {locale} />

		<div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
			<div class="hero-content">
				<div class="badge badge-animate">
					<Sparkles class="w-4 h-4" />
					<span class="text-sm font-medium">{badge}</span>
				</div>

				<h1 class="hero-title">
					<span class="title-line-1">{titleMain}</span>
					{#if titleAccent}
						<span class="title-line-2">
							<span class="text-gradient">{titleAccent}</span>
						</span>
					{/if}
				</h1>

				<p class="hero-subtitle">{subtitle}</p>

				<div class="hero-cta-wrapper">
					<a href={contactUrl} class="hero-btn hero-btn-primary">
						<span class="btn-content">
							<span>{contactLabel}</span>
						</span>
						<div class="btn-shimmer"></div>
					</a>
					<a href={portfolioUrl} class="hero-btn hero-btn-secondary">
						<span class="btn-content">
							<span>{portfolioLabel}</span>
						</span>
					</a>
				</div>
			</div>

			<div class="hidden lg:block relative hero-visual">
				<div class="hero-card-3d">
					<div class="card-glow"></div>
					<div class="card-inner">
						<div class="card-front">
							<div class="card-number">
								{#each experienceDigits.split('') as digit, idx (idx)}
									<span class="number-digit">{digit}</span>
								{/each}
								<span class="number-plus">{experienceSuffix}</span>
							</div>
							<p class="card-label">{experienceLabel}</p>
							<div class="card-decoration">
								<div class="deco-line"></div>
								<div class="deco-circle"></div>
								<div class="deco-line"></div>
							</div>
							<div class="card-stats">
								<div class="stat-mini">
									<span class="stat-value">{clientValue}</span>
									<span class="stat-label">{clientLabel}</span>
								</div>
								<div class="stat-mini">
									<span class="stat-value">{projectValue}</span>
									<span class="stat-label">{projectLabel}</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="deco-rings">
					<div class="ring ring-1"></div>
					<div class="ring ring-2"></div>
					<div class="ring ring-3"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-hero {
		position: relative;
		background: linear-gradient(
			135deg,
			#f8fafc 0%,
			#bae6fd 30%,
			#bfdbfe 60%,
			#dcfce7 90%,
			#f1f5f9 100%
		);
		overflow: hidden;
		min-height: 95vh;
		display: flex;
		flex-direction: column;
	}

	:global(.dark) .about-hero {
		background: linear-gradient(135deg, #000510 0%, #0f172a 30%, #1e3a8a 60%, #312e81 100%);
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.gradient-mesh {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse 800px 600px at 10% 20%, rgba(16, 185, 129, 0.15), transparent),
			radial-gradient(ellipse 600px 500px at 90% 80%, rgba(139, 92, 246, 0.12), transparent),
			radial-gradient(ellipse 700px 550px at 50% 50%, rgba(236, 72, 153, 0.08), transparent);
	}

	:global(.dark) .gradient-mesh {
		background:
			radial-gradient(ellipse 800px 600px at 10% 20%, rgba(16, 185, 129, 0.15), transparent),
			radial-gradient(ellipse 600px 500px at 90% 80%, rgba(139, 92, 246, 0.12), transparent),
			radial-gradient(ellipse 700px 550px at 50% 50%, rgba(236, 72, 153, 0.08), transparent);
	}

	.mesh-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
		opacity: 0.25;
		animation: morphOrb 25s ease-in-out infinite;
	}

	:global(.dark) .mesh-orb {
		opacity: 0.3;
	}

	.mesh-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, #10b981 0%, transparent 70%);
		top: -200px;
		right: -150px;
	}

	.mesh-2 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
		bottom: -150px;
		left: -100px;
		animation-delay: -7s;
	}

	.mesh-3 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, #ec4899 0%, transparent 70%);
		top: 40%;
		left: 30%;
		animation-delay: -14s;
	}

	.mesh-4 {
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
		top: 10%;
		left: 50%;
		animation-delay: -21s;
	}

	@keyframes morphOrb {
		0%,
		100% {
			transform: translate(0, 0) scale(1) rotate(0deg);
			border-radius: 50%;
		}
		25% {
			transform: translate(40px, -40px) scale(1.1) rotate(90deg);
			border-radius: 45% 55% 50% 50%;
		}
		50% {
			transform: translate(-30px, 30px) scale(0.9) rotate(180deg);
			border-radius: 50% 50% 45% 55%;
		}
		75% {
			transform: translate(30px, 40px) scale(1.05) rotate(270deg);
			border-radius: 55% 45% 50% 50%;
		}
	}

	.particles-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.particle {
		position: absolute;
		width: 3px;
		height: 3px;
		background: var(--color-gray-500);
		border-radius: 50%;
		box-shadow: 0 0 6px var(--color-gray-500);
		animation: particleRise 25s linear infinite;
		top: 100%;
		left: calc(var(--i) * 3.33%);
	}

	:global(.dark) .particle {
		background: rgba(255, 255, 255, 0.6);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
	}

	.particle-0 {
		animation-delay: calc(var(--i) * -0.8s);
	}

	.particle-1 {
		width: 2px;
		height: 2px;
		animation-delay: calc(var(--i) * -1.2s);
		animation-duration: 30s;
	}

	.particle-2 {
		width: 4px;
		height: 4px;
		animation-delay: calc(var(--i) * -1.6s);
		animation-duration: 20s;
	}

	@keyframes particleRise {
		0% {
			transform: translateY(0) translateX(0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 0.6;
		}
		90% {
			opacity: 0.6;
		}
		100% {
			transform: translateY(-100vh) translateX(50px) rotate(360deg);
			opacity: 0;
		}
	}

	.stars-container {
		position: absolute;
		inset: 0;
	}

	.star {
		position: absolute;
		width: 2px;
		height: 2px;
		background: var(--color-gray-400);
		border-radius: 50%;
		box-shadow: 0 0 8px var(--color-gray-400);
		top: calc(var(--star-i) * 6.67%);
		left: calc(var(--star-i) * 6.67%);
		animation: twinkle 3s ease-in-out infinite;
		animation-delay: calc(var(--star-i) * -0.2s);
	}

	:global(.dark) .star {
		background: rgba(255, 255, 255, 0.7);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.5);
		}
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--color-gray-200) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-gray-200) 1px, transparent 1px);
		background-size: 50px 50px;
		animation: gridMove 30s linear infinite;
	}

	:global(.dark) .grid-pattern {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
	}

	@keyframes gridMove {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 50px 50px;
		}
	}

	.spotlight {
		position: absolute;
		width: 100%;
		height: 100%;
		background: radial-gradient(ellipse 1000px 800px at 50% 30%, rgba(0, 0, 0, 0.02), transparent);
		animation: spotlightPulse 8s ease-in-out infinite;
	}

	:global(.dark) .spotlight {
		background: radial-gradient(
			ellipse 1000px 800px at 50% 30%,
			rgba(255, 255, 255, 0.05),
			transparent
		);
	}

	:global(.dark) .spotlight {
		background: radial-gradient(
			ellipse 1000px 800px at 50% 30%,
			rgba(255, 255, 255, 0.05),
			transparent
		);
	}

	@keyframes spotlightPulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.05);
		}
	}

	.hero-title {
		font-size: 3rem;
		font-weight: 800;
		color: var(--color-gray-900);
		margin-bottom: 1.5rem;
		line-height: 1.15;
	}

	:global(.dark) .hero-title {
		color: white;
	}

	@media (min-width: 640px) {
		.hero-title {
			font-size: 3.5rem;
		}
	}

	@media (min-width: 1024px) {
		.hero-title {
			font-size: 4.5rem;
		}
	}

	.title-line-1 {
		display: inline;
		animation: fadeInUp 0.8s ease-out 0.3s both;
	}

	.title-line-2 {
		display: inline;
		animation: fadeInUp 0.8s ease-out 0.5s both;
	}

	.text-gradient {
		background: linear-gradient(135deg, #10b981 0%, #8b5cf6 50%, #ec4899 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		font-size: 1.125rem;
		color: var(--color-gray-700);
		margin-bottom: 1.25rem;
		line-height: 1.7;
		animation: fadeInUp 0.8s ease-out 0.6s both;
	}

	:global(.dark) .hero-subtitle {
		color: rgba(255, 255, 255, 0.85);
	}

	@media (min-width: 1024px) {
		.hero-subtitle {
			font-size: 1.25rem;
		}
	}

	.hero-cta-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 2.5rem;
		animation: fadeInUp 0.8s ease-out 0.8s both;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 9999px;
		color: var(--color-gray-900);
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1.5rem;
		backdrop-filter: blur(10px);
	}

	.badge :global(.lucide-icon) {
		color: var(--color-secondary);
	}

	:global(.dark) .badge {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.hero-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 2rem;
		border-radius: 0.875rem;
		font-weight: 600;
		font-size: 1rem;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hero-btn-primary {
		background: white;
		color: var(--color-primary);
		box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
	}

	.hero-btn-secondary {
		background: transparent;
		border: 2px solid var(--color-primary);
		color: var(--color-primary);
	}

	.hero-btn-secondary:hover {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	:global(.dark) .hero-btn-secondary {
		background: transparent;
		border: 2px solid rgba(255, 255, 255, 0.5);
		color: white;
	}

	:global(.dark) .hero-btn-secondary:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.8);
	}

	.btn-content {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		z-index: 1;
	}

	.btn-shimmer {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		animation: shimmer 3s infinite;
	}

	@keyframes shimmer {
		0%,
		80%,
		100% {
			left: -100%;
		}
		85%,
		95% {
			left: 100%;
		}
	}

	.hero-visual {
		position: relative;
		animation: fadeInRight 0.8s ease-out 0.5s both;
	}

	.hero-card-3d {
		position: relative;
		width: 350px;
		height: 450px;
		perspective: 1500px;
		margin: 0 auto;
	}

	.card-glow {
		position: absolute;
		inset: -30px;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.08), transparent 70%);
		filter: blur(40px);
		opacity: 0.6;
		animation: cardGlowPulse 4s ease-in-out infinite;
	}

	:global(.dark) .card-glow {
		background: radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%);
	}

	@keyframes cardGlowPulse {
		0%,
		100% {
			opacity: 0.4;
			transform: scale(0.95);
		}
		50% {
			opacity: 0.7;
			transform: scale(1.05);
		}
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		animation: card3DRotate 12s ease-in-out infinite;
	}

	@keyframes card3DRotate {
		0%,
		100% {
			transform: rotateY(-8deg) rotateX(4deg) scale(1);
		}
		25% {
			transform: rotateY(8deg) rotateX(-4deg) scale(1.02);
		}
		50% {
			transform: rotateY(-5deg) rotateX(3deg) scale(1);
		}
		75% {
			transform: rotateY(5deg) rotateX(-3deg) scale(1.02);
		}
	}

	.card-front {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.9) 0%,
			rgba(255, 255, 255, 0.8) 50%,
			rgba(255, 255, 255, 0.85) 100%
		);
		backdrop-filter: blur(30px);
		border: 2px solid rgba(0, 0, 0, 0.1);
		border-radius: 1.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2.5rem;
		box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	:global(.dark) .card-front {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.15) 0%,
			rgba(255, 255, 255, 0.08) 50%,
			rgba(255, 255, 255, 0.12) 100%
		);
		border-color: rgba(255, 255, 255, 0.25);
		box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
	}

	.card-front::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
		animation: cardShine 5s ease-in-out infinite;
	}

	:global(.dark) .card-front::before {
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
	}

	@keyframes cardShine {
		0%,
		80%,
		100% {
			left: -100%;
		}
		85%,
		95% {
			left: 100%;
		}
	}

	.card-number {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		margin-bottom: 1rem;
	}

	.number-digit {
		font-size: 5.5rem;
		font-weight: 900;
		background: linear-gradient(180deg, var(--color-gray-900) 0%, var(--color-gray-500) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
		animation: numberPulse 3s ease-in-out infinite;
	}

	:global(.dark) .number-digit {
		background: none;
		-webkit-background-clip: initial;
		-webkit-text-fill-color: initial;
		background-clip: initial;
		color: white;
	}

	.number-digit:nth-child(1) {
		animation-delay: 0s;
	}

	.number-digit:nth-child(2) {
		animation-delay: 0.2s;
	}

	@keyframes numberPulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.05);
			opacity: 0.95;
		}
	}

	.number-plus {
		font-size: 3.5rem;
		font-weight: 800;
		color: var(--color-secondary);
		line-height: 1;
		animation: plusSpin 8s linear infinite;
	}

	:global(.dark) .number-plus {
		color: white;
	}

	@keyframes plusSpin {
		0%,
		90%,
		100% {
			transform: rotate(0deg);
		}
		92%,
		98% {
			transform: rotate(180deg);
		}
	}

	.card-label {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-gray-700);
		text-align: center;
		margin-bottom: 1.5rem;
		line-height: 1.4;
	}

	:global(.dark) .card-label {
		color: rgba(255, 255, 255, 0.9);
	}

	.deco-line {
		width: 35px;
		height: 3px;
		background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.3), transparent);
	}

	:global(.dark) .deco-line {
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
	}

	.deco-circle {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-secondary);
		box-shadow: 0 0 15px var(--color-secondary);
		animation: circleGlow 2s ease-in-out infinite;
	}

	@keyframes circleGlow {
		0%,
		100% {
			box-shadow: 0 0 10px var(--color-secondary);
		}
		50% {
			box-shadow: 0 0 20px var(--color-secondary);
		}
	}

	.card-decoration {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.card-stats {
		display: flex;
		gap: 2rem;
		width: 100%;
	}

	.stat-mini {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.75rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	:global(.dark) .stat-mini {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--color-gray-900);
		line-height: 1;
		margin-bottom: 0.25rem;
	}

	:global(.dark) .stat-value {
		color: white;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--color-gray-600);
	}

	:global(.dark) .stat-label {
		color: rgba(255, 255, 255, 0.7);
	}

	.deco-rings {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.ring {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 2px solid rgba(0, 0, 0, 0.05);
		border-radius: 50%;
		animation: ringExpand 8s ease-in-out infinite;
	}

	:global(.dark) .ring {
		border-color: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .ring {
		border-color: rgba(255, 255, 255, 0.1);
	}

	.ring-1 {
		width: 400px;
		height: 400px;
		animation-delay: 0s;
	}

	.ring-2 {
		width: 500px;
		height: 500px;
		animation-delay: -2.67s;
	}

	.ring-3 {
		width: 600px;
		height: 600px;
		animation-delay: -5.34s;
	}

	@keyframes ringExpand {
		0% {
			transform: translate(-50%, -50%) scale(0.8);
			opacity: 0;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.2);
			opacity: 0;
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeInRight {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
