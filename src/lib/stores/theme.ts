import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'bits-theme';

function getInitialTheme(): Theme {
	if (typeof window === 'undefined') return 'light';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');
	let initialized = false;

	function applyTheme(theme: Theme) {
		if (typeof document === 'undefined') return;
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
	}

	return {
		subscribe,
		init() {
			if (initialized || typeof window === 'undefined') return;
			const initialTheme = getInitialTheme();
			set(initialTheme);
			applyTheme(initialTheme);
			initialized = true;

			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem(STORAGE_KEY)) {
					const newTheme = e.matches ? 'dark' : 'light';
					set(newTheme);
					applyTheme(newTheme);
				}
			});
		},
		setTheme(newTheme: Theme) {
			set(newTheme);
			applyTheme(newTheme);
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, newTheme);
			}
		},
		toggleTheme() {
			update((current) => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				applyTheme(newTheme);
				if (typeof window !== 'undefined') {
					localStorage.setItem(STORAGE_KEY, newTheme);
				}
				return newTheme;
			});
		}
	};
}

export const themeStore = createThemeStore();
export const toggleTheme = () => themeStore.toggleTheme();
