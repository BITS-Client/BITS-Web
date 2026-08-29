<script lang="ts">
	import { Instagram, Github, Youtube } from 'lucide-svelte';

	interface Props {
		name: string;
		role: string;
		bio?: string;
		image?: string;
		initials?: string;
		index?: number;
		social?: {
			instagram?: string;
			github?: string;
			youtube?: string;
		};
	}

	let {
		name = '',
		role = '',
		bio = '',
		image = '',
		initials = '',
		index = 0,
		social = {}
	}: Props = $props();

	let isHovered = $state(false);
</script>

<div
	class="member-card"
	style="--index: {index}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	role="group"
>
	<div class="card-inner">
		<div class="avatar-wrapper">
			<div class="avatar-ring"></div>
			<div class="avatar-glow"></div>
			<div class="avatar">
				{#if image}
					<img src={image} alt={name} class="avatar-img" />
				{:else}
					<span class="avatar-fallback">{initials}</span>
				{/if}
			</div>
		</div>

		<div class="info">
			<h3 class="name">{name}</h3>
			<p class="role">{role}</p>
			{#if bio}
				<p class="bio" class:visible={isHovered}>{bio}</p>
			{/if}
		</div>

		<div class="social-row" class:expanded={isHovered}>
			{#if social?.instagram}
				<a
					href={social.instagram}
					target="_blank"
					rel="noopener noreferrer"
					class="social-btn"
					aria-label="Instagram"
				>
					<Instagram size={16} />
				</a>
			{/if}
			{#if social?.github}
				<a
					href={social.github}
					target="_blank"
					rel="noopener noreferrer"
					class="social-btn"
					aria-label="GitHub"
				>
					<Github size={16} />
				</a>
			{/if}
			{#if social?.youtube}
				<a
					href={social.youtube}
					target="_blank"
					rel="noopener noreferrer"
					class="social-btn"
					aria-label="YouTube"
				>
					<Youtube size={16} />
				</a>
			{/if}
		</div>
	</div>

	<div class="decoration top-left"></div>
	<div class="decoration top-right"></div>
	<div class="decoration bottom-left"></div>
	<div class="decoration bottom-right"></div>
</div>

<style>
	.member-card {
		position: relative;
		padding: 0.375rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
		border-radius: 1.25rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	:global(:root:not(.dark)) .member-card {
		background: linear-gradient(135deg, white, rgba(255, 255, 255, 0.8));
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.member-card:hover {
		transform: translateY(-4px);
	}

	.card-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 1.25rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 1rem;
		overflow: hidden;
	}

	:global(:root:not(.dark)) .card-inner {
		background: #f1f5f9;
		border: 1px solid rgba(0, 0, 0, 0.15);
	}

	.avatar-wrapper {
		position: relative;
		width: 96px;
		height: 96px;
		margin-bottom: 1rem;
	}

	.avatar-ring {
		position: absolute;
		inset: -4px;
		border-radius: 50%;
		border: 2px solid transparent;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5)) border-box;
		mask:
			linear-gradient(#fff 0 0) padding-box,
			linear-gradient(#fff 0 0);
		mask-composite: xor;
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		transition:
			transform 0.5s ease,
			opacity 0.5s ease;
	}

	:global(.light) .avatar-ring {
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4)) border-box;
	}

	.member-card:hover .avatar-ring {
		transform: rotate(180deg);
	}

	.avatar-glow {
		position: absolute;
		inset: -15px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.member-card:hover .avatar-glow {
		opacity: 1;
	}

	.avatar {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		overflow: hidden;
		background: linear-gradient(135deg, #1e1b4b, #312e81);
	}

	:global(.light) .avatar {
		background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 1.75rem;
		font-weight: 700;
		background: linear-gradient(135deg, #8b5cf6, #3b82f6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.info {
		text-align: center;
		margin-bottom: 0.875rem;
	}

	.name {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.25rem;
		transition: background 0.3s ease;
	}

	:global(.light) .name {
		color: #111827;
	}

	.member-card:hover .name {
		background: linear-gradient(135deg, #a78bfa, #60a5fa);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.role {
		font-size: 0.8rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 0.5rem;
	}

	:global(.light) .role {
		color: rgba(0, 0, 0, 0.6);
	}

	.bio {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.5);
		line-height: 1.5;
		max-height: 0;
		overflow: hidden;
		opacity: 0;
		transition: all 0.3s ease;
	}

	:global(.light) .bio {
		color: rgba(0, 0, 0, 0.5);
	}

	.bio.visible {
		max-height: 60px;
		opacity: 1;
	}

	.social-row {
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 9999px;
	}

	:global(.light) .social-row {
		background: rgba(0, 0, 0, 0.04);
	}

	.social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: rgba(255, 255, 255, 0.7);
		transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	:global(.light) .social-btn {
		color: rgba(0, 0, 0, 0.6);
	}

	.social-btn:hover {
		color: white;
		background: linear-gradient(135deg, #8b5cf6, #3b82f6);
		transform: scale(1.1);
	}

	:global(.light) .social-btn:hover {
		color: white;
	}

	.decoration {
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 2px;
		background: rgba(139, 92, 246, 0.4);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	:global(.light) .decoration {
		background: rgba(139, 92, 246, 0.3);
	}

	.member-card:hover .decoration {
		opacity: 1;
	}

	.top-left {
		top: 0.5rem;
		left: 0.5rem;
	}

	.top-right {
		top: 0.5rem;
		right: 0.5rem;
		transform: rotate(90deg);
	}

	.bottom-left {
		bottom: 0.5rem;
		left: 0.5rem;
		transform: rotate(-90deg);
	}

	.bottom-right {
		bottom: 0.5rem;
		right: 0.5rem;
		transform: rotate(180deg);
	}
</style>
