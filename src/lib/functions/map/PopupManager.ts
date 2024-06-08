import type { Map, MapMouseEvent } from 'mapbox-gl';
import mpgl from 'mapbox-gl';
import { marked } from 'marked';
import { sidebarContent } from '../sidebar/sidebarStore';
import { sanitizeHtml } from '../common/sanitize';
import { MARKER_LAYERS } from '../constants';
import type { IWDFeature, IWDFeatureProperties, MarkerEvent } from './geoJson/types';

type IWDFeatureMarkerMapboxEvent = mapboxgl.MapMouseEvent & {
	features?: MarkerEvent<GeoJSON.Feature<GeoJSON.Point, IWDFeatureProperties>>[] | undefined;
} & mapboxgl.EventData;

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
		map.on(
			'click',
			popupLayers.filter((l) => l !== 'cities_layer'),
			(e) => {
				console.log('marker clicked', e.features);

				if (!this.isMarkerMapboxEvent(e)) {
					console.error('No features found in event', e);
					return;
				}
				sidebarContent.set(
					marked.parse(e.features![0].properties.content ?? 'No Content', {
						async: false
					}) as string,
					true
				);
			}
		);
	}

	private handleMouseEnter(map: Map, e: MapMouseEvent) {
		console.log('mouse enter', e);
		
		map.getCanvas().style.cursor = 'pointer';
		let newPopup = this.generatePopup(e, map);
		if (newPopup) this.popup = newPopup;
	}

	private handleMouseLeave(map: Map, _e: MapMouseEvent) {
		map.getCanvas().style.cursor = '';
		if (this.popup.isOpen()) this.popup.remove();
	}

	private isMarkerMapboxEvent(e: any): e is IWDFeatureMarkerMapboxEvent {
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
			name: e.features[0].properties?.name ?? '',
			description: (marked.parse(e.features[0].properties?.description) as string) ?? ''
		});
	}

	private generatePopup(e: IWDFeatureMarkerMapboxEvent, map: Map) {
		if (!e.features) {
			console.error('No features found in event', e);
			return;
		}

		if (!e.features[0].properties.hasPopup) return;

		const feature = e.features[0];
		const coordinates = feature.geometry.coordinates.slice() as [number, number];

		return new mpgl.Popup({
			closeButton: false,
			closeOnClick: false
		})
			.setLngLat(this.adjustCoordsForMultipleFeatures(e, coordinates))
			.setHTML(this.getPopupContent(feature))
			.addTo(map);
	}

	private getPopupContent(feature: MarkerEvent<IWDFeature>): string {
		let popupContent = '';
		const { type, popup_content, name } = feature.properties ?? {};

		if (['session', 'marker'].includes(type)) {
			popupContent = marked.parse(popup_content ?? 'test', { async: false }) as string;
			console.log('popup content', popupContent);
		} else if (feature.layer.id === 'cities_layer') {
			popupContent = this.generateCitiesLayerContent(name, popup_content);
		}

		return popupContent;
	}

	private generateCitiesLayerContent(name?: string, popup_content?: string): string {
		const sanitizedTitle = sanitizeHtml(name ?? '');
		const sanitizedContent = sanitizeHtml(popup_content ?? '');

		return `<h2 style='padding-bottom: 5px;'>${sanitizedTitle}</h2><hr><p>${sanitizedContent}</p>`;
	}

	private adjustCoordsForMultipleFeatures(
		e: IWDFeatureMarkerMapboxEvent,
		coordinates: [number, number]
	) {
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
