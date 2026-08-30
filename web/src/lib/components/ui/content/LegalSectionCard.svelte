<script lang="ts">
	import { CheckCircle } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';

	interface SectionItem {
		subtitle: string;
		text: string;
	}

	interface Props {
		section: {
			id: string;
			title: string;
			icon: unknown;
			color: string;
			content: SectionItem[];
		};
		index: number;
		sectionLabel: string;
	}

	let { section, index, sectionLabel }: Props = $props();
</script>

<ScrollReveal animation="fly-up" delay={150 + index * 50}>
	<article id={section.id} class="relative rounded-2xl overflow-hidden">
		<!-- Card gradient border -->
		<div
			class="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-blue-500/20 via-emerald-500/20 to-purple-500/20 [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] pointer-events-none"
		></div>

		<!-- Card glow -->
		<div
			class="absolute top-0 left-0 right-0 h-25 bg-gradient-to-b from-blue-500/5 to-transparent dark:from-blue-500/8 dark:to-transparent pointer-events-none"
		></div>

		<!-- Card content -->
		<div
			class="relative bg-white dark:bg-slate-800/90 backdrop-blur-xl p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.06)] border border-[#94a3b8] dark:shadow-none dark:border-white/5 rounded-2xl"
		>
			<!-- Section header -->
			<div class="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
				<div
					class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl text-white shadow-lg bg-gradient-to-br {section.color}"
				>
					{#if section.icon}
						{@const IconComponent = section.icon as unknown as typeof CheckCircle}
						<IconComponent class="w-6 h-6" />
					{/if}
				</div>
				<div class="flex-1">
					<span
						class="block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1"
						>{sectionLabel} {String(index + 1).padStart(2, '0')}</span
					>
					<h2 class="text-2xl font-bold text-gray-900">
						{section.title}
					</h2>
				</div>
			</div>

			<!-- Section content -->
			<div class="flex flex-col gap-5">
				{#each section.content as item, itemIndex (`${section.id}-${itemIndex}`)}
					<div class="flex gap-4">
						<div
							class="flex-shrink-0 w-6 h-6 flex items-center justify-center text-emerald-500 mt-0.5"
						>
							<CheckCircle class="w-5 h-5" />
						</div>
						<div class="flex-1">
							<h3 class="text-base font-semibold text-gray-800 mb-1">
								{item.subtitle}
							</h3>
							<p class="text-[15px] leading-[1.7] text-gray-600">
								{item.text}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</article>
</ScrollReveal>
