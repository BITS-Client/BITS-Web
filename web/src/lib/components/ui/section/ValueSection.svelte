<script lang="ts">
	import { Sparkles } from '$lib/icons/lucide';
	import WaveHeader from '$lib/components/ui/header/WaveHeader.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';
	import ValueCard from '../card/ValueCard.svelte';
	import TeamCTA from '$lib/components/ui/cta/GeneralCTA.svelte';

	interface PrincipleItem {
		icon: typeof import('$lib/icons/lucide').Heart;
		title: string;
		description: string;
		color: string;
	}

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		ready?: string;
		readySubtitle?: string;
		connect?: string;
		contactUrl?: string;
		principles?: PrincipleItem[];
	}

	let {
		badge = '',
		title = '',
		subtitle = '',
		ready = '',
		readySubtitle = '',
		connect = '',
		contactUrl = '/contact',
		principles = []
	}: Props = $props();
</script>

<section class="values-section-new" aria-labelledby="values-heading">
	<Background gradientTheme="coral" />

	<div class="container-base relative z-10 py-10 lg:py-16">
		<WaveHeader {badge} {title} {subtitle} headingId="values-heading" badgeIcon={Sparkles} />

		<div class="values-bento-grid">
			{#each principles as item, index (item.title)}
				<ValueCard
					title={item.title}
					description={item.description}
					color={item.color}
					icon={item.icon}
					{index}
				/>
			{/each}
		</div>

		{#if ready || connect}
			<TeamCTA title={ready} subtitle={readySubtitle} button={connect} {contactUrl} />
		{/if}
	</div>
</section>

<style>
	.values-section-new {
		position: relative;
		overflow: hidden;
	}

	.values-bento-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.values-bento-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.values-bento-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
