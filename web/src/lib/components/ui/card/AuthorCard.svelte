<script lang="ts">
	interface Author {
		name: string;
		role: string;
		bio: string;
		avatar: string;
	}

	interface Props {
		author: Author;
		writtenByLabel: string;
	}

	let { author, writtenByLabel }: Props = $props();
</script>

<div class="author-card">
	<div class="author-card-bg"></div>
	<div class="author-card-content">
		<div class="author-card-avatar">
			{#if author.avatar}
				<img
					src={author.avatar}
					alt={author.name || 'Author'}
					class="author-avatar-img"
					onerror={(e) => {
						const target = e.target as HTMLImageElement;
						target.style.display = 'none';
						if (target.nextElementSibling) {
							(target.nextElementSibling as HTMLElement).style.display = 'flex';
						}
					}}
				/>
				<span class="author-initials" style="display: none;">{author.name?.charAt(0) || 'B'}</span>
			{:else}
				<span class="author-initials">{author.name?.charAt(0) || 'B'}</span>
			{/if}
		</div>
		<div class="author-card-info">
			<span class="author-card-label">{writtenByLabel}</span>
			<h3 class="author-card-name">{author.name || 'Banten IT Solutions Team'}</h3>
			<p class="author-card-role">{author.role || 'Content Team'}</p>
			<p class="author-card-bio">
				{author.bio ||
					'Our team of experts shares insights and knowledge about technology, business solutions, and digital transformation.'}
			</p>
		</div>
	</div>
</div>

<style>
	.author-card {
		position: relative;
		margin-top: 3rem;
		border-radius: 1.5rem;
		overflow: hidden;
	}

	.author-card-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, var(--color-primary) 0%, #4f46e5 100%);
	}

	.author-card-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	@media (min-width: 640px) {
		.author-card-content {
			flex-direction: row;
			text-align: left;
			gap: 1.5rem;
		}
	}

	.author-card-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 700;
		font-size: 2rem;
		flex-shrink: 0;
		margin-bottom: 1rem;
		overflow: hidden;
		position: relative;
	}

	@media (min-width: 640px) {
		.author-card-avatar {
			margin-bottom: 0;
		}
	}

	.author-avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
	}

	.author-initials {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.author-card-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.author-card-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
		margin: 0.25rem 0;
	}

	.author-card-role {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 0.75rem;
	}

	.author-card-bio {
		font-size: 0.9375rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.6;
	}
</style>
