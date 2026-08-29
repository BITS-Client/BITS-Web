<script lang="ts">
	import { fly } from 'svelte/transition';
	import { FileText, Menu, X } from '$lib/icons/lucide';
	import ScrollReveal from '$lib/components/ui/animation/ScrollReveal.svelte';
	import LegalSectionCard from './LegalSectionCard.svelte';
	import TableOfContents, {
		type TocItem
	} from '$lib/components/ui/navigation/TableOfContents.svelte';

	interface SectionItem {
		subtitle: string;
		text: string;
	}

	interface Section {
		id: string;
		title: string;
		icon: unknown;
		color: string;
		content: SectionItem[];
	}

	interface Props {
		sections: Section[];
		tocLabel: string;
		sectionLabel: string;
		noticeTitle: string;
		noticeSubtitle: string;
		noticeIcon?: unknown;
		noticeColor?: string;
	}

	let {
		sections,
		tocLabel,
		sectionLabel,
		noticeTitle,
		noticeSubtitle,
		noticeIcon: NoticeIcon = null,
		noticeColor = 'from-amber-500/10 to-amber-600/10 dark:from-amber-500/15 dark:to-amber-600/10'
	}: Props = $props();

	let activeTocId = $state('');
	let tocOpen = $state(false);
	let ticking = false;

	function tocItems(): TocItem[] {
		return sections.map((section) => ({
			level: 1,
			text: section.title,
			id: section.id
		}));
	}

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			const offset = 100;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;
			window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
		}
		tocOpen = false;
	}

	function handleTocClick(headingId: string) {
		activeTocId = headingId;
		scrollToSection(headingId);
	}

	function updateActiveId() {
		if (!ticking) {
			requestAnimationFrame(() => {
				const headerHeight = 120;
				const scrollPosition = window.scrollY + headerHeight;

				for (let i = sections.length - 1; i >= 0; i--) {
					const section = sections[i];
					const element = document.getElementById(section.id);
					if (element) {
						const offsetTop = element.offsetTop;
						if (scrollPosition >= offsetTop) {
							activeTocId = section.id;
							break;
						}
					}
				}
				ticking = false;
			});
			ticking = true;
		}
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', updateActiveId, { passive: true });
			return () => {
				window.removeEventListener('scroll', updateActiveId);
			};
		}
	});
</script>

<section class="py-10 lg:py-16 bg-gray-50 dark:bg-slate-900">
	<div class="container-base">
		<div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-12">
			<aside class="hidden lg:block sticky top-[100px] self-start">
				<TableOfContents
					items={tocItems()}
					title={tocLabel}
					activeId={activeTocId}
					onclick={handleTocClick}
				/>
			</aside>

			<div class="lg:hidden sticky top-20 z-40">
				<button
					class="flex items-center gap-3 w-full px-5 py-4 bg-white dark:bg-slate-800 rounded-xl font-medium text-gray-900 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.06)] border border-[#94a3b8] dark:shadow-none dark:border-white/10"
					onclick={() => (tocOpen = !tocOpen)}
					aria-expanded={tocOpen}
					aria-controls="mobile-toc"
				>
					{#if tocOpen}
						<X class="w-5 h-5" />
					{:else}
						<Menu class="w-5 h-5" />
					{/if}
					<span>{tocLabel}</span>
				</button>
				{#if tocOpen}
					<nav
						id="mobile-toc"
						class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl p-2 shadow-[0_25px_50px_-5px_rgba(0,0,0,0.15),0_10px_20px_-5px_rgba(0,0,0,0.08)] border border-[#94a3b8] dark:shadow-xl dark:border-white/10 max-h-[60vh] overflow-y-auto"
						transition:fly={{ y: -10, duration: 200 }}
					>
						{#each sections as section, index (section.id)}
							<button
								class="flex items-center gap-3 w-full px-4 py-3.5 bg-transparent border-none rounded-lg text-sm text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/5 {activeTocId ===
								section.id
									? 'bg-gradient-to-r from-blue-500/10 to-emerald-500/10 dark:bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-blue-600 dark:text-blue-400 font-medium'
									: ''}"
								onclick={() => handleTocClick(section.id)}
							>
								<span class="text-xs font-semibold text-blue-600 dark:text-blue-400 min-w-6"
									>{String(index + 1).padStart(2, '0')}</span
								>
								<span>{section.title}</span>
							</button>
						{/each}
					</nav>
				{/if}
			</div>

			<main class="flex flex-col gap-6">
				<ScrollReveal animation="scale" delay={100}>
					<div
						class="flex gap-4 p-5 bg-gradient-to-br {noticeColor} rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-amber-500/40 dark:border-amber-500/40"
					>
						<div
							class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-amber-500/20 dark:bg-amber-500/20 rounded-xl text-amber-600 dark:text-amber-400"
						>
							{#if NoticeIcon}
								{@const IconComponent = NoticeIcon as unknown as typeof FileText}
								<IconComponent class="w-6 h-6" />
							{/if}
						</div>
						<div class="flex-1">
							<h3 class="text-base font-semibold text-amber-800 dark:text-amber-300 mb-1">
								{noticeTitle}
							</h3>
							<p class="text-sm leading-6 text-amber-700 dark:text-amber-200">
								{noticeSubtitle}
							</p>
						</div>
					</div>
				</ScrollReveal>

				{#each sections as section, index (section.id)}
					<LegalSectionCard {section} {index} {sectionLabel} />
				{/each}
			</main>
		</div>
	</div>
</section>
