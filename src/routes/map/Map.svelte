<script>
	import map from './map';
	import { onMount } from 'svelte';

	onMount(() => {
		map.initMap();
	});
</script>

<div id="map-container">
	<div id="map"></div>
</div>

<style>
	#map,
	#map-container {
		width: 100%;
		height: 100%;
	}
</style>
