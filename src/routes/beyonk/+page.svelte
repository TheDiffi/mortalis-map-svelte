<script lang="ts">
	import MapButton from '$lib/components/Buttons/MapButton.svelte';
	import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox';

	const { GeolocateControl, NavigationControl, ScaleControl } = controls;
	const key = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

	let mapComponent: Map | null = null;
	let lng = 11.6102645; // Example longitude
	let lat = 48.1843772; // Example latitude

	// Usage of methods like setCenter and flyto
	function setMapCenter() {
		if (mapComponent) {
			mapComponent.flyTo({ center: [lng, lat] }); // documentation (https://docs.mapbox.com/mapbox-gl-js/example/flyto)
			//mapComponent.setCenter([lng, lat], zoom); // zoom is optional
		}
	}
	// Define this to handle `eventname` events - see [GeoLocate Events](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol-events)
	function eventHandler(e: any) {
		const data = e.detail;
		console.log('data >>:', data);
		// do something with `data`, it's the result returned from the mapbox event
	}
</script>

<div class="mapContainer">
	<Map
		accessToken={key}
		bind:this={mapComponent}
		on:recentre={eventHandler}
		options={{ scrollZoom: false }}
		center={[lng, lat]}
	>
		<Marker {lat} {lng} label="Studentenstadt" popupClassName="test-marker" />
		<NavigationControl />
		<ScaleControl />
		<GeolocateControl
			position="bottom-right"
			options={{ some: 'control-option' }}
			on:eventname={eventHandler}
		/>
		<div class="ctrl-bottom-right">
			<MapButton on:click={setMapCenter}>Go To House</MapButton>
		</div>
		<div class="ctrl-top-right">
			<MapButton on:click={setMapCenter}><a href="/test">Back</a></MapButton>
		</div>
	</Map>
</div>

<style>
	/*  sometimes mapbox objects don't render as expected; troubleshoot by changing the height/width to px */
	:global(.mapboxgl-map) {
		height: 100%;
	}

	:global(.test-marker > .mapboxgl-popup-content) {
		background-color: transparent;
		font:
			12px/20px 'Helvetica Neue',
			Arial,
			Helvetica,
			sans-serif;
		font-size: small;
	}

	:global(.test-marker > .mapboxgl-popup-content .mapboxgl-popup-close-button) {
		border-radius: 50%;
		margin: 7px 10px;
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 3px;
	}

	:global(.test-marker > .mapboxgl-popup-content .mapboxgl-popup-close-button:focus-visible) {
		outline: 0;
	}

	:global(.test-marker > .mapboxgl-popup-tip) {
		margin-top: -4px;
		margin-bottom: 3px;
	}

	.mapContainer {
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
	}

	.ctrl-bottom-right {
		position: fixed;
		bottom: 0;
		left: 0;
		margin: 1em;
	}

	.ctrl-top-right {
		position: fixed;
		top: 0;
		left: 0;
		margin: 1em;
	}

	:global(html, body) {
		overflow: hidden;
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}
</style>
