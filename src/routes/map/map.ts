import { SOURCE_URLS } from '$lib/constants';
import iwd_features_json from "$lib/assets/geo/iwd_features.json";
import mapboxgl from 'mapbox-gl';

export class MapManager {
	mapbox: mapboxgl.Map | undefined;
	containerId: string;

	constructor(containerId: string) {
		mapboxgl.accessToken =
			'pk.eyJ1IjoidGhlZGlmZmkiLCJhIjoiY2xjeGpuYm92MjN4cjNybXNremFtMHd3aiJ9.8QG0LO8bSAfYA0zROCmEmQ';
		this.containerId = containerId;
	}

	initMap() {
		this.initIcewind();
	}

	initIcewind() {
		this.mapbox = new mapboxgl.Map({
			accessToken:
				'pk.eyJ1IjoidGhlZGlmZmkiLCJhIjoiY2xjeGpuYm92MjN4cjNybXNremFtMHd3aiJ9.8QG0LO8bSAfYA0zROCmEmQ',
			container: 'map', // container ID
			style: 'mapbox://styles/thediffi/cld7hz283000j01ockqljc73u', // style URL
			center: [0.02, -0.02], // starting position [lng, lat]
			zoom: 15.5, // starting zoom
			minZoom: 14,
			pitch: 25
		});

		/* this.mapbox.on('load', () => {
			this.initMap();
		}); */

		console.log('mapbox loaded: ', this.mapbox);
	}

	loadStyle(stylename: string) {
		console.log('Setting up style: ' + stylename);

		switch (stylename) {
			case 'Player':
				this.loadPlayerStyle();
				break;
			case 'Normal':
				this.loadNormalStyle();
				break;
			default:
				this.loadNormalStyle();
		}
	}

	loadNormalStyle() {
		console.log("Loading Sources: Normal");
		try {
			// loads all features -> features
			this.mapbox?.addSource("features", {
				type: "geojson",
				data: iwd_features_json as any,
			});
		} catch (error) {
			console.log("features source already loaded" + error);
		}
	
		console.log("Rendering layers: Normal");
		// loads the 3d terrain
		this.setDEM(true);
		// Add daytime fog
		this.setFog(true);
	}

	loadPlayerStyle() {
		// loads the 3d terrain
		this.setDEM(true);
		// Add daytime fog
		this.setFog(true);
	}

	

	setDEM(active: boolean) {
		if (!this.mapbox?.isSourceLoaded('dem')) {
			try {
				// loads the DEM source -> dem
				this.mapbox?.addSource('dem', {
					type: 'raster-dem',
					url: SOURCE_URLS.HM_POW22_GRAY
				});
			} catch (error) {
				console.log('DEM source already loaded' + error);
			}
		}

		// add the DEM source as a terrain layer with exaggerated height
		this.mapbox?.setTerrain({ source: 'dem', exaggeration: active ? 0.0002 : 0 });
		console.log('DEM set to: ' + active);
	}

	setFog(active: boolean) {
		this.mapbox?.setFog({
			range: [-1, 5],
			"horizon-blend": 0.2,
			color: "white",
			"high-color": "#add8e6",
			"space-color": "#d8f2ff",
			"star-intensity": 0.0,

		});
	}
}

const mapManager = new MapManager('map');
export default mapManager;
