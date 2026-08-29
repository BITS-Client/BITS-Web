<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/ui/layout/Header.svelte';
	import Footer from '$lib/components/ui/layout/Footer.svelte';
	import LoadingSpinner from '$lib/components/ui/animation/LoadingSpinner.svelte';
	import { themeStore } from '$lib/stores/theme';
	import { loadingStore } from '$lib/stores/loadingStore';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();

	onMount(() => {
		loadingStore.start();

		themeStore.init();
		loadingStore.setThemeLoaded();

		if (typeof document !== 'undefined') {
			document.documentElement.lang = data.locale;
		}
	});

	$effect(() => {
		if (data.information || data.navigation || data.general) {
			loadingStore.setDataLoaded();
		}
	});
</script>

<div class="min-h-screen flex flex-col">
	<LoadingSpinner />
	<Header
		information={data.information}
		navigation={data.navigation}
		general={data.general}
		services={data.services}
		servicesPage={data.servicesPage}
		locale={data.locale}
	/>

	<main id="main-content" class="flex-grow">
		{@render children()}
	</main>

	<Footer
		general={data.general}
		information={data.information}
		navigation={data.navigation}
		services={data.services}
		clients={data.clients}
		locale={data.locale}
	/>
</div>
