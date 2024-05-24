import featuresJson from '$lib/data/geo/iwd_features.json';
import { SOURCE_URLS } from '../constants';
import type { Map } from 'mapbox-gl';

const ENABLE_DEM = true;

export class StyleManager {
	current: string;
	mapbox: Map | undefined;


	constructor() {
		this.current = 'Normal';
		
	}

	initStyles(mapbox: Map) {
		this.mapbox = mapbox;
		this.loadStyle(this.current);
	}

	loadStyle(stylename: string) {
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
		if(this.mapbox === undefined) throw new Error('Mapbox not initialized');

		console.log('Loading Sources: Normal');
		try {
			// loads all features -> features
			this.mapbox.addSource('features', {
				type: 'geojson',
				data: featuresJson as any
			});
		} catch (error) {
			console.log('features source already loaded' + error);
		}
	
		console.log('Rendering layers: Normal');
		// loads the 3d terrain
		if (ENABLE_DEM) this.addDEM();
		// Add daytime fog
		this.addFog();
	
		// renders the towns layer
		this.loadTowns();
	
		// Create a popup, but don't add it to the map yet.
		// loadPopups();
	}
	
	
	setupStylePlayer() {
		console.log('rendering player layers');
		// loads the 3d terrain
		if (ENABLE_DEM) this.addDEM();
		// Add daytime fog
		this.addFog();
	}
	
	addDEM() {
		if(this.mapbox === undefined) throw new Error('Mapbox not initialized');

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
		if(this.mapbox === undefined) throw new Error('Mapbox not initialized');

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
		if(this.mapbox === undefined) throw new Error('Mapbox not initialized');

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


