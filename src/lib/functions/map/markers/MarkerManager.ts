import type { AnyLayer, Map, SymbolLayer } from 'mapbox-gl';
import { MarkerFeatures } from '../geoJson/MarkersFeatures';
import { MARKER_ICON_URL } from '$lib/functions/constants';
import { MARKER_LAYERS, type MarkerLayer } from './types';

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
