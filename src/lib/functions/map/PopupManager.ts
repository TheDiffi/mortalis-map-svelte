import type { Map, MapMouseEvent } from 'mapbox-gl';
import mpgl from 'mapbox-gl';
import { marked } from 'marked';
import { sidebarContent } from '../sidebar/sidebarStore';
import { sanitizeHtml } from '../common/sanitize';
import { MARKER_LAYERS } from '../constants';
import type { IWD_FEATURE_MarkerMapboxEvent, IWD_FEATURE_MarkerMapboxGeoJSONFeature } from './markers/types';


export default class PopupManager {
	private popup: mpgl.Popup = new mpgl.Popup({
		closeButton: true,
		closeOnClick: false
	}); // Private member for the popup instance

	loadDefault(map: Map) {
		if (!map) throw new Error('Map is not defined');

		const popupLayers = MARKER_LAYERS.map((layer) => layer.layerName);
		popupLayers.push('cities_layer');

		map.on('mouseenter', popupLayers, this.handleMouseEnter.bind(this, map));
		map.on('mouseleave', popupLayers, this.handleMouseLeave.bind(this, map));
		map.on('click', 'cities_layer', this.handleTownClick.bind(this, map));

		// open the content in the sidebar when a marker is clicked
		//TODO: refactor: this is marker logic
		/* map.on('click', markerLayerNames, (e) => {
			this.markersOnClick(e as CustomMapboxEvent);
		});  */
	}

	private handleMouseEnter(map: Map, e: MapMouseEvent) {
		map.getCanvas().style.cursor = 'pointer';
		let newPopup = this.generatePopup(e, map);
		if (newPopup) this.popup = newPopup;
	}

	private handleMouseLeave(map: Map, _e: MapMouseEvent) {
		map.getCanvas().style.cursor = '';
		if (this.popup.isOpen()) this.popup.remove();
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

	private isMarkerMapboxEvent(e: any): e is IWD_FEATURE_MarkerMapboxEvent {
		return e.features !== undefined;
	}

	private handleTownClick(map: Map, e: MapMouseEvent) {
		if (!this.isMarkerMapboxEvent(e)) {
			console.error('No features found in event', e);
			return;
		}

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
			description: (marked.parse(e.features[0].properties?.description) as string) ?? ''
		});
	}

	private generatePopup(e: IWD_FEATURE_MarkerMapboxEvent, map: Map) {
		if (!e.features) {
			console.error('No features found in event', e);
			return;
		}

		if (!e.features[0].properties.popup) return;

		const feature = e.features[0];
		const coordinates = feature.geometry.coordinates.slice() as [number, number];

		/// Populate the popup and set its coordinates
		// based on the feature found.
		return new mpgl.Popup({
			closeButton: false,
			closeOnClick: false
		})
			.setLngLat(this.adjustCoordsForMultipleFeatures(e, coordinates))
			.setHTML(this.getPopupContent(feature))
			.addTo(map);
	}

	private getPopupContent(feature: IWD_FEATURE_MarkerMapboxGeoJSONFeature) {
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

	private adjustCoordsForMultipleFeatures(e: IWD_FEATURE_MarkerMapboxEvent, coordinates: [number, number]) {
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
