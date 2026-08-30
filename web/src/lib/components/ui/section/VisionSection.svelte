<script lang="ts">
	import { Heart } from '$lib/icons/lucide';
	import WaveHeader from '$lib/components/ui/header/WaveHeader.svelte';
	import VisionCard from '../card/VisionCard.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		visionTitle?: string;
		visionDesc?: string;
		missionTitle?: string;
		missionDesc?: string;
	}

	let {
		badge = '',
		title = '',
		subtitle = '',
		visionTitle = '',
		visionDesc = '',
		missionTitle = '',
		missionDesc = ''
	}: Props = $props();
</script>

<section class="mission-vision-section" aria-labelledby="mission-vision-heading">
	<Background gradientTheme="teal" />

	<div class="container-base relative z-10 py-10 lg:py-16">
		<WaveHeader {badge} {title} {subtitle} headingId="mission-vision-heading" badgeIcon={Heart} />

		<div class="grid md:grid-cols-2 gap-5 lg:gap-6">
			<VisionCard title={visionTitle} description={visionDesc} icon="✦" index={0} type="vision" />

			<VisionCard
				title={missionTitle}
				description={missionDesc}
				icon="✦"
				index={1}
				type="mission"
			/>
		</div>
	</div>
</section>

<style>
	.mission-vision-section {
		position: relative;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
		overflow: hidden;
	}

	:global(.dark) .mission-vision-section {
		background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%);
	}
</style>
