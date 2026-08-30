<script lang="ts">
	import { Users } from '$lib/icons/lucide';
	import TeamCard from '$lib/components/ui/card/TeamCard.svelte';
	import GeneralCTA from '$lib/components/ui/cta/GeneralCTA.svelte';
	import WaveHeader from '$lib/components/ui/header/WaveHeader.svelte';
	import Background from '$lib/components/ui/misc/Background.svelte';

	interface TeamMember {
		name: string;
		role: string;
		bio?: string;
		image?: string;
		initials?: string;
		social?: {
			instagram?: string;
			github?: string;
			youtube?: string;
		};
	}

	interface CTAProps {
		title?: string;
		subtitle?: string;
		button?: string;
		contactUrl?: string;
		icon?: string;
	}

	interface Props {
		badge?: string;
		title?: string;
		subtitle?: string;
		teamMembers?: TeamMember[];
		cta?: CTAProps;
	}

	let { badge = '', title = '', subtitle = '', teamMembers = [], cta = {} }: Props = $props();
</script>

<section class="team-section-new" aria-labelledby="team-heading">
	<Background gradientTheme="monochrome" />

	<div class="container-base relative z-10 py-10 lg:py-16">
		<WaveHeader {badge} {title} {subtitle} headingId="team-heading" badgeIcon={Users} />

		{#if teamMembers.length > 0}
			<div class="team-members-grid">
				{#each teamMembers as member, index (member.name || index)}
					<TeamCard {...member} {index} />
				{/each}
			</div>
		{/if}

		{#if cta && (cta.title || cta.button)}
			<GeneralCTA
				title={cta.title || ''}
				subtitle={cta.subtitle || ''}
				button={cta.button || ''}
				contactUrl={cta.contactUrl || '/contact'}
				icon={cta.icon || ''}
			/>
		{/if}
	</div>
</section>

<style>
	.team-section-new {
		position: relative;
		overflow: hidden;
	}

	.team-members-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.team-members-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.team-members-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.team-members-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
