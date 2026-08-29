<script lang="ts">
	import { Slack, Sparkles } from '$lib/icons/lucide';
	import { fly } from 'svelte/transition';
	import { resolvePath } from '$lib/utils';
	import FloatingElement from '$lib/components/ui/animation/FloatingElement.svelte';
	import ShineHeader from '$lib/components/ui/header/ShineHeader.svelte';

	interface Props {
		locale: 'id' | 'en';
		homePage: {
			hero?: {
				title?: string;
				subtitle?: string;
				cta?: string;
				ctaLink?: string;
				viewWork?: string;
				viewWorkLink?: string;
			};
		};
		information?: {
			siteTitle?: string;
		};
	}

	let { locale, homePage, information }: Props = $props();

	function resolve(path: string): string {
		return resolvePath(path, locale);
	}
</script>

<section
	class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
>
	<div class="hero-bg-container" aria-hidden="true">
		<div class="hero-base-gradient"></div>
		<div class="hero-noise-overlay"></div>

		<div class="hero-cyber-grid"></div>

		<div class="hero-aurora">
			<div class="hero-aurora-band hero-aurora-1"></div>
			<div class="hero-aurora-band hero-aurora-2"></div>
			<div class="hero-aurora-band hero-aurora-3"></div>
			<div class="hero-aurora-band hero-aurora-4"></div>
		</div>

		<div class="hero-orb hero-orb-1"></div>
		<div class="hero-orb hero-orb-2"></div>
		<div class="hero-orb hero-orb-3"></div>
		<div class="hero-orb hero-orb-4"></div>
		<div class="hero-orb hero-orb-5"></div>

		<div class="hero-blob hero-blob-1"></div>
		<div class="hero-blob hero-blob-2"></div>
		<div class="hero-blob hero-blob-3"></div>

		<div class="hero-mesh-grid"></div>

		<div class="hero-light-rays">
			<div class="hero-ray hero-ray-1"></div>
			<div class="hero-ray hero-ray-2"></div>
			<div class="hero-ray hero-ray-3"></div>
			<div class="hero-ray hero-ray-4"></div>
		</div>

		<div class="hero-particles">
			{#each Array.from({ length: 40 }, (_, i) => i) as i (i)}
				<div
					class="hero-particle"
					style="--delay: {i * 0.2}s; --x: {2 + Math.random() * 96}%; --duration: {3 +
						Math.random() * 5}s; --size: {1 + Math.random() * 4}px; --drift: {-40 +
						Math.random() * 80}px; --opacity: {0.3 + Math.random() * 0.7};"
				></div>
			{/each}
		</div>

		<div class="hero-orbital-container">
			<div class="hero-orbital hero-orbital-1"></div>
			<div class="hero-orbital hero-orbital-2"></div>
			<div class="hero-orbital hero-orbital-3"></div>
		</div>

		<FloatingElement duration={4000} delay={0} amplitude={20}>
			<div class="hero-shape hero-shape-triangle"></div>
		</FloatingElement>
		<FloatingElement duration={5000} delay={500} amplitude={25}>
			<div class="hero-shape hero-shape-circle"></div>
		</FloatingElement>
		<FloatingElement duration={4500} delay={1000} amplitude={22}>
			<div class="hero-shape hero-shape-square"></div>
		</FloatingElement>
		<FloatingElement duration={3500} delay={1500} amplitude={15}>
			<div class="hero-shape hero-shape-hexagon"></div>
		</FloatingElement>
		<FloatingElement duration={6000} delay={800} amplitude={30}>
			<div class="hero-shape hero-shape-diamond"></div>
		</FloatingElement>
		<FloatingElement duration={5500} delay={1200} amplitude={18}>
			<div class="hero-shape hero-shape-cross"></div>
		</FloatingElement>

		<div class="hero-vignette"></div>
	</div>

	<div class="container-base relative py-10 lg:py-16 z-10">
		<div class="max-w-5xl mx-auto text-center">
			<ShineHeader
				badge={information?.siteTitle}
				badgeIconLeft={Slack}
				badgeIconRight={Sparkles}
				badgeColor="success"
				title={homePage?.hero?.title}
				subtitle={homePage?.hero?.subtitle}
				class="home-hero-header"
				animation="fly-up"
				animationDelay={100}
			/>

			<div
				class="flex flex-col sm:flex-row items-center justify-center gap-6"
				in:fly={{ y: 30, duration: 800, delay: 400 }}
			>
				<a href={resolve(homePage?.hero?.ctaLink || '#')} class="hero-cta-primary group">
					<span class="relative z-10">{homePage?.hero?.cta}</span>
				</a>
				<a href={resolve(homePage?.hero?.viewWorkLink || '#')} class="hero-cta-secondary">
					<span class="relative z-10">{homePage?.hero?.viewWork}</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	:global(.home-hero-header .section-subtitle) {
		max-width: 56rem;
	}

	@media (min-width: 1024px) {
		:global(.home-hero-header .section-subtitle) {
			max-width: 64rem;
		}
	}

	/* ===== BACKGROUND CONTAINER ===== */
	.hero-bg-container {
		position: absolute;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		isolation: isolate;
	}

	/* Base Gradient - Light Mode with subtle animation */
	.hero-base-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			#f1f5f9 0%,
			#bae6fd 20%,
			#bfdbfe 40%,
			#dcfce7 60%,
			#f3e8ff 80%,
			#f1f5f9 100%
		);
		background-size: 400% 400%;
		animation: hero-gradient-shift 20s ease infinite;
	}

	@keyframes hero-gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	:global(:root.dark) .hero-base-gradient {
		background: linear-gradient(
			135deg,
			#020617 0%,
			#0c1222 15%,
			#0f172a 30%,
			#1e1b4b 50%,
			#0f172a 70%,
			#0c1222 85%,
			#020617 100%
		);
		background-size: 400% 400%;
	}

	/* Noise Overlay for texture */
	.hero-noise-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		pointer-events: none;
	}

	:global(:root.dark) .hero-noise-overlay {
		opacity: 0.05;
	}

	/* Cyber Grid Background */
	.hero-cyber-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse 100% 80% at 50% 50%, black 20%, transparent 70%);
		animation: hero-grid-move 40s linear infinite;
	}

	@keyframes hero-grid-move {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 80px 80px;
		}
	}

	:global(:root.dark) .hero-cyber-grid {
		background-image:
			linear-gradient(rgba(96, 165, 250, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(96, 165, 250, 0.08) 1px, transparent 1px);
	}

	/* Gradient Vignette */
	.hero-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.06) 100%);
		pointer-events: none;
	}

	:global(:root.dark) .hero-vignette {
		background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%);
	}

	/* Aurora/Northern Lights Effect */
	.hero-aurora {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.hero-aurora-band {
		position: absolute;
		width: 250%;
		height: 70%;
		opacity: 0.25;
		filter: blur(120px);
		animation: hero-aurora-flow 15s ease-in-out infinite;
		will-change: transform, opacity;
	}

	@keyframes hero-aurora-flow {
		0%,
		100% {
			transform: translateX(-10%) translateY(-5%);
		}
		25% {
			transform: translateX(-5%) translateY(5%);
		}
		50% {
			transform: translateX(5%) translateY(-3%);
		}
		75% {
			transform: translateX(0%) translateY(3%);
		}
	}

	:global(:root.dark) .hero-aurora-band {
		opacity: 0.2;
		filter: blur(100px);
	}

	.hero-aurora-1 {
		top: -30%;
		left: -60%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			#3b82f6 30%,
			#06b6d4 50%,
			#10b981 70%,
			transparent 100%
		);
		animation-delay: 0s;
	}

	.hero-aurora-2 {
		top: 5%;
		left: -40%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			#8b5cf6 25%,
			#ec4899 50%,
			#f97316 75%,
			transparent 100%
		);
		animation-delay: -5s;
	}

	.hero-aurora-3 {
		top: 30%;
		left: -20%;
		background: linear-gradient(90deg, transparent 0%, #06b6d4 40%, #3b82f6 60%, transparent 100%);
		animation-delay: -10s;
	}

	.hero-aurora-4 {
		top: -10%;
		left: 20%;
		background: linear-gradient(90deg, transparent 0%, #10b981 30%, #06b6d4 60%, transparent 100%);
		animation-delay: -3s;
	}

	/* ===== ORBS ===== */
	.hero-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.6;
		animation: hero-orb-float 20s ease-in-out infinite;
		will-change: transform;
	}

	:global(:root.dark) .hero-orb {
		opacity: 0.5;
	}

	@keyframes hero-orb-float {
		0%,
		100% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(20px, -30px);
		}
		50% {
			transform: translate(-10px, 20px);
		}
		75% {
			transform: translate(30px, 10px);
		}
	}

	.hero-orb-1 {
		width: 600px;
		height: 600px;
		top: -20%;
		right: -10%;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
		animation-delay: 0s;
	}

	.hero-orb-2 {
		width: 400px;
		height: 400px;
		bottom: -10%;
		left: -5%;
		background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
		animation-delay: -5s;
	}

	.hero-orb-3 {
		width: 300px;
		height: 300px;
		top: 30%;
		right: 20%;
		background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
		animation-delay: -10s;
	}

	.hero-orb-4 {
		width: 250px;
		height: 250px;
		bottom: 20%;
		right: 30%;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%);
		animation-delay: -15s;
	}

	.hero-orb-5 {
		width: 200px;
		height: 200px;
		top: 10%;
		left: 30%;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
		animation-delay: -8s;
	}

	/* ===== BLOBS ===== */
	.hero-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.25;
		animation: hero-blob-pulse 8s ease-in-out infinite;
	}

	@keyframes hero-blob-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.3;
		}
	}

	.hero-blob-1 {
		width: 500px;
		height: 500px;
		top: -15%;
		left: 20%;
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
	}

	.hero-blob-2 {
		width: 400px;
		height: 400px;
		bottom: -10%;
		right: -5%;
		background: linear-gradient(135deg, #ec4899, #f97316);
	}

	.hero-blob-3 {
		width: 350px;
		height: 350px;
		top: 40%;
		left: -10%;
		background: linear-gradient(135deg, #10b981, #06b6d4);
	}

	/* ===== MESH GRID ===== */
	.hero-mesh-grid {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px);
		background-size: 50px 50px;
		mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
		opacity: 0.5;
	}

	:global(:root.dark) .hero-mesh-grid {
		background-image: radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px);
	}

	/* ===== LIGHT RAYS ===== */
	.hero-light-rays {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.hero-ray {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 200%;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(59, 130, 246, 0.1) 30%,
			rgba(139, 92, 246, 0.15) 50%,
			rgba(59, 130, 246, 0.1) 70%,
			transparent 100%
		);
		transform-origin: left center;
		opacity: 0.5;
		animation: hero-ray-rotate 30s linear infinite;
	}

	:global(:root.dark) .hero-ray {
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(59, 130, 246, 0.2) 30%,
			rgba(139, 92, 246, 0.3) 50%,
			rgba(59, 130, 246, 0.2) 70%,
			transparent 100%
		);
	}

	@keyframes hero-ray-rotate {
		0% {
			transform: rotate(-15deg);
		}
		100% {
			transform: rotate(345deg);
		}
	}

	.hero-ray-1 {
		animation-delay: 0s;
	}

	.hero-ray-2 {
		animation-delay: -7.5s;
	}

	.hero-ray-3 {
		animation-delay: -15s;
	}

	.hero-ray-4 {
		animation-delay: -22.5s;
	}

	/* ===== PARTICLES ===== */
	.hero-particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.hero-particle {
		position: absolute;
		left: var(--x);
		top: 0;
		width: var(--size);
		height: var(--size);
		background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
		border-radius: 50%;
		animation: hero-particle-fall var(--duration) linear infinite;
		animation-delay: var(--delay);
		opacity: var(--opacity);
		will-change: transform, opacity;
	}

	@keyframes hero-particle-fall {
		0% {
			transform: translateY(-10px) translateX(0);
			opacity: 0;
		}
		10% {
			opacity: var(--opacity);
		}
		90% {
			opacity: var(--opacity);
		}
		100% {
			transform: translateY(100vh) translateX(var(--drift));
			opacity: 0;
		}
	}

	:global(:root.dark) .hero-particle {
		background: radial-gradient(circle, rgba(99, 102, 241, 0.9) 0%, transparent 70%);
	}

	/* ===== ORBITAL RINGS ===== */
	.hero-orbital-container {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.hero-orbital {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(99, 102, 241, 0.1);
		animation: hero-orbital-rotate 60s linear infinite;
	}

	:global(:root.dark) .hero-orbital {
		border-color: rgba(99, 102, 241, 0.2);
	}

	@keyframes hero-orbital-rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.hero-orbital-1 {
		width: 800px;
		height: 800px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-duration: 60s;
		border-color: rgba(59, 130, 246, 0.08);
	}

	.hero-orbital-2 {
		width: 600px;
		height: 600px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(120deg);
		animation-duration: 45s;
		border-color: rgba(139, 92, 246, 0.08);
	}

	.hero-orbital-3 {
		width: 1000px;
		height: 1000px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(240deg);
		animation-duration: 90s;
		border-color: rgba(16, 185, 129, 0.06);
	}

	/* ===== FLOATING SHAPES ===== */
	.hero-shape {
		position: absolute;
		opacity: 0.2;
		filter: blur(1px);
	}

	:global(:root.dark) .hero-shape {
		opacity: 0.15;
	}

	.hero-shape-triangle {
		width: 60px;
		height: 60px;
		top: 15%;
		right: 15%;
		background: linear-gradient(135deg, transparent 50%, #3b82f6 50%);
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}

	.hero-shape-circle {
		width: 40px;
		height: 40px;
		bottom: 20%;
		right: 25%;
		background: radial-gradient(circle, #ec4899 0%, transparent 70%);
		border-radius: 50%;
	}

	.hero-shape-square {
		width: 35px;
		height: 35px;
		top: 25%;
		left: 10%;
		background: linear-gradient(135deg, #10b981 0%, transparent 50%);
		transform: rotate(45deg);
	}

	.hero-shape-hexagon {
		width: 45px;
		height: 45px;
		bottom: 30%;
		left: 20%;
		background: linear-gradient(135deg, #8b5cf6 0%, transparent 50%);
		clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
	}

	.hero-shape-diamond {
		width: 30px;
		height: 30px;
		top: 60%;
		right: 8%;
		background: linear-gradient(135deg, #06b6d4 0%, transparent 50%);
		transform: rotate(45deg);
	}

	.hero-shape-cross {
		width: 40px;
		height: 40px;
		top: 10%;
		left: 35%;
		background: transparent;
		opacity: 0.08;
	}

	.hero-shape-cross::before,
	.hero-shape-cross::after {
		content: '';
		position: absolute;
		background: #f97316;
	}

	.hero-shape-cross::before {
		width: 100%;
		height: 4px;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.hero-shape-cross::after {
		width: 4px;
		height: 100%;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
	}

	/* ===== CTA BUTTONS ===== */
	.hero-cta-primary {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 9999px;
		text-decoration: none;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		color: white;
		box-shadow:
			0 4px 6px -1px rgba(59, 130, 246, 0.3),
			0 10px 15px -3px rgba(59, 130, 246, 0.2);
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.hero-cta-primary::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.hero-cta-primary:hover::before {
		opacity: 1;
	}

	.hero-cta-primary:hover {
		transform: translateY(-2px);
		box-shadow:
			0 8px 12px -3px rgba(59, 130, 246, 0.4),
			0 20px 25px -5px rgba(59, 130, 246, 0.3);
	}

	.hero-cta-secondary {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 9999px;
		text-decoration: none;
		background: rgba(255, 255, 255, 0.9);
		color: var(--color-gray-700);
		border: 1px solid rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		backdrop-filter: blur(8px);
	}

	:global(:root.dark) .hero-cta-secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border-color: rgba(255, 255, 255, 0.2);
	}

	.hero-cta-secondary::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		padding: 1px;
		background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
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
	}

	.hero-cta-secondary:hover {
		transform: translateY(-2px);
	}

	.hero-cta-secondary:hover::before {
		opacity: 1;
	}
</style>
