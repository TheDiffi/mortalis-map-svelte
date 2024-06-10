import type { Map } from 'mapbox-gl';
import { SOURCE_URLS } from '../constants';
import PopupManager from './PopupManager';
import { IWDFeatures } from './geoJson/IWDFeatures';
import { MARKER_LAYERS, type MarkerLayer, type MarkerType } from './markers/marker.types';
import { MAP_STYLES, MapStyleName, type MapStyle } from './map.types';

const ENABLE_DEM = true;

export default class StyleManager {
	currentStyle: MapStyle;
	popupManager: PopupManager;
	mapbox: Map | undefined;
	markerLayers: MarkerLayer[] = [];
	styles: MapStyle[] = MAP_STYLES;

	constructor() {
		this.currentStyle = this.getStyle(MapStyleName.Normal);
		this.popupManager = new PopupManager();
	}

	initStyles = (mapbox: Map) => {
		this.mapbox = mapbox;
		this.applyStyleProperties(this.currentStyle.name);
		this.updateActiveStyle(MapStyleName.Normal);
	};

	getStyle = (styleName: MapStyleName): MapStyle => {
		const style = this.styles.find((style) => style.name === styleName);
		if (style === undefined) throw new Error(`Style ${styleName} not found`);
		return style;
	};

	//TODO: move somewhere else
	toggleMarkerLayer = (layerName: MarkerType) => {
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
	};

	setStyle = (style: MapStyle) => {
		if (this.mapbox === undefined) return this.styles;

		this.currentStyle = style;
		this.mapbox.setStyle(this.currentStyle.url);
		this.mapbox.once('style.load', () => {
			this.applyStyleProperties(this.currentStyle.name);
			this.updateActiveStyle(style.name);
		});
	};

	private updateActiveStyle = (styleName: MapStyleName) => {
		this.styles.forEach((style) => (style.active = style.name === styleName));
	};

	changeStyle = (style: string) => {
		if (this.mapbox === undefined) return this.styles;

		const styleName = MapStyleName[style as keyof typeof MapStyleName];
		if (styleName === undefined) {
			throw new Error(`Style ${style} is not a valid StyleName`);
		}

		const newStyle = this.getStyle(styleName);
		if (newStyle.active) return this.styles;
		this.setStyle(newStyle);

		return this.styles;
	};

	private applyStyleProperties(styleName: MapStyleName) {
		console.log('Setting up style: ' + styleName);
		switch (styleName) {
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

	private setupStyleNormal() {
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
		if (ENABLE_DEM) this.addDEM();
		this.loadTowns();
		this.addFog();
		this.markerLayers = MARKER_LAYERS;
		this.popupManager.loadDefault(this.mapbox);
	}

	private setupStylePlayer() {
		if (this.mapbox === undefined) throw new Error('Mapbox not initialized');

		console.log('rendering player layers');
		if (ENABLE_DEM) this.addDEM();
		this.addFog();

		this.markerLayers = MARKER_LAYERS;
		this.popupManager.loadDefault(this.mapbox);
	}

	private addDEM() {
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

	private addFog() {
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

	private loadTowns() {
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
}
