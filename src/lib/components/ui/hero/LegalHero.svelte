<script lang="ts">
	import { FileText, Sparkles, Scale, Shield } from '$lib/icons/lucide';
	import Breadcrumb from '$lib/components/ui/navigation/Breadcrumb.svelte';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import FloatingElement from '$lib/components/ui/animation/FloatingElement.svelte';

	interface Props {
		badge: string;
		title: string;
		subtitle: string;
		lastUpdated: string;
		breadcrumbs: Array<{ name: string; url: string }>;
		locale: string;
		primaryIcon?: typeof Shield;
		secondaryIcon?: typeof Scale;
	}

	let {
		badge,
		title,
		subtitle,
		lastUpdated,
		breadcrumbs,
		locale,
		primaryIcon: PrimaryIcon = Shield,
		secondaryIcon: SecondaryIcon = Scale
	}: Props = $props();
</script>

<section class="relative min-h-[60vh] flex items-center overflow-hidden">
	<!-- Animated Background -->
	<div class="absolute inset-0 z-0" aria-hidden="true">
		<!-- Base gradient -->
		<div class="absolute inset-0 legal-hero-gradient"></div>

		<!-- Dark overlay for better contrast -->
		<div class="absolute inset-0 bg-black/15"></div>

		<!-- Aurora bands -->
		<div class="absolute inset-0 overflow-hidden opacity-60">
			<div
				class="absolute top-[-15%] left-[-50%] w-[200%] h-[40%] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-blue-500 to-purple-500 animate-[aurora-flow_18s_ease-in-out_infinite]"
			></div>
			<div
				class="absolute top-[40%] right-[-40%] w-[200%] h-[40%] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-emerald-500 to-cyan-400 animate-[aurora-flow_22s_ease-in-out_infinite_-6s]"
			></div>
			<div
				class="absolute bottom-[-10%] left-[-30%] w-[200%] h-[40%] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-pink-500 to-rose-500 animate-[aurora-flow_25s_ease-in-out_infinite_-12s]"
			></div>
		</div>

		<!-- Floating orbs -->
		<div class="absolute inset-0">
			<div
				class="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full blur-[60px] bg-gradient-to-br from-blue-500 to-transparent opacity-50 animate-[pulse_10s_ease-in-out_infinite]"
			></div>
			<div
				class="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full blur-[60px] bg-gradient-to-br from-emerald-500 to-transparent opacity-45 animate-[pulse_10s_ease-in-out_infinite_-3s]"
			></div>
			<div
				class="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] bg-gradient-to-br from-purple-500 to-transparent opacity-20 animate-[pulse_10s_ease-in-out_infinite_-6s]"
			></div>
		</div>

		<!-- Grid pattern -->
		<div
			class="absolute inset-0 bg-[linear-gradient(rgba(30,64,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] dark:bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)]"
		></div>

		<!-- Particles -->
		<div class="absolute inset-0 overflow-hidden">
			{#each Array.from({ length: 15 }, (_, i) => i) as i (i)}
				<div
					class="absolute bottom-[-10px] rounded-full animate-[particle-float_6s_ease-in-out_infinite]"
					style="left: {Math.random() * 100}%; width: {2 + Math.random() * 3}px; height: {2 +
						Math.random() *
							3}px; background: linear-gradient(135deg, #3b82f6, #10b981); animation-duration: {6 +
						Math.random() * 8}s; animation-delay: {Math.random() * 6}s;"
				></div>
			{/each}
		</div>

		<!-- Noise overlay -->
		<div
			class="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] bg-[url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;)]"
		></div>
	</div>

	<!-- Floating decorative elements -->
	<FloatingElement class="absolute top-24 left-[8%] hidden lg:block" duration={4500} amplitude={20}>
		<div
			class="w-15 h-15 rounded-2xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center shadow-xl text-blue-500 dark:text-blue-400"
		>
			<PrimaryIcon class="w-8 h-8" />
		</div>
	</FloatingElement>
	<FloatingElement
		class="absolute top-32 right-[10%] hidden lg:block"
		delay={500}
		duration={5000}
		amplitude={25}
	>
		<div
			class="w-12.5 h-12.5 rounded-xl bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-white/10 flex items-center justify-center shadow-xl text-emerald-500 dark:text-emerald-400"
		>
			<SecondaryIcon class="w-6 h-6" />
		</div>
	</FloatingElement>
	<FloatingElement
		class="absolute bottom-40 left-[15%] hidden lg:block"
		delay={1000}
		duration={4200}
		amplitude={18}
	>
		<div class="w-20 h-20 rounded-full border-2 border-blue-500/20 relative">
			<div
				class="absolute inset-2 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite]"
			></div>
		</div>
	</FloatingElement>

	<div class="container-base relative z-10 py-10 lg:py-16">
		<!-- Hero content -->
		<div class="max-w-4xl mx-auto text-center">
			<!-- Breadcrumb -->
			<ScrollReveal animation="fade" delay={100}>
				<div class="flex justify-center py-10">
					<Breadcrumb items={breadcrumbs} {locale} />
				</div>
			</ScrollReveal>

			<!-- Badge -->
			<ScrollReveal animation="scale" delay={200}>
				<div class="relative inline-flex items-center mb-6">
					<div
						class="absolute inset-[-4px] bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-30 blur-lg animate-[pulse_3s_ease-in-out_infinite]"
					></div>
					<div
						class="relative flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-full border border-blue-500/20 text-blue-500 dark:text-blue-400 text-sm font-medium"
					>
						<PrimaryIcon class="w-4 h-4" />
						<span>{badge}</span>
						<Sparkles class="w-4 h-4 animate-pulse" />
					</div>
				</div>
			</ScrollReveal>

			<!-- Title -->
			<ScrollReveal animation="fly-up" delay={300}>
				<h1
					class="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.25] mb-6 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient-shift_6s_ease_infinite]"
				>
					{title}
				</h1>
			</ScrollReveal>

			<!-- Description -->
			<ScrollReveal animation="fly-up" delay={400}>
				<p class="hero-subtitle text-lg leading-7 max-w-3xl mx-auto mb-6">
					{subtitle}
				</p>
			</ScrollReveal>

			<!-- Last updated -->
			<ScrollReveal animation="fade" delay={500}>
				<div
					class="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg border border-black/5 dark:border-white/10 text-sm"
				>
					<FileText class="w-4 h-4 hero-lastupdated-icon" />
					<span class="hero-lastupdated">{lastUpdated}</span>
				</div>
			</ScrollReveal>
		</div>
	</div>
</section>

<style>
	/* Hero Gradient - 5 stops for smooth transitions */
	.legal-hero-gradient {
		background: linear-gradient(
			135deg,
			var(--color-gray-50) 0%,
			#c7d2fe 25%,
			#bae6fd 50%,
			#d1fae5 75%,
			var(--color-gray-50) 100%
		);
	}

	:global(:root.dark) .legal-hero-gradient {
		background: linear-gradient(
			135deg,
			#030712 0%,
			#1e1b4b 25%,
			#0c1929 50%,
			#0f172a 75%,
			#030712 100%
		);
	}

	@keyframes aurora-flow {
		0%,
		100% {
			transform: translateX(-15%) rotate(-3deg);
		}
		50% {
			transform: translateX(15%) rotate(3deg);
		}
	}

	@keyframes gradient-shift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	@keyframes particle-float {
		0% {
			transform: translateY(0) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 0.7;
			transform: scale(1);
		}
		90% {
			opacity: 0.2;
		}
		100% {
			transform: translateY(-70vh) scale(0.3);
			opacity: 0;
		}
	}
</style>
