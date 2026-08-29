<script lang="ts">
	import { Mail, Phone, MapPin, ExternalLink } from '$lib/icons/lucide';

	interface Props {
		email?: string | null;
		phone?: string | null;
		address?: string | null;
		emailLabel?: string;
		phoneLabel?: string;
		addressLabel?: string;
		title?: string;
	}

	let {
		email = '',
		phone = '',
		address = '',
		emailLabel = 'Email',
		phoneLabel = 'Phone',
		addressLabel = 'Address',
		title = 'Contact Information'
	}: Props = $props();
</script>

<div class="contact-info-card">
	<div class="contact-info-glow"></div>
	<div class="contact-info-inner">
		<div class="contact-info-header">
			<div class="contact-info-icon-wrapper">
				<div class="contact-info-icon-bg"></div>
				<div class="contact-info-icon">
					<Mail class="w-6 h-6" />
				</div>
			</div>
			<h2 class="contact-info-title">{title}</h2>
		</div>

		<div class="contact-info-grid">
			{#if email}
				<a href={'mailto:' + email} class="contact-info-item">
					<div class="contact-info-item-icon">
						<Mail class="w-5 h-5" />
					</div>
					<div class="contact-info-item-content">
						<span class="contact-info-label">{emailLabel}</span>
						<span class="contact-info-value">{email}</span>
					</div>
					<ExternalLink class="w-4 h-4 contact-info-external" />
				</a>
			{/if}

			{#if phone}
				<a href={'tel:' + phone} class="contact-info-item">
					<div class="contact-info-item-icon">
						<Phone class="w-5 h-5" />
					</div>
					<div class="contact-info-item-content">
						<span class="contact-info-label">{phoneLabel}</span>
						<span class="contact-info-value">{phone}</span>
					</div>
					<ExternalLink class="w-4 h-4 contact-info-external" />
				</a>
			{/if}

			{#if address}
				<a
					href="https://www.google.com/maps/search/{encodeURIComponent(address)}"
					target="_blank"
					rel="noopener noreferrer"
					class="contact-info-item contact-info-address"
				>
					<div class="contact-info-item-icon">
						<MapPin class="w-5 h-5" />
					</div>
					<div class="contact-info-item-content">
						<span class="contact-info-label">{addressLabel}</span>
						<span class="contact-info-value">{address}</span>
					</div>
					<ExternalLink class="w-4 h-4 contact-info-external" />
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.contact-info-card {
		position: relative;
		border-radius: 1.5rem;
		overflow: hidden;
		background: #ffffff;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
		border: 1px solid #94a3b8;
	}

	@media (min-width: 640px) {
		.contact-info-card {
			box-shadow:
				0 20px 40px -4px rgba(0, 0, 0, 0.1),
				0 8px 16px -4px rgba(0, 0, 0, 0.08);
		}
	}

	:global(.dark) .contact-info-card {
		background: var(--color-bg-secondary);
		box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.contact-info-inner {
		padding: 1.25rem;
		background: inherit;
		backdrop-filter: none;
	}

	@media (min-width: 640px) {
		.contact-info-inner {
			padding: 1.5rem;
		}
	}

	.contact-info-header {
		text-align: center;
		margin-bottom: 1.5rem;
		position: relative;
	}

	.contact-info-icon-wrapper {
		position: relative;
		width: 70px;
		height: 70px;
		margin: 0 auto 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.contact-info-icon-bg {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
		animation: iconPulse 3s ease-in-out infinite;
		opacity: 0.2;
	}

	@keyframes iconPulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.3;
		}
	}

	.contact-info-icon {
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 1rem;
		background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		box-shadow: 0 8px 20px rgba(30, 64, 175, 0.3);
		animation: iconFloat 4s ease-in-out infinite;
	}

	@keyframes iconFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	:global(.dark) .contact-info-icon {
		background: linear-gradient(135deg, var(--color-secondary), #059669);
		box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
	}

	.contact-info-title {
		font-size: 1.5rem;
		font-weight: 800;
		color: var(--color-gray-900);
		margin-bottom: 0.375rem;
		background: linear-gradient(
			135deg,
			var(--color-gray-900) 0%,
			var(--color-primary) 50%,
			var(--color-secondary) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	:global(.dark) .contact-info-title {
		background: linear-gradient(
			135deg,
			#ffffff 0%,
			var(--color-secondary) 50%,
			var(--color-primary) 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
	}

	.contact-info-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.contact-info-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem;
		background: var(--color-gray-50);
		border-radius: 0.625rem;
		transition: all 0.3s ease;
		text-decoration: none;
		color: inherit;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
		border: 1px solid #94a3b8; /* Solid Slate-400 */
		max-width: 100%;
		overflow: hidden;
	}

	:global(.dark) .contact-info-item {
		background: rgba(255, 255, 255, 0.03);
		border-color: rgba(255, 255, 255, 0.05);
	}

	.contact-info-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	:global(.dark) .contact-info-item:hover {
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.contact-info-address {
		cursor: pointer;
	}

	.contact-info-address:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}

	:global(.dark) .contact-info-address:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.contact-info-item-icon {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 0.5rem;
		background: rgba(30, 64, 175, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-primary);
	}

	:global(.dark) .contact-info-item-icon {
		background: rgba(16, 185, 129, 0.15);
		color: var(--color-secondary);
	}

	.contact-info-item-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.contact-info-label {
		font-weight: 600;
		color: var(--color-gray-900);
		font-size: 0.9375rem;
		margin-bottom: 0.125rem;
	}

	:global(.dark) .contact-info-label {
		color: white;
	}

	.contact-info-value {
		font-size: 0.75rem;
		color: var(--color-gray-500);
		word-break: break-word;
	}

	:global(.dark) .contact-info-value {
		color: #cbd5e1;
	}

	@media (min-width: 768px) {
		.contact-info-grid {
			flex-direction: row;
			flex-wrap: wrap;
		}

		.contact-info-item {
			flex: 1;
			min-width: 200px;
		}
	}
</style>
