import { VITE_MAPBOX_ACCESS_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		post: { mapboxToken: VITE_MAPBOX_ACCESS_TOKEN }
	};
};
