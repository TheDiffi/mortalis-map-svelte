<script lang="ts">
	import MapButton from '$lib/components/Buttons/MapButton.svelte';
import Spinner from '$lib/components/LoadingSpinner.svelte';
	import MapManager from '../../lib/functions/map/mapManager';
	import { onMount } from 'svelte';
	import CornerElement from './MapCornerElement.svelte';

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
	
	<CornerElement corner="bottom-left" style="padding: 10px;"><MapButton onClick={()=>{}}>Test</MapButton>  </CornerElement>
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
