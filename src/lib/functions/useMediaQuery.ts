import { readable } from 'svelte/store';
import { browser } from '$app/environment';

export const useMediaQuery = (mediaQueryString: string) => {
	//we inizialize the readable as null and get the callback with the set function
	const matches = readable<boolean | null>(null, (set) => {
		//we match the media query
		const m = window.matchMedia(mediaQueryString);
		//we set the value of the reader to the matches property
		set(m.matches);
		//we create the event listener that will set the new value on change
		const el = (e: MediaQueryListEvent) => set(e.matches);
		//we add the new event listener
		m.addEventListener('change', el);
		//we return the stop function that will clean the event listener
		return () => {
			m.removeEventListener('change', el);
		};
	});
	//then we return the readable
	if (browser) {
		return matches;
	}
};
