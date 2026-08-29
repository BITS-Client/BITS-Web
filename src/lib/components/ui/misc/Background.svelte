<script lang="ts">
	type GradientTheme = 'ocean' | 'teal' | 'coral' | 'violet' | 'monochrome' | 'hero';

	interface Props {
		class?: string;
		gradientTheme?: GradientTheme;
	}

	const gradientThemes: Record<GradientTheme, { light: string; dark: string }> = {
		ocean: {
			light:
				'linear-gradient(135deg, #f1f5f9 0%, #bae6fd 25%, #bfdbfe 50%, #dcfce7 75%, #f3e8ff 100%)',
			dark: 'linear-gradient(135deg, #030712 0%, #0f172a 25%, #1e3a5f 50%, #0f172a 75%, #030712 100%)'
		},
		teal: {
			light:
				'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #c4b5fd 75%, #a5f3fc 100%)',
			dark: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 25%, #4c1d95 50%, #312e81 75%, #1e3a8a 100%)'
		},
		coral: {
			light:
				'linear-gradient(135deg, #faf5ff 0%, #e9d5ff 25%, #e0f2fe 50%, #bae6fd 75%, #a5f3fc 100%)',
			dark: 'linear-gradient(135deg, #2e1065 0%, #1e3a8a 25%, #4c1d95 50%, #312e81 75%, #0f172a 100%)'
		},
		violet: {
			light:
				'linear-gradient(135deg, #faf5ff 0%, #ede9fe 25%, #ddd6fe 50%, #ede9fe 75%, #faf5ff 100%)',
			dark: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #312e81 75%, #1e1b4b 100%)'
		},
		monochrome: {
			light:
				'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%, #f8fafc 100%)',
			dark: 'linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)'
		},
		hero: {
			light:
				'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 20%, #dbeafe 40%, #f0fdf4 60%, #faf5ff 80%, #f8fafc 100%)',
			dark: 'linear-gradient(135deg, #020617 0%, #0c1222 15%, #0f172a 30%, #1e1b4b 50%, #0f172a 70%, #0c1222 85%, #020617 100%)'
		}
	};

	let { class: className = '', gradientTheme = 'ocean' }: Props = $props();
	const theme = $derived(gradientThemes[gradientTheme]);
</script>

<div class="section-bg-container {className}" aria-hidden="true">
	<div
		class="section-base-gradient"
		style="--gradient-light: {theme.light}; --gradient-dark: {theme.dark}"
	></div>

	<div class="section-aurora">
		<div class="section-aurora-band section-aurora-1"></div>
		<div class="section-aurora-band section-aurora-2"></div>
		<div class="section-aurora-band section-aurora-3"></div>
	</div>

	<div class="section-orb section-orb-1"></div>
	<div class="section-orb section-orb-2"></div>
	<div class="section-orb section-orb-3"></div>
	<div class="section-orb section-orb-4"></div>

	<div class="section-blob section-blob-1"></div>
	<div class="section-blob section-blob-2"></div>

	<div class="section-light-rays">
		<div class="section-ray section-ray-1"></div>
		<div class="section-ray section-ray-2"></div>
		<div class="section-ray section-ray-3"></div>
	</div>

	<div class="section-particles">
		{#each Array.from({ length: 30 }) as _, idx (idx)}
			<div
				class="section-particle"
				style="--x: {Math.random() * 100}%; --size: {2 + Math.random() * 4}px; --duration: {8 +
					Math.random() * 12}s; --delay: {Math.random() * 10}s; --drift: {-30 +
					Math.random() * 60}px;"
			></div>
		{/each}
	</div>

	<div class="section-orbital-container">
		<div class="section-orbital section-orbital-1"></div>
		<div class="section-orbital section-orbital-2"></div>
		<div class="section-orbital section-orbital-3"></div>
	</div>

	<div class="section-shape section-shape-triangle"></div>
	<div class="section-shape section-shape-circle"></div>
	<div class="section-shape section-shape-square"></div>
	<div class="section-shape section-shape-diamond"></div>
	<div class="section-shape section-shape-cross"></div>

	<div class="section-cyber-grid"></div>

	<div class="section-noise"></div>

	<div class="section-vignette"></div>
</div>

<style>
	.section-bg-container {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.section-base-gradient {
		position: absolute;
		inset: 0;
		background: var(--gradient-light);
		background-size: 400% 400%;
		animation: section-gradient-shift 15s ease infinite;
	}

	@keyframes section-gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	:global(:root.dark) .section-base-gradient {
		background: var(--gradient-dark);
		background-size: 400% 400%;
	}

	.section-noise {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
	}

	:global(:root.dark) .section-noise {
		opacity: 0.05;
	}

	.section-cyber-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%);
	}

	:global(:root.dark) .section-cyber-grid {
		background-image:
			linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px);
	}

	.section-aurora {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		opacity: 0.5;
	}

	:global(:root.dark) .section-aurora {
		opacity: 0.6;
	}

	.section-aurora-band {
		position: absolute;
		width: 150%;
		height: 50%;
		border-radius: 50%;
		filter: blur(60px);
		animation: section-aurora-flow 12s ease-in-out infinite;
	}

	@keyframes section-aurora-flow {
		0%,
		100% {
			transform: translateX(-5%) translateY(-3%);
		}
		50% {
			transform: translateX(5%) translateY(3%);
		}
	}

	.section-aurora-1 {
		top: -20%;
		left: -25%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(168, 85, 247, 0.3),
			rgba(14, 165, 233, 0.2),
			transparent
		);
	}

	.section-aurora-2 {
		top: 10%;
		right: -30%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(34, 197, 94, 0.3),
			rgba(16, 185, 129, 0.2),
			transparent
		);
		animation-delay: -4s;
	}

	.section-aurora-3 {
		bottom: -15%;
		left: 10%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(168, 85, 247, 0.2),
			rgba(147, 51, 234, 0.2),
			transparent
		);
		animation-delay: -8s;
	}

	.section-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(50px);
		opacity: 0.55;
		animation: section-orb-float 18s ease-in-out infinite;
	}

	@keyframes section-orb-float {
		0%,
		100% {
			transform: translate(0, 0);
		}
		33% {
			transform: translate(30px, -20px);
		}
		66% {
			transform: translate(-20px, 30px);
		}
	}

	.section-orb-1 {
		width: 400px;
		height: 400px;
		top: -10%;
		right: -5%;
		background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
	}

	.section-orb-2 {
		width: 300px;
		height: 300px;
		bottom: -5%;
		left: -10%;
		background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
		animation-delay: -6s;
	}

	.section-orb-3 {
		width: 350px;
		height: 350px;
		top: 30%;
		left: 20%;
		background: radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%);
		animation-delay: -12s;
	}

	.section-orb-4 {
		width: 200px;
		height: 200px;
		bottom: 20%;
		right: 15%;
		background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
		animation-delay: -9s;
	}

	.section-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.25;
		animation: section-blob-pulse 10s ease-in-out infinite;
	}

	@keyframes section-blob-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.15);
			opacity: 0.35;
		}
	}

	.section-blob-1 {
		width: 450px;
		height: 450px;
		top: -5%;
		left: 30%;
		background: linear-gradient(135deg, #8b5cf6, #a855f7);
	}

	.section-blob-2 {
		width: 380px;
		height: 380px;
		bottom: -10%;
		right: -5%;
		background: linear-gradient(135deg, #22c55e, #3b82f6);
	}

	.section-light-rays {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.section-ray {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 180%;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(14, 165, 233, 0.08) 30%,
			rgba(14, 165, 233, 0.12) 50%,
			rgba(14, 165, 233, 0.08) 70%,
			transparent
		);
		transform-origin: left center;
		opacity: 0.6;
		animation: section-ray-rotate 25s linear infinite;
	}

	@keyframes section-ray-rotate {
		0% {
			transform: rotate(10deg);
		}
		100% {
			transform: rotate(370deg);
		}
	}

	.section-ray-1 {
		animation-delay: 0s;
	}

	.section-ray-2 {
		animation-delay: -8s;
	}

	.section-ray-3 {
		animation-delay: -16s;
	}

	.section-particles {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.section-particle {
		position: absolute;
		left: var(--x);
		top: 0;
		width: var(--size);
		height: var(--size);
		background: radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, transparent 70%);
		border-radius: 50%;
		animation: section-particle-fall var(--duration) linear infinite;
		animation-delay: var(--delay);
		opacity: 0.6;
	}

	@keyframes section-particle-fall {
		0% {
			transform: translateY(-10px) translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 0.6;
		}
		90% {
			opacity: 0.6;
		}
		100% {
			transform: translateY(100vh) translateX(var(--drift));
			opacity: 0;
		}
	}

	.section-orbital-container {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.section-orbital {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(14, 165, 233, 0.08);
		animation: section-orbital-rotate 50s linear infinite;
	}

	@keyframes section-orbital-rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.section-orbital-1 {
		width: 600px;
		height: 600px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-duration: 50s;
	}

	.section-orbital-2 {
		width: 450px;
		height: 450px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(120deg);
		animation-duration: 35s;
	}

	.section-orbital-3 {
		width: 750px;
		height: 750px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(240deg);
		animation-duration: 70s;
	}

	.section-vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.04) 100%);
		pointer-events: none;
	}

	:global(:root.dark) .section-vignette {
		background: radial-gradient(ellipse at center, transparent 25%, rgba(0, 0, 0, 0.4) 100%);
	}

	.section-float-trophy {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 20px;
		color: #22c55e;
	}

	.section-float-star {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 50%;
		color: #3b82f6;
	}

	.section-float-sparkle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background: rgba(147, 51, 234, 0.1);
		border: 1px solid rgba(147, 51, 234, 0.2);
		border-radius: 12px;
		color: #9333ea;
	}

	.section-float-ring {
		width: 70px;
		height: 70px;
		border: 2px dashed rgba(34, 197, 94, 0.2);
		border-radius: 50%;
	}

	.section-shape {
		position: absolute;
		opacity: 0.2;
		filter: blur(1px);
	}

	:global(:root.dark) .section-shape {
		opacity: 0.12;
	}

	.section-shape-triangle {
		width: 50px;
		height: 50px;
		top: 15%;
		right: 20%;
		background: linear-gradient(135deg, transparent 50%, #8b5cf6 50%);
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}

	.section-shape-circle {
		width: 35px;
		height: 35px;
		bottom: 25%;
		right: 35%;
		background: radial-gradient(circle, #22c55e 0%, transparent 70%);
		border-radius: 50%;
	}

	.section-shape-square {
		width: 30px;
		height: 30px;
		top: 30%;
		left: 15%;
		background: linear-gradient(135deg, #3b82f6 0%, transparent 50%);
		transform: rotate(45deg);
	}

	.section-shape-diamond {
		width: 40px;
		height: 40px;
		bottom: 35%;
		left: 30%;
		background: linear-gradient(135deg, #9333ea 0%, transparent 50%);
		transform: rotate(45deg);
	}

	.section-shape-cross {
		width: 35px;
		height: 35px;
		top: 60%;
		right: 10%;
		background: transparent;
	}

	.section-shape-cross::before,
	.section-shape-cross::after {
		content: '';
		position: absolute;
		background: #8b5cf6;
	}

	.section-shape-cross::before {
		width: 100%;
		height: 3px;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
	}

	.section-shape-cross::after {
		width: 3px;
		height: 100%;
		left: 50%;
		top: 0;
		transform: translateX(-50%);
	}
</style>
