<script lang="ts">
	import { Mail, MessageCircle, Headphones, ChevronDown } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';

	interface FaqItem {
		_key: string;
		question: string;
		answer: string;
	}

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		faqItems?: FaqItem[];
		helpTitle?: string;
		helpDesc?: string;
		emailLabel?: string;
		whatsappLabel?: string;
		siteEmail?: string | null;
		siteWhatsApp?: string | null;
	}

	let {
		badge = 'FAQ',
		title = 'Frequently Asked Questions',
		subtitle = '',
		faqItems = [],
		helpTitle = 'Still have questions?',
		helpDesc = 'Our team is here to help you with any inquiries.',
		emailLabel = 'Send us an email',
		whatsappLabel = 'Chat on WhatsApp',
		siteEmail = '',
		siteWhatsApp = ''
	}: Props = $props();

	let openFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}
</script>

<section class="py-10 lg:py-16 faq-section" aria-labelledby="faq-heading">
	<div class="faq-bg" aria-hidden="true">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
		<div class="faq-grid-pattern"></div>
	</div>
	<div class="container-base relative z-10">
		<!-- Section Header -->
		<div class="text-center max-w-3xl mx-auto mb-16">
			<ScrollReveal animation="fly-up" delay={100}>
				<div
					class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-[var(--color-secondary)]/50 mb-6 badge-animate"
				>
					<MessageCircle class="w-4 h-4 text-[var(--color-secondary)]" />
					<span class="text-sm font-medium text-[#ffffff]">{badge}</span>
				</div>
			</ScrollReveal>

			<ScrollReveal animation="fly-up" delay={200}>
				<h2 id="faq-heading" class="faq-heading">
					<span>{title.split(' ').slice(0, 2).join(' ')}</span>
					<span class="faq-heading-gradient">{title.split(' ').slice(2).join(' ')}</span>
				</h2>
			</ScrollReveal>

			{#if subtitle}
				<ScrollReveal animation="fly-up" delay={300}>
					<p class="faq-description">{subtitle}</p>
				</ScrollReveal>
			{/if}
		</div>

		<!-- FAQ Accordion -->
		<div class="faq-container">
			{#each faqItems as faq, index (faq._key || index)}
				<ScrollReveal animation="fly-up" delay={100 * (index + 1)}>
					<div class="faq-item" style="--index: {index}" class:open={openFaqIndex === index}>
						<button
							class="faq-question"
							class:open={openFaqIndex === index}
							onclick={() => toggleFaq(index)}
							aria-expanded={openFaqIndex === index}
						>
							<div class="faq-question-content">
								<div class="faq-number">{String(index + 1).padStart(2, '0')}</div>
								<span class="faq-question-text">{faq.question}</span>
							</div>
							<div class="faq-icon-wrapper">
								<ChevronDown class="w-5 h-5" />
							</div>
						</button>
						<div class="faq-answer-wrapper" class:open={openFaqIndex === index}>
							<div class="faq-answer">
								<div class="faq-answer-indicator"></div>
								<p class="faq-answer-text">{faq.answer}</p>
							</div>
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		<!-- More Questions CTA -->
		<ScrollReveal animation="fly-up" delay={400}>
			<div class="text-center mt-16 faq-cta">
				<div class="faq-cta-card">
					<div class="faq-cta-icon">
						<Headphones class="w-8 h-8" />
					</div>
					<h3 class="faq-cta-title">{helpTitle}</h3>
					<p class="faq-cta-text">{helpDesc}</p>
					<div class="faq-cta-buttons">
						{#if siteEmail}
							<a href="mailto:{siteEmail}" class="faq-cta-btn primary">
								<Mail class="w-5 h-5" />
								{emailLabel}
							</a>
						{/if}
						{#if siteWhatsApp}
							<a
								href="https://wa.me/{siteWhatsApp}"
								target="_blank"
								rel="noopener noreferrer"
								class="faq-cta-btn secondary"
							>
								<MessageCircle class="w-5 h-5" />
								{whatsappLabel}
							</a>
						{/if}
					</div>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>

<style>
	.faq-section {
		position: relative;
		background: linear-gradient(
			135deg,
			var(--color-primary-dark) 0%,
			var(--color-primary) 50%,
			var(--color-secondary) 100%
		);
		overflow: hidden;
	}

	:global(.dark) .faq-section {
		background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%);
	}

	.faq-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.3;
		animation: floatOrb 15s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
		top: -100px;
		right: -100px;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, #818cf8 0%, transparent 70%);
		bottom: -50px;
		left: -50px;
		animation-delay: -5s;
	}

	.orb-3 {
		width: 250px;
		height: 250px;
		background: radial-gradient(circle, #f472b6 0%, transparent 70%);
		top: 30%;
		left: 40%;
		animation-delay: -10s;
	}

	@keyframes floatOrb {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(20px, -20px);
		}
	}

	.faq-grid-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
	}

	.badge-animate {
		animation: fadeInDown 0.6s ease-out 0.2s both;
	}

	.faq-heading {
		font-size: 2.5rem;
		font-weight: 800;
		color: white;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	@media (min-width: 768px) {
		.faq-heading {
			font-size: 3rem;
		}
	}

	.faq-heading-gradient {
		background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.faq-description {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.85);
		line-height: 1.7;
	}

	.faq-container {
		max-width: 4xl;
		margin: 0 auto;
	}

	.faq-item {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(10px);
		border-radius: 1rem;
		margin-bottom: 1rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	:global(.dark) .faq-item {
		background: rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.05);
	}

	.faq-item:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	:global(.dark) .faq-item:hover {
		background: rgba(0, 0, 0, 0.3);
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 1rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	@media (min-width: 640px) {
		.faq-question {
			padding: 1.25rem 1.5rem;
		}
	}

	.faq-question-content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.faq-number {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-secondary);
		background: rgba(16, 185, 129, 0.15);
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
	}

	.faq-question-text {
		font-weight: 600;
		color: white;
		font-size: 1rem;
	}

	.faq-icon-wrapper {
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.faq-answer-wrapper {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.4s ease;
	}

	.faq-answer-wrapper.open {
		max-height: 500px;
	}

	.faq-answer {
		padding: 0 1.5rem 1.5rem;
	}

	.faq-answer-indicator {
		width: 40px;
		height: 3px;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		border-radius: 2px;
		margin-bottom: 1rem;
	}

	.faq-answer-text {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.7;
		font-size: 0.9375rem;
	}

	.faq-cta {
		max-width: 2xl;
		margin-left: auto;
		margin-right: auto;
	}

	.faq-cta-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border-radius: 1.5rem;
		padding: 2rem 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		text-align: center;
	}

	@media (min-width: 640px) {
		.faq-cta-card {
			padding: 3rem 2rem;
		}
	}

	:global(.dark) .faq-cta-card {
		background: rgba(0, 0, 0, 0.2);
		border-color: rgba(255, 255, 255, 0.05);
	}

	.faq-cta-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.faq-cta-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.75rem;
	}

	.faq-cta-text {
		color: rgba(255, 255, 255, 0.75);
		margin-bottom: 2rem;
	}

	.faq-cta-buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
	}

	.faq-cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		border-radius: 0.75rem;
		font-weight: 600;
		font-size: 0.9375rem;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.faq-cta-btn.primary {
		background: white;
		color: var(--color-primary);
	}

	.faq-cta-btn.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
	}

	.faq-cta-btn.secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.faq-cta-btn.secondary:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	:global(.dark) .faq-section .badge-animate {
		background-color: rgba(255, 255, 255, 0.1) !important;
		border-color: var(--color-secondary) !important;
	}
</style>
