import type { AnyLayer, Map, SymbolLayer } from 'mapbox-gl';
import { MarkerFeatures } from '../geoJson/MarkersFeatures';
import { MARKER_ICON_URL } from '$lib/functions/constants';
import { MARKER_LAYERS, type MarkerLayer } from './types';

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
	private markerFeatures: MarkerFeatures;

	constructor() {
		this.markerFeatures = MarkerFeatures.getInstance();
	}

	loadAllMarkers = (map: Map) => {
		console.log('Loading all markers');
		this.loadMarkerSymbols(map);

		MARKER_LAYERS.forEach((layer) => {
			console.log('Loading marker layer: ' + layer.type);
			this.loadMarkerLayer(map, layer);
		});
	};

	loadMarkerLayer = (map: Map, layer: MarkerLayer) => {
		// loads just the markers from the features -> markers
		const typedMarkers = this.markerFeatures.getFeaturesByType(layer.type);
		map.addSource(layer.type, {
			type: 'geojson',
			data: { type: 'FeatureCollection', features: typedMarkers }
		});

		const layerOptions = {
			id: layer.type,
			type: layer.style,
			source: layer.type,
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
}

export default MarkerManager;
