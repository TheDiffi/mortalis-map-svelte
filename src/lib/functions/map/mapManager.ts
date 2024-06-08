import { SOURCE_URLS } from '$lib/functions/constants';
import iwd_features_json from '$lib/data/geo/iwd_features.json';
import mapboxgl from 'mapbox-gl';
import StyleManager from './StylesManager';
import MarkerManager from './markers/MarkerManager';
import { IWDFeatures, type IWDFeaturesGeoJson } from './geoJson/IWDFeatures';

export default class MapManager {
	mapbox: mapboxgl.Map | undefined;
	styles: StyleManager;
	markerManager: MarkerManager;
	containerId: string;

	constructor(containerId: string, token: string) {
		mapboxgl.accessToken = token;
		this.styles = new StyleManager();
		this.markerManager = new MarkerManager();
		this.containerId = containerId;
	}

	initMap() {
		this.mapbox = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/thediffi/cld7hz283000j01ockqljc73u',
			center: [0.02, -0.02],
			zoom: 15.5,
			minZoom: 14,
			pitch: 25
		});

		this.mapbox.on('load', () => {
			this.onLoad();
		});

		console.log('mapbox loaded: ', this.mapbox);
	}

	onLoad() {
		if (this.mapbox === undefined) return;

		this.styles.initStyles(this.mapbox);
		//loadMapControls(this.mapbox, this.controls, this.changeStyle); //TODO

		this.markerManager.loadAllMarkers(this.mapbox);
	}

/* 	loadStyle(stylename: string) {
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
		console.log('Loading Sources: Normal');
		const features = new IWDFeatures(iwd_features_json as IWDFeaturesGeoJson);
		console.log('features', features);

		try {
			this.mapbox?.addSource('features', {
				type: 'geojson',
				data: features
			});
		} catch (error) {
			console.log('features source already loaded' + error);
		}

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
	} */
}
