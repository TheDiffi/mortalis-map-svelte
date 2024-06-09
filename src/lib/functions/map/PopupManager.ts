import type { Map, MapMouseEvent } from 'mapbox-gl';
import mpgl from 'mapbox-gl';
import { marked } from 'marked';
import { sanitizeHtml } from '../common/sanitize';
import { sidebarContent } from '../sidebar/sidebarStore';
import type { IWDFeatureTown, MarkerEvent, MarkerFeature } from './geoJson/types';
import { MARKER_LAYERS } from './markers/types';

type MarkerMapboxEvent = mapboxgl.MapMouseEvent & {
	features?: MarkerEvent<IWDFeatureTown | MarkerFeature>[] | undefined;
} & mapboxgl.EventData;

export default class PopupManager {
	private popup: mpgl.Popup = new mpgl.Popup({
		closeButton: true,
		closeOnClick: false
	}); // Private member for the popup instance

	loadDefault(map: Map) {
		if (!map) throw new Error('Map is not defined');

		const popupLayers: string[] = MARKER_LAYERS.map((layer) => layer.type);
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

	private isMarkerMapboxEvent(e: any): e is MarkerMapboxEvent {
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
		const townFeature = e.features[0] as MarkerEvent<IWDFeatureTown>;

		const coordinates = townFeature.geometry.coordinates;

		map.flyTo({
			center: coordinates as [number, number],
			duration: 1000,
			curve: 2,
			pitch: 25
		});

		console.log('town clicked', townFeature);

		sidebarContent.setTitleAndDescription({
			name: townFeature.properties?.name ?? '',
			description: (marked.parse(townFeature.properties?.description) as string) ?? ''
		});
	}

	private generatePopup(e: MarkerMapboxEvent, map: Map) {
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
			.setHTML(sanitizeHtml(this.getPopupContent(feature)))
			.addTo(map);
	}

	private getPopupContent(feature: MarkerEvent<IWDFeatureTown | MarkerFeature>): string {
		let popupContent = '';
		const { type, popup_content } = feature.properties ?? {};

		if (['session', 'marker'].includes(type)) {
			feature = feature as MarkerEvent<MarkerFeature>;
			popupContent = this.sessionMarkerContent(feature);
		} else if (feature.layer.id === 'cities_layer') {
			feature = feature as MarkerEvent<IWDFeatureTown>;
			popupContent = this.contentWithTitle(feature.properties.name, popup_content);
		}

		console.log('popup content', popupContent);
		return popupContent;
	}

	private contentWithTitle(name?: string, popup_content?: string): string {
		return `<h2 class='popup-name'>${name}</h2><hr><div class='popup-content'>${popup_content}</div>`;
	}

	private sessionMarkerContent(feature:MarkerFeature ): string {
		const { name, popup_content, type } = feature.properties;
		const content = marked.parse(popup_content ?? 'test', { async: false }) as string;
		return `<div class='popup-name marker ${type}'>${name}</div><div class='popup-content session'>${content}</div>`;

	}

	private adjustCoordsForMultipleFeatures(e: MarkerMapboxEvent, coordinates: [number, number]) {
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
