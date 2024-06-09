<script lang="ts">
	import MapButton from '$lib/components/Buttons/MapButton.svelte';
	import Spinner from '$lib/components/LoadingSpinner.svelte';
	import MapManager from '../../lib/functions/map/MapManager';
	import { onMount } from 'svelte';
	import CornerElement from './MapCornerElement.svelte';
	import type { MarkerTypes } from '$lib/functions/map/markers/types';
	import MarkerLayerButtons from './MarkerLayerButtons.svelte';

	let isLoading = true;
	let map: MapManager = new MapManager('map', import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
	let markerLayers = map.styles.markerLayers; //TODO: does not workf

	onMount(() => {
		map.initMap();
		map.mapbox?.on('load', () => {
			isLoading = false;
			markerLayers = map.styles.markerLayers;
			console.log('Map loaded');
		});
	});

	function toggleSessionMarkers(layerName: MarkerTypes) {
		markerLayers = map.styles.toggleMarkerLayer(layerName);
	}

	$: {
		console.log('markerLayers changed:', markerLayers);
		// Add your code here
	}
</script>

<div id="map-container">
	<div id="map"></div>

	<CornerElement corner="bottom-right"
		><MarkerLayerButtons {markerLayers} {toggleSessionMarkers} />
	</CornerElement>
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
