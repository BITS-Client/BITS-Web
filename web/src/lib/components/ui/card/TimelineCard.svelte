<script lang="ts">
	interface TimelineCardProps {
		year: string;
		title: string;
		description: string;
		icon: typeof import('$lib/icons/lucide').Star;
	}

	let { year, title, description, icon: Icon }: TimelineCardProps = $props();
</script>

<div class="timeline-card scroll-animate">
	<div class="card-hologram">
		<div class="holo-grid"></div>
		<div class="holo-scan"></div>
	</div>
	<div class="card-layout">
		<div class="icon-year-group">
			<div class="card-icon">
				<div class="icon-energy-field">
					<div class="energy-ring er-1"></div>
				</div>
				<div class="icon-container">
					<Icon class="w-5 h-5" />
				</div>
			</div>
			<span class="card-year">{year}</span>
		</div>

		<div class="card-content">
			<h3 class="card-title">{title}</h3>
			<p class="card-desc">{description}</p>
		</div>
	</div>
</div>

<style>
	.timeline-card {
		position: relative;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0.75rem;
		padding: 1rem;
		backdrop-filter: blur(10px);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	:global(.light) .timeline-card {
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.08);
	}

	.timeline-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}

	:global(.light) .timeline-card:hover {
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
	}

	.card-hologram {
		position: absolute;
		inset: 0;
		border-radius: 0.75rem;
		overflow: hidden;
		pointer-events: none;
	}

	.holo-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 16px 16px;
	}

	:global(.light) .holo-grid {
		background-image:
			linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
	}

	.holo-scan {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.02), transparent);
		animation: holoScan 4s linear infinite;
	}

	:global(.light) .holo-scan {
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.02), transparent);
	}

	@keyframes holoScan {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(100%);
		}
	}

	.card-layout {
		display: flex;
		gap: 0.75rem;
	}

	.icon-year-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.card-icon {
		position: relative;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.125rem;
	}

	.icon-energy-field {
		position: absolute;
		inset: 0;
	}

	.energy-ring {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	:global(.light) .energy-ring {
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.er-1 {
		width: 100%;
		height: 100%;
		animation: energyRingPulse 2s ease-in-out infinite;
	}

	@keyframes energyRingPulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.3;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.6;
		}
	}

	.icon-container {
		width: 32px;
		height: 32px;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	:global(.light) .icon-container {
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.04));
		color: #1f2937;
	}

	.card-year {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		color: #3b82f6;
		letter-spacing: 0.05em;
	}

	:global(.light) .card-year {
		color: #2563eb;
	}

	.card-content {
		flex: 1;
		min-width: 0;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: white;
		margin-bottom: 0.25rem;
	}

	:global(.light) .card-title {
		color: #111827;
	}

	.card-desc {
		font-size: 0.8125rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.5;
	}

	:global(.light) .card-desc {
		color: rgba(0, 0, 0, 0.7);
	}
</style>
