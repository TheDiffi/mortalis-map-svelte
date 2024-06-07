import { SOURCE_URLS } from '$lib/functions/constants';
import iwd_features_json from '$lib/data/geo/iwd_features.json';
import mapboxgl from 'mapbox-gl';
import StyleManager from './StylesManager';

export default class MapManager {
	mapbox: mapboxgl.Map | undefined;
	styles: StyleManager;
	containerId: string;

	constructor(containerId: string, token: string) {
		mapboxgl.accessToken = token;
		this.styles = new StyleManager();
		this.containerId = containerId;
	}

	initMap() {
		this.mapbox = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/thediffi/cld7hz283000j01ockqljc73u', // style URL
			center: [0.02, -0.02], // starting position [lng, lat]
			zoom: 15.5, // starting zoom
			minZoom: 14,
			pitch: 25
		});

		this.mapbox.on('load', () => {
			this.onLoad();
		});

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

	onLoad() {
		if (this.mapbox === undefined) return;
		/* // render map controls
		loadMapControls(this.mapbox, this.controls, this.changeStyle);

		this.markerManager = new MarkerManager(this);
		this.markerManager.generateMarkerLayerButtons(); */
		this.styles.initStyles(this.mapbox);
	}

	loadNormalStyle() {
		console.log('Loading Sources: Normal');
		try {
			// loads all features -> features
			this.mapbox?.addSource('features', {
				type: 'geojson',
				data: iwd_features_json as any
			});
		} catch (error) {
			console.log('features source already loaded' + error);
		}

		console.log('Rendering layers: Normal');
		// loads the 3d terrain
		this.setDEM(true);
		// Add daytime fog
		this.setFog();
	}

	loadPlayerStyle() {
		// loads the 3d terrain
		this.setDEM(true);
		// Add daytime fog
		this.setFog();
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

	setFog() {
		if (!this.mapbox) return;

		this.mapbox.setFog({
			range: [-1, 5],
			'horizon-blend': 0.2,
			color: 'white',
			'high-color': '#add8e6',
			'space-color': '#d8f2ff',
			'star-intensity': 0.0
		});
	}
}
