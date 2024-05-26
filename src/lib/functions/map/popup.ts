import type { Map } from 'mapbox-gl';
import mpgl from 'mapbox-gl';
import { marked } from 'marked';
import type mapboxgl from 'mapbox-gl';
import { sidebarContent } from '../sidebar/sidebarStore';
import { sanitizeHtml } from '../common/sanitize';


const MARKER_LAYERS = [
	{
		type: 'marker',
		style: 'symbol',
		symbol: 'marker-sb-1',
		layerName: 'markers1'
	},
	{
		type: 'session',
		style: 'symbol',
		symbol: 'marker-sb-1',
		layerName: 'markers2'
	}
];

type MarkerMapboxEvent = mapboxgl.MapMouseEvent & {
	features?: MarkerMapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;

type MarkerGeoJsonProperties = {
	Name: string;
	description: string;
	id: string;
	popup: boolean;
	type: string;
	popup_content?: string;
	content?: string;
};

type MarkerMapboxGeoJSONFeature = GeoJSON.Feature<GeoJSON.Point, MarkerGeoJsonProperties> & {
	layer: mpgl.Layer;
	source: string;
	sourceLayer: string;
	state: { [key: string]: any };
};

export class PopupManager {
	loadDefault(map: Map) {
		if (!map) throw new Error('Map is not defined');

		// create a list of all the marker layer names
		const markerLayerNames = MARKER_LAYERS.reduce<string[]>((acc, marker) => {
			acc.push(marker.layerName);
			return acc;
		}, []);

		var popup = new mpgl.Popup({
			closeButton: true,
			closeOnClick: false
		});

		// Change the cursor to a pointer when the mouse is over the places layer.
		map.on('mouseenter', markerLayerNames.concat(['cities_layer']), (e) => {
			map.getCanvas().style.cursor = 'pointer';
			let newPopup = this.generatePopup(e as MarkerMapboxEvent, map);
			if (newPopup) popup = newPopup;
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', markerLayerNames.concat(['cities_layer']), () => {
			map.getCanvas().style.cursor = 'grab';
			if (popup) popup.remove();
		});

		//TODO: refactor: this is marker logic
		// open the content in the sidebar when a town is clicked
		map.on('click', 'cities_layer', (e) => {
			this.townsOnClick(e as MarkerMapboxEvent, map);
		});

		// open the content in the sidebar when a marker is clicked
		//TODO: refactor: this is marker logic
		/* map.on('click', markerLayerNames, (e) => {
			this.markersOnClick(e as CustomMapboxEvent);
		});  */
	}

	//TODO: refactor: this is marker logic
	/* 	markersOnClick(e: CustomMapboxEvent) {
		console.log('marker clicked', e.features);
		
		const sanitizedContent = this.cleanlyParseContent(
			e.features![0].properties.content ?? '',
			'No information available'
		);

		this.setSidebarContent(sanitizedContent);	
	}  */

	townsOnClick(e: MarkerMapboxEvent, map: Map) {
		if (!e.features) {
			console.error('No features found in event', e);
			return;
		}

		const coordinates = e.features[0].geometry.coordinates;

		map.flyTo({
			center: coordinates as [number, number],
			duration: 1000,
			curve: 2,
			pitch: 25
		});

		console.log('town clicked', e.features[0]);

		sidebarContent.setTitleAndDescription({
			name: e.features[0].properties?.Name ?? '',
			description: marked.parse(e.features[0].properties?.description) as string ?? ''
		});
	}

	generatePopup(e: MarkerMapboxEvent, map: Map) {
		if (!e.features) {
			console.error('No features found in event', e);
			return;
		}

		if (!e.features[0].properties.popup) return;

		const feature = e.features[0];
		var coordinates = feature.geometry.coordinates.slice() as [number, number];
		var popupContent = this.getPopupContent(feature);

		coordinates = this.adjustCoordsForMultipleFeatures(e, coordinates);

		/// Populate the popup and set its coordinates
		// based on the feature found.
		return new mpgl.Popup({
			closeButton: false,
			closeOnClick: false
		})
			.setLngLat(coordinates)
			.setHTML(popupContent)
			.addTo(map);
	}

	getPopupContent(feature: MarkerMapboxGeoJSONFeature) {
		var popupContent = '';
		if (['session', 'marker'].includes(feature.properties?.type)) {
			popupContent = marked.parse(feature.properties?.popup_content ?? '', {
				async: false
			}) as string;
		} else if (feature.layer.id === 'cities_layer') {
			//TODO: refactor
			popupContent = `<h2 style='padding-bottom: 5px;'>${sanitizeHtml(feature.properties?.Name)}</h2><hr><p>${sanitizeHtml(feature.properties?.description)}</p>`;
		}
		return popupContent;
	}

	adjustCoordsForMultipleFeatures(e: MarkerMapboxEvent, coordinates: [number, number]) {
		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		let newCoords = coordinates.slice() as [number, number];
		let i = 0;
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;

			if (i > 100) {
				console.error('Infinite loop detected');
				break;
			}
		}
		return newCoords;
	}
}
