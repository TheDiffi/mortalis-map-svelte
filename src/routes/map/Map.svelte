<script>
	import Spinner from '$lib/components/LoadingSpinner.svelte';
import map from './map';
	import { onMount } from 'svelte';

	let hasLoaded = false;

	onMount(() => {
		map.initMap();
		map.mapbox?.on('load', () => {
			hasLoaded = true;
			console.log('Map loaded');
		});
	});
</script>

<div id="map-container">
	<div id="map"></div>
	{#if !hasLoaded}
		<Spinner/>
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
