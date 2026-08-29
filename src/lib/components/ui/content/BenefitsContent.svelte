<script lang="ts">
	import { Check } from '$lib/icons/lucide';

	interface BenefitItem {
		title: string;
	}

	interface StatItem {
		value: string;
		label: string;
	}

	interface Props {
		benefits: BenefitItem[];
		stats?: StatItem[];
	}

	let { benefits = [], stats = [] }: Props = $props();
</script>

<div class="benefits-layout">
	<div class="benefits-cards">
		{#each benefits as benefit, i (i)}
			<div class="benefit-card">
				<div class="benefit-check">
					<Check size={14} />
				</div>
				<span class="benefit-text">{benefit.title}</span>
			</div>
		{/each}
	</div>

	<div class="benefits-stats">
		<div class="stats-grid">
			{#if stats.length > 0}
				{#each stats as stat, i (i)}
					<div class="stat-item">
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
					</div>
				{/each}
			{:else}
				<div class="stat-item">
					<span class="stat-value">500+</span>
					<span class="stat-label">Projects</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">98%</span>
					<span class="stat-label">Satisfaction</span>
				</div>
				<div class="stat-item">
					<span class="stat-value">24/7</span>
					<span class="stat-label">Support</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.benefits-layout {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 2rem;
	}

	@media (max-width: 900px) {
		.benefits-layout {
			grid-template-columns: 1fr;
		}
	}

	.benefits-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 0.625rem;
		align-content: start;
		height: 100%;
	}

	@media (max-width: 640px) {
		.benefits-cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.benefit-card {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 0.75rem;
		background: transparent;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}

	:global(:root.dark) .benefit-card {
		background: transparent;
		border-color: rgba(255, 255, 255, 0.1);
	}

	.benefit-card:hover {
		background: white;
		border-color: transparent;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	:global(:root.dark) .benefit-card:hover {
		background: #1e293b;
		border-color: transparent;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.benefit-check {
		width: 22px;
		height: 22px;
		min-width: 22px;
		background: linear-gradient(135deg, #667eea, #764ba2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.benefit-text {
		font-size: 0.8125rem;
		font-weight: 500;
		color: #1a1a1a;
		line-height: 1.3;
	}

	:global(:root.dark) .benefit-text {
		color: #e2e8f0;
	}

	.benefits-stats {
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
		border: 1px solid rgba(102, 126, 234, 0.1);
		border-radius: 0.75rem;
		padding: 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	:global(:root.dark) .benefits-stats {
		background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
		border-color: rgba(102, 126, 234, 0.2);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		display: block;
		font-size: 1.75rem;
		font-weight: 800;
		background: linear-gradient(135deg, #667eea, #764ba2);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.25rem;
		line-height: 1.2;
	}

	.stat-label {
		display: block;
		font-size: 0.6875rem;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 500;
	}

	:global(:root.dark) .stat-label {
		color: #94a3b8;
	}

	@media (max-width: 480px) {
		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.5rem;
		}

		.stat-value {
			font-size: 1.25rem;
		}

		.stat-label {
			font-size: 0.6875rem;
		}
	}
</style>
