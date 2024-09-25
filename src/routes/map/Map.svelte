<script lang="ts">
	import Spinner from '$lib/components/LoadingSpinner.svelte';
	import MapManager from '../../lib/functions/map/MapManager';
	import { onMount } from 'svelte';
	import CornerElement from './MapCornerElement.svelte';
	import MarkerLayerButtons from './MarkerLayerButtons.svelte';
	import TestCube from '$lib/components/TestCube.svelte';
	import type { MarkerType } from '$lib/functions/map/markers/marker.types';
	import StyleChangeButtons from './StyleChangeButtons.svelte';

	let isLoading = true;
	let map: MapManager = new MapManager('map', import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
	let markerLayers = map.styleManager.markerLayers;
	let mapStyles = map.styleManager.styles;

	onMount(() => {
		map.initMap();
		map.mapbox?.on('load', () => {
			console.log('Map loaded');
			isLoading = false;
			markerLayers = map.styleManager.markerLayers;
		});
	});

	function toggleSessionMarkers(layerName: MarkerType) {
		markerLayers = map.styleManager.toggleMarkerLayer(layerName);
	}

	function handleStyleChange(styleName: string) {
		mapStyles = map.styleManager.changeStyle(styleName);
	}
</script>

<div id="map-container">
	<div id="map"></div>

	<CornerElement corner="top-left"><TestCube /></CornerElement>
	<CornerElement corner="top-right"><TestCube /></CornerElement>
	<CornerElement corner="bottom-right">
		<MarkerLayerButtons {markerLayers} {toggleSessionMarkers} />
	</CornerElement>
	<CornerElement corner="bottom-left"
		><TestCube />
		<StyleChangeButtons {mapStyles} setStyle={handleStyleChange} />
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
