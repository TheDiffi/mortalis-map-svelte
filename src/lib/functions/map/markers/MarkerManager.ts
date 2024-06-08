import markerJson from '$lib/data/geo/markers.json';
import { MARKER_ICON_URL, MARKER_LAYERS } from '../../constants';
import type { AnyLayer, Map, SymbolLayer } from 'mapbox-gl';
import type { MarkerGeoJson, MarkerFeature } from '../geoJson/types';
import type { MarkerLayer, MarkerTypes } from './types';

//TODO: refactor this to a svelete component
// class LayerButton {
// 	button;

// 	/**
// 	 * @param {Layer} layer - The layer object
// 	 * @param {Map.setLayerVisibility} setLayerVisibility - The function to set the layer visibility
// 	 */
// 	constructor(layer:Layer, setLayerVisibility: mapboxgl.Map) {
// 		this.button = document.createElement('button');
// 		this.button.innerText = layer.type;
// 		this.button.value = layer.layerName;
// 		this.button.classList.add('map-element-marker-button');
// 		this.button.addEventListener('click', () => {
// 			this.button.classList.toggle('active');
// 			setLayerVisibility(layer.layerName, this.isActive());
// 		});
// 	}

// 	getElement = () => {
// 		return this.button;
// 	};

// 	isActive = () => {
// 		return this.button.classList.contains('active');
// 	};
// }

// generateMarkerLayerButtons = () => {
//     const markerInputs = document.getElementById('marker-input-container');

//     MARKER_LAYERS.forEach((layer) => {
//         const button = new LayerButton(layer, this.mapManager.setLayerVisibility);
//         markerInputs.appendChild(button.getElement());
//     });
// };

// updateMarkerLayersVisibility = () => {
//     console.log('Loading checked layers');
//     const inputGroup = document.getElementById('marker-input-container');
//     inputGroup.childNodes.forEach((btn) => {
//         try {
//             this.mapManager.setLayerVisibility(btn.value, this.isButtonActive(btn));
//         } catch (error) {
//             console.log('LayerVisibilityError: ' + error);
//         }
//     });
// };

//TODO: UNDER CONSTRUCTION
class MarkerManager {
	private markerJson: MarkerGeoJson;

	constructor() {
		this.markerJson = markerJson as MarkerGeoJson;
	}

	loadAllMarkers = (map: Map) => {
		console.log('Loading all markers');
		this.loadMarkerSymbols(map);

		MARKER_LAYERS.forEach((layer) => {
			console.log('Loading marker layer: ' + layer.type);
			this.loadMarkerLayer(map, layer);
			this.addLayerToMap(layer, map);
		});
	};

	loadMarkerLayer = (map: Map, layer: MarkerLayer) => {
		// loads just the markers from the features -> markers
		const markers = this.filterMarkersByType(this.markerJson, layer.type);
		map.addSource(layer.layerName, {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: markers }
		});
	};

	addLayerToMap = (layer: MarkerLayer, map: Map) => {
		const layerOptions = {
			id: layer.layerName,
			type: layer.style,
			source: layer.layerName,
			layout: {}
		} as AnyLayer;

		if (layer.style === 'symbol') {
			(layerOptions as SymbolLayer).layout!['icon-image'] = layer.symbol;
		}

		map.addLayer(layerOptions);
	};

	loadMarkerSymbols = (map: Map) => {
		try {
			map.loadImage(MARKER_ICON_URL, (error, image) => {
				if (error) throw error;
				if (!image) throw new Error('Image not loaded');
				map.addImage('marker-sb-1', image);
			});
		} catch (error) {
			console.log('MarkerSymbolsError: ' + error);
		}
	};

	filterMarkersByType = (geojson: MarkerGeoJson, type: MarkerTypes) => {
		const markers: MarkerFeature[] = [];

		geojson.features.forEach((feature) => {
			if (feature.properties.type === type) {
				markers.push(feature);
			}
		});

		return markers;
	};
}

export default MarkerManager;
