type LoadingCallback = (state: LoadingState) => void;

export interface LoadingState {
	data: boolean;
	theme: boolean;
}

let state: LoadingState = { data: true, theme: true };
const subscribers: Set<LoadingCallback> = new Set();

function notify() {
	subscribers.forEach((fn) => fn(state));
}

interface LoadingStoreType {
	subscribe: (fn: LoadingCallback) => () => void;
	start: () => void;
	setDataLoaded: () => void;
	setThemeLoaded: () => void;
}

export const loadingStore: LoadingStoreType = {
	subscribe(fn: LoadingCallback) {
		subscribers.add(fn);
		fn(state);
		return () => subscribers.delete(fn);
	},
	start() {
		state = { data: true, theme: true };
		notify();
	},
	setDataLoaded() {
		state = { ...state, data: false };
		notify();
	},
	setThemeLoaded() {
		state = { ...state, theme: false };
		notify();
	}
};
