import mapboxgl from 'mapbox-gl';
import StyleManager from './StylesManager';
import MarkerManager from './markers/MarkerManager';

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
		this.markerManager.loadAllMarkers(this.mapbox);
	}

	changeStyle(style: 'Normal' | 'Player') {
		this.styles.loadStyle(style);
	}


}
