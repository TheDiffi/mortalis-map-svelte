import type { Map } from 'mapbox-gl';
import { SOURCE_URLS } from '../constants';
import PopupManager from './PopupManager';
import { IWDFeatures } from './geoJson/IWDFeatures';
import { MARKER_LAYERS, type MarkerLayer, type MarkerTypes } from './markers/types';

const ENABLE_DEM = true;
export type MapStyles = 'Normal' | 'Player';

export default class StyleManager {
	currentStyle: MapStyles;
	popupManager: PopupManager;
	mapbox: Map | undefined;
	markerLayers: MarkerLayer[] = [];

	constructor() {
		this.currentStyle = 'Normal';
		this.popupManager = new PopupManager();
	}

	initStyles(mapbox: Map) {
		this.mapbox = mapbox;
		this.loadStyle(this.currentStyle);
	}

	loadStyle(stylename: MapStyles) {
		console.log('Setting up style: ' + stylename);
		// render the layers
		switch (stylename) {
			case 'Player':
				this.setupStylePlayer();
				break;
			case 'Normal':
				this.setupStyleNormal();
				break;
			default:
				this.setupStyleNormal();
		}
	}

	setupStyleNormal() {
		if (this.mapbox === undefined) throw new Error('Mapbox not initialized');

		console.log('Loading Sources: Normal');
		const features = IWDFeatures.getInstance();
		console.log('Features loaded', features);

		try {
			// loads all features -> features
			this.mapbox.addSource('features', {
				type: 'geojson',
				data: features
			});
		} catch (error) {
			console.error('Error loding Source', error);
		}

		console.log('Rendering layers: Normal');
		// loads the 3d terrain
		if (ENABLE_DEM) this.addDEM();
		// Add daytime fog
		this.addFog();

		// renders the towns layer
		this.loadTowns();

		// Create a popup, but don't add it to the map yet.
		this.popupManager.loadDefault(this.mapbox);

		// set marker layers
		this.markerLayers = MARKER_LAYERS;
	}

	setupStylePlayer() {
		console.log('rendering player layers');
		// loads the 3d terrain
		if (ENABLE_DEM) this.addDEM();
		// Add daytime fog
		this.addFog();

		// set marker layers
		this.markerLayers = MARKER_LAYERS;
	}

	addDEM() {
		if (this.mapbox === undefined) throw new Error('Mapbox not initialized');

		try {
			// loads the DEM source -> dem
			this.mapbox.addSource('dem', {
				type: 'raster-dem',
				url: SOURCE_URLS.HM_POW22_GRAY
			});
		} catch (error) {
			console.log('DEM source already loaded' + error);
		}

		// add the DEM source as a terrain layer with exaggerated height
		this.mapbox.setTerrain({ source: 'dem', exaggeration: 0.0002 });
		console.log('terrain added');
	}

	addFog() {
		if (this.mapbox === undefined) throw new Error('Mapbox not initialized');

		this.mapbox.setFog({
			range: [-1, 5],
			'horizon-blend': 0.2,
			color: 'white',
			'high-color': '#add8e6',
			'space-color': '#d8f2ff',
			'star-intensity': 0.0
		});
	}

	loadTowns() {
		if (this.mapbox === undefined) throw new Error('Mapbox not initialized');

		// layers are the visual representation of the data
		console.log('Loading Towns Layer');

		this.mapbox.addLayer({
			id: 'cities_layer',
			type: 'circle',
			source: 'features',
			//filters out the features that are not towns
			filter: [
				'any',
				['==', ['get', 'type'], 'city_b'],
				['==', ['get', 'type'], 'city_s'],
				['==', ['get', 'type'], 'city_m']
			],
			layout: {
				visibility: 'visible'
				//allow overlap
			},
			paint: {
				'circle-radius': 15,
				'circle-opacity': 0
			}
		});
	}

	toggleMarkerLayer(layerName: MarkerTypes) {
		if (this.mapbox === undefined) return this.markerLayers;

		const isVisible = this.mapbox.getLayoutProperty(layerName, 'visibility') === 'visible';
		this.mapbox?.setLayoutProperty(layerName, 'visibility', !isVisible ? 'visible' : 'none');
		const layer = this.markerLayers.find((layer) => layer.type === layerName);

		if (!layer) {
			console.warn(`Layer ${layerName} not found`);
			return this.markerLayers;
		}

		layer.active = !isVisible;
		return this.markerLayers;
	}
}
