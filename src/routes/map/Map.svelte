<script lang="ts">
	import Spinner from '$lib/components/LoadingSpinner.svelte';
	import MapManager from '../../lib/functions/map/mapManager';
	import { onMount } from 'svelte';

	let isLoading = true;
	let map: MapManager = new MapManager('map', import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);

	onMount(() => {
		map.initMap();
		map.mapbox?.on('load', () => {
			isLoading = false;
			console.log('Map loaded');
		});
	});
</script>

<div id="map-container">
	<div id="map"></div>
	{#if isLoading}
		<Spinner />
	{/if}
</div>

<style>
	#map,
	#map-container {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
