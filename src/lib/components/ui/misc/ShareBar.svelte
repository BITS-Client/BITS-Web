<script lang="ts">
	import {
		Twitter,
		Linkedin,
		Facebook,
		MessageSquare,
		Mail,
		Check,
		Send,
		MessageCircle
	} from '$lib/icons/lucide';
	import { Copy } from '@lucide/svelte';

	interface Props {
		copied: boolean;
		oncopy: () => void;
		onshareTwitter: () => void;
		onshareLinkedIn: () => void;
		onshareFacebook: () => void;
		onshareWhatsApp: () => void;
		onshareTelegram: () => void;
		onshareThreads: () => void;
		onshareEmail: () => void;
		shareTitle?: string;
		showMobile?: boolean;
	}

	let {
		copied,
		oncopy,
		onshareTwitter,
		onshareLinkedIn,
		onshareFacebook,
		onshareWhatsApp,
		onshareTelegram,
		onshareThreads,
		onshareEmail,
		shareTitle = 'Share Article',
		showMobile = false
	}: Props = $props();
</script>

<!-- Desktop Share Bar -->
<div class="share-bar">
	<span class="share-label">Share</span>

	<button class="share-btn whatsapp" onclick={onshareWhatsApp} aria-label="Share on WhatsApp">
		<MessageSquare class="share-icon" />
	</button>

	<button class="share-btn facebook" onclick={onshareFacebook} aria-label="Share on Facebook">
		<Facebook class="share-icon" />
	</button>

	<button class="share-btn telegram" onclick={onshareTelegram} aria-label="Share on Telegram">
		<Send class="share-icon" />
	</button>

	<button class="share-btn twitter" onclick={onshareTwitter} aria-label="Share on Twitter">
		<Twitter class="share-icon" />
	</button>

	<button class="share-btn linkedin" onclick={onshareLinkedIn} aria-label="Share on LinkedIn">
		<Linkedin class="share-icon" />
	</button>

	<button class="share-btn threads" onclick={onshareThreads} aria-label="Share on Threads">
		<MessageCircle class="share-icon" />
	</button>

	<div class="share-divider"></div>

	<button class="share-btn email" onclick={onshareEmail} aria-label="Share via Email">
		<Mail class="share-icon" />
	</button>

	<button class="share-btn copy" onclick={oncopy} aria-label="Copy link">
		{#if copied}
			<Check class="share-icon" />
		{:else}
			<Copy class="share-icon" />
		{/if}
	</button>
</div>

<!-- Mobile Share Section -->
{#if showMobile}
	<div class="share-section-mobile">
		<h3 class="share-title">{shareTitle}</h3>
		<div class="share-buttons">
			<button class="mobile-share-btn twitter" onclick={onshareTwitter}>
				<Twitter class="w-5 h-5" />
				<span>Twitter</span>
			</button>
			<button class="mobile-share-btn linkedin" onclick={onshareLinkedIn}>
				<Linkedin class="w-5 h-5" />
				<span>LinkedIn</span>
			</button>
			<button class="mobile-share-btn facebook" onclick={onshareFacebook}>
				<Facebook class="w-5 h-5" />
				<span>Facebook</span>
			</button>
			<button class="mobile-share-btn copy" onclick={oncopy}>
				{#if copied}
					<Check class="w-5 h-5" />
					<span>Copied</span>
				{:else}
					<Copy class="w-5 h-5" />
					<span>Copy Link</span>
				{/if}
			</button>
		</div>
	</div>
{/if}

<style>
	.share-bar {
		display: none;
		position: sticky;
		top: 8rem;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 0.75rem;
		background: #ffffff;
		border-radius: 2rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.15),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
		border: 1px solid #94a3b8; /* Solid Slate-400 */
	}

	@media (min-width: 1200px) {
		.share-bar {
			display: flex;
		}
	}

	:global(.dark) .share-bar {
		background: var(--color-bg-secondary);
		box-shadow: none;
		border-color: rgba(255, 255, 255, 0.1);
	}

	.share-label {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--color-gray-500);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}

	.share-btn {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		color: var(--color-gray-500);
		transition: all 0.3s ease;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		border: 1px solid rgba(0, 0, 0, 0.15);
	}

	:global(.dark) .share-btn {
		background: var(--color-bg);
		color: var(--color-gray-400);
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow: none;
	}

	.share-btn:hover {
		transform: translateY(-2px);
	}

	.share-btn.twitter:hover {
		background: #1da1f2;
		color: white;
	}

	.share-btn.linkedin:hover {
		background: #0a66c2;
		color: white;
	}

	.share-btn.facebook:hover {
		background: #1877f2;
		color: white;
	}

	.share-btn.copy:hover {
		background: var(--color-primary);
		color: white;
	}

	.share-btn.whatsapp:hover {
		background: #25d366;
		color: white;
	}

	.share-btn.telegram:hover {
		background: #0088cc;
		color: white;
	}

	.share-btn.email:hover {
		background: var(--color-gray-700);
		color: white;
	}

	.share-btn.threads:hover {
		background: linear-gradient(135deg, #000000 0%, #333333 100%);
		color: white;
	}

	.share-divider {
		width: 24px;
		height: 1px;
		background: var(--color-gray-200);
		margin: 0.5rem 0;
	}

	:global(.dark) .share-divider {
		background: var(--color-gray-700);
	}

	.share-section-mobile {
		margin-top: 2rem;
		padding: 1.5rem;
		background: var(--color-gray-50);
		border-radius: 1rem;
	}

	:global(.dark) .share-section-mobile {
		background: var(--color-bg-secondary);
	}

	@media (min-width: 1200px) {
		.share-section-mobile {
			display: none;
		}
	}

	.share-title {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-gray-900);
		margin-bottom: 1rem;
	}

	:global(.dark) .share-title {
		color: white;
	}

	.share-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.mobile-share-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.mobile-share-btn.twitter {
		background: #e8f5fd;
		color: #1da1f2;
	}

	.mobile-share-btn.twitter:hover {
		background: #1da1f2;
		color: white;
	}

	.mobile-share-btn.linkedin {
		background: #e8f1f8;
		color: #0a66c2;
	}

	.mobile-share-btn.linkedin:hover {
		background: #0a66c2;
		color: white;
	}

	.mobile-share-btn.facebook {
		background: #e8f0fe;
		color: #1877f2;
	}

	.mobile-share-btn.facebook:hover {
		background: #1877f2;
		color: white;
	}

	.mobile-share-btn.copy {
		background: var(--color-gray-100);
		color: var(--color-gray-700);
	}

	.mobile-share-btn.copy:hover {
		background: var(--color-primary);
		color: white;
	}
</style>
