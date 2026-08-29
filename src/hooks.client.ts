import { browser } from '$app/environment';

// This file implements client-side navigation hooks
// to handle loading states during page transitions

if (browser) {
	document.addEventListener('sveltekit:start', () => {
		import('$lib/stores/loadingStore').then(({ loadingStore }) => {
			loadingStore.start();
		});
	});

	document.addEventListener('sveltekit:end', () => {
		import('$lib/stores/loadingStore').then(({ loadingStore }) => {
			loadingStore.setDataLoaded();
		});
	});

	document.addEventListener('sveltekit:error', () => {
		import('$lib/stores/loadingStore').then(({ loadingStore }) => {
			loadingStore.setDataLoaded();
		});
	});
}
