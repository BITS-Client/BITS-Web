<script lang="ts">
	import type { Component } from 'svelte';
	import { Mail, Phone, MessageCircle } from '$lib/icons/lucide';

	interface Props {
		href?: string;
		icon?: 'mail' | 'phone' | 'whatsapp' | 'custom';
		label?: string;
		isExternal?: boolean;
		className?: string;
		customIcon?: Component;
	}

	let {
		href = '',
		icon = 'custom',
		label = '',
		isExternal = false,
		className = '',
		customIcon = undefined
	}: Props = $props();

	let IconComponent = $derived(
		icon === 'mail'
			? Mail
			: icon === 'phone'
				? Phone
				: icon === 'whatsapp'
					? MessageCircle
					: customIcon || Mail
	);
</script>

{#if href && href.length > 0}
	<a
		{href}
		class="quick-contact-card {className}"
		{...isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
	>
		{#if IconComponent}
			{@const DynamicIcon = IconComponent}
			<DynamicIcon class="w-6 h-6" />
		{/if}
		<span>{label}</span>
	</a>
{:else}
	<div class="quick-contact-card {className}">
		{#if IconComponent}
			{@const DynamicIcon = IconComponent}
			<DynamicIcon class="w-6 h-6" />
		{/if}
		<span>{label}</span>
	</div>
{/if}

<style>
	.quick-contact-card {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background: white;
		border-radius: 1rem;
		text-decoration: none;
		color: var(--color-gray-900);
		font-weight: 600;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
		border: 1px solid rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
	}

	.quick-contact-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
	}

	.quick-contact-card :global(.w-6.h-6) {
		color: var(--color-primary);
	}

	:global(.dark) .quick-contact-card {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	}

	:global(.dark) .quick-contact-card:hover {
		background: rgba(255, 255, 255, 0.15);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
	}

	:global(.dark) .quick-contact-card :global(.w-6.h-6) {
		color: var(--color-secondary);
	}
</style>
