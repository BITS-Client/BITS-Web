<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Home } from '$lib/icons/lucide';
	import { fade, fly } from 'svelte/transition';

	let { data: _data }: { data?: Record<string, unknown> } = $props();

	const error = $derived($page.error);

	let isVisible = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);

	const status = $derived($page.status);
	const message = $derived(error?.message || 'Something went wrong');
	const lang = $derived($page.params.lang || 'id');

	onMount(() => {
		isVisible = true;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	function getErrorTitle(status: number, lang: string) {
		if (status === 404) {
			return lang === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found';
		}
		if (status === 500) {
			return lang === 'id' ? 'Kesalahan Server' : 'Server Error';
		}
		return lang === 'id' ? 'Ups!' : 'Oops!';
	}

	function getErrorDesc(status: number, lang: string) {
		if (status === 404) {
			return lang === 'id'
				? 'Halaman yang Anda cari tidak ditemukan atau telah dihapus.'
				: "Oops! The page you're looking for doesn't exist.";
		}
		if (status === 500) {
			return lang === 'id'
				? 'Terjadi kesalahan di sisi server. Silakan coba lagi.'
				: 'Something went wrong on our end. Please try again.';
		}
		return lang === 'id'
			? 'Terjadi kesalahan yang tidak terduga.'
			: 'Something unexpected happened.';
	}

	function getButtonLabel(lang: string) {
		return lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home';
	}

	const errorInfo = $derived({
		icon: status === 404 ? '🔍' : status === 500 ? '⚡' : '❓',
		title: getErrorTitle(status, lang),
		desc: getErrorDesc(status, lang),
		buttonLabel: getButtonLabel(lang)
	});
</script>

<svelte:head>
	<title>{errorInfo.title} | BITS</title>
</svelte:head>

<div class="error-page" style:transform="translate({mouseX}px, {mouseY}px)">
	<div class="error-bg">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
		<div class="grid-overlay"></div>
	</div>

	<div class="floating-elements">
		{#each Array(12) as _, i (i)}
			<div
				class="floating-shape"
				style="
					left: {Math.random() * 100}%;
					animation-delay: {i * 0.5}s;
					animation-duration: {15 + Math.random() * 10}s;
				"
			></div>
		{/each}
	</div>

	<div class="error-content">
		{#if isVisible}
			<div class="error-code" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
				<span class="code-text">{status}</span>
				<div class="code-glow"></div>
			</div>

			<div class="error-icon" in:fly={{ y: 30, duration: 800, delay: 400 }}>
				{errorInfo.icon}
			</div>

			<h1 class="error-title" in:fly={{ y: 30, duration: 800, delay: 600 }}>
				{errorInfo.title}
			</h1>

			<p class="error-description" in:fly={{ y: 30, duration: 800, delay: 800 }}>
				{errorInfo.desc}
			</p>

			{#if message && status !== 404}
				<p class="error-message" in:fade={{ duration: 600, delay: 1000 }}>
					{message}
				</p>
			{/if}

			<div class="error-actions" in:fly={{ y: 30, duration: 800, delay: 1000 }}>
				<a href="/" class="btn btn-primary">
					<Home class="w-5 h-5" />
					<span>{errorInfo.buttonLabel}</span>
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Note: Do NOT use :global() overflow styles here as they break sticky positioning site-wide */

	.error-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		overflow-x: clip; /* Use clip instead of hidden to prevent horizontal scroll without breaking sticky */
		max-width: 100vw;
		background: #0a0a0a;
		color: white;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe Error', Roboto, sans-serif;
	}

	.error-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.4;
		animation: float 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		top: -200px;
		right: -200px;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 500px;
		height: 500px;
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		bottom: -150px;
		left: -150px;
		animation-delay: -7s;
	}

	.orb-3 {
		width: 400px;
		height: 400px;
		background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: -14s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(50px, -50px) scale(1.1);
		}
		50% {
			transform: translate(-30px, 30px) scale(0.9);
		}
		75% {
			transform: translate(40px, 40px) scale(1.05);
		}
	}

	.grid-overlay {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		animation: gridMove 20s linear infinite;
	}

	@keyframes gridMove {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(50px, 50px);
		}
	}

	.floating-elements {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.floating-shape {
		position: absolute;
		width: 4px;
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		animation: floatShape linear infinite;
	}

	@keyframes floatShape {
		0% {
			transform: translateY(100vh) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100vh) scale(1);
			opacity: 0;
		}
	}

	.error-content {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: 2rem;
		max-width: 700px;
	}

	.error-code {
		position: relative;
		margin-bottom: 2rem;
	}

	.code-text {
		font-size: 12rem;
		font-weight: 900;
		line-height: 1;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		filter: drop-shadow(0 0 60px rgba(102, 126, 234, 0.3));
		animation: pulse 3s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 60px rgba(102, 126, 234, 0.3));
		}
		50% {
			filter: drop-shadow(0 0 80px rgba(102, 126, 234, 0.5));
		}
	}

	.error-icon {
		font-size: 4rem;
		margin-bottom: 1.5rem;
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-15px);
		}
	}

	.error-title {
		font-size: 2.5rem;
		font-weight: 800;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.error-description {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	.error-message {
		font-size: 0.875rem;
		color: rgba(255, 100, 100, 0.7);
		padding: 0.75rem 1rem;
		background: rgba(255, 0, 0, 0.1);
		border-radius: 0.5rem;
		margin-bottom: 2rem;
		font-family: monospace;
	}

	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 3rem;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.75rem;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 0.9375rem;
		text-decoration: none;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
	}

	.btn-primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
	}

	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
	}

	@media (max-width: 640px) {
		.code-text {
			font-size: 8rem;
		}

		.error-title {
			font-size: 1.75rem;
		}

		.error-actions {
			flex-direction: column;
		}

		.btn {
			justify-content: center;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
