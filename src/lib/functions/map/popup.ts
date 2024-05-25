import DOMPurify from 'dompurify';
import type { Map } from 'mapbox-gl';
import mpgl from 'mapbox-gl';
import { marked } from 'marked';
import type { MapStyles } from './styles';

const MARKER_ICON_URL = 'https://img.icons8.com/material-rounded/24/null/location-marker.png';

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

type MapboxEvent = mapboxgl.MapMouseEvent & {
	features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;




export class PopupManager {


	loadPopups(map: Map, style: MapStyles) {
		switch (style) {
			case 'Normal':
				this.loadDefault(map);
				break;
			case 'Player':
				this.loadDefault(map);
				break;
			default:
				this.loadDefault(map);
		}

		
	}

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
			let newPopup = this.generatePopup(e, map);
			if (newPopup) popup = newPopup;
		});

		// Change it back to a pointer when it leaves.
		map.on('mouseleave', markerLayerNames.concat(['cities_layer']), () => {
			map.getCanvas().style.cursor = 'grab';
			if (popup) popup.remove();
		});

		// open the content in the sidebar when a town is clicked
		map.on('click', 'cities_layer', (e) => {
			this.townsOnClick(e as MapboxEvent, map);
		});

		// open the content in the sidebar when a marker is clicked
		//TODO: refactor: this is marker logic
		/* map.on('click', markerLayerNames, function (e) {
			markersOnClick(e);
		}); */
	}

	//TODO: refactor: this is marker logic
	/* markersOnClick(e) {
		const sanitizedContent = this.cleanlyParseContent(
			e.features[0].properties.content ?? '',
			'No information available'
		);
		//sidebar.setContent(sanitizedContent);
	} */

	townsOnClick(e: MapboxEvent, map: Map) {
		if (!e.features) {
			console.error('No features found in event', e);
			return;
		}

		console.log('town clicked');
		const coordinates = (e.features[0]?.geometry as any).coordinates;
		console.log('!!Check If this is a value!! Coords: ', coordinates, 'Original: ', e.features[0]);

		map.flyTo({
			center: coordinates,
			duration: 1000,
			curve: 2,
			pitch: 25
		});

		this.setSidebarContent(e.features[0]?.properties?.content ?? '');
	}

	setSidebarContent(unsafeContent: string) {
		//TODO: sidebar logic
		/* const sanitizedContent = this.cleanlyParseContent(unsafeContent, 'No information available');
		sidebar.setContent(sanitizedContent); */
	}

	generatePopup(e: MapboxEvent, map: Map) {
		if (!e.features) {
			console.error('No features found in event', e);
			return;
		}

		if (!e.features[0]?.properties?.popup) return;

		const feature = e.features[0];
		//TODO:
		var coordinates = (feature.geometry as any).coordinates.slice();

		var popupContent = this.getPopupContent(feature);

		this.popupMath(e, coordinates);

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

	getPopupContent(feature: mapboxgl.MapboxGeoJSONFeature) {
		var popupContent = '';
		if (['session', 'marker'].includes(feature.properties?.type)) {
			popupContent = this.cleanlyParseContent(
				feature.properties?.popup_content ?? '',
				'No information available'
			);
		} else if (feature.layer.id === 'cities_layer') {
			popupContent = this.parseContent({
				name: feature.properties?.Name,
				info: feature.properties?.description
			});
		}
		return popupContent;
	}

	//TODO: refactor
	popupMath(e: MapboxEvent, coordinates: any) {
		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}
	}

	parseContent({ name, info }: { name: string; info: string }) {
		var parsed = '';
		parsed = `<h2 style='padding-bottom: 5px;'>${name}</h2><hr>`;
		parsed += `<p>${info}</p>`;
		return parsed;
	}

	cleanlyParseContent(content: string, defaultMessage: string) {
		const sanitizedContent = DOMPurify.sanitize(marked.parse(content, { async: false }) as string);
		return sanitizedContent === '' ? defaultMessage : sanitizedContent;
	}
}
