import { type MarkerFeature, type MarkerFeatureProperties } from './types';
import markerJson from '$lib/data/geo/markers.json';
import { MarkerTypes } from '../markers/types';
import { randomUUID } from 'crypto';

export interface MarkerFeaturesGeoJson
	extends GeoJSON.FeatureCollection<GeoJSON.Point, MarkerFeatureGeoJsonProperties> {
	name: 'iwd_features';
}

type MarkerFeatureGeoJson = GeoJSON.Feature<GeoJSON.Point, MarkerFeatureGeoJsonProperties>;

export type MarkerFeatureGeoJsonProperties = {
	type: MarkerTypes;
	name?: string;
	title?: string;
	image?: string | null;
	popup?: true;
	hasPopup?: true;
	popup_content?: string;
	content: string;
};

export class MarkerFeatures
	implements GeoJSON.FeatureCollection<GeoJSON.Point, MarkerFeatureProperties>
{
	private static instance: MarkerFeatures | null = null;
	private json: MarkerFeaturesGeoJson;
	type: 'FeatureCollection' = 'FeatureCollection';
	features: MarkerFeature[] = [];

	public static getInstance(): MarkerFeatures {
		if (!MarkerFeatures.instance) {
			MarkerFeatures.instance = new MarkerFeatures();
		}
		return MarkerFeatures.instance;
	}

	private constructor() {
		this.json = markerJson as MarkerFeaturesGeoJson;
		this.features = this.json.features
			.map((feature) => this.transformFeature(feature))
			.filter((f) => f !== null);
	}

	private transformFeature(jsonFeature: MarkerFeatureGeoJson): MarkerFeature | null {
		const f = jsonFeature.properties;

		if (!f) {
			console.error('Feature has no properties', jsonFeature);
			return null;
		}

		const newProps: MarkerFeatureProperties = {
			tempId: randomUUID(),
			type: this.parseType(f.type),
			name: f.name ?? f.title ?? '',
			image: f.image ?? null,
			hasPopup: f.popup ?? f.hasPopup ?? false,
			popup_content: f.popup_content ?? this.popupContentFromFeature(f) ?? '',
			content: f.content ?? ''
		};

		return {
			id: jsonFeature.id,
			type: 'Feature',
			geometry: jsonFeature.geometry,
			properties: newProps
		};
	}

	private popupContentFromFeature(feature: MarkerFeatureGeoJsonProperties): string {
		return feature.content?.slice(0, 100) + '...';
	}

	private parseType(type?: string): MarkerTypes {
		switch (type?.toLowerCase()) {
			case 'session':
				return MarkerTypes.Session;
			case 'marker':
				return MarkerTypes.Marker;
			default:
				return MarkerTypes.Marker;
		}
	}

	getFeatureByTempId(tempId: string): MarkerFeature | undefined {
		return this.features.find((f) => f.properties.tempId === tempId);
	}

	getFeaturesByType(type: MarkerTypes): MarkerFeature[] {
		return this.features.filter((f) => f.properties.type === type);
	}

	getAllFeatures(): MarkerFeature[] {
		return this.features;
	}
}
