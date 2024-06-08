import type { MarkerTypes } from '../markers/types';

export interface MarkerGeoJson extends GeoJSON.FeatureCollection<GeoJSON.Point, MarkerProperties> {
	name: 'markers';
}

export type MarkerFeatures = GeoJSON.Feature<GeoJSON.Point, MarkerProperties>[];

type MarkerProperties = {
	title: string;
	image: string | null;
	type: MarkerTypes;
	popup: true;
	popup_content: string;
	content: string;
};

//----------------------------

export type IWDFeature = GeoJSON.Feature<GeoJSON.Geometry, IWDFeatureProperties>;

export type IWDFeatureProperties = {
	id: string;
	type: IWDFeatureTypes;
	name: string;
	description: string;
	hasPopup: boolean;
	popup_content: string;
	content: string;
};

export enum IWDFeatureTypes {
	CityM = 'city_m',
	CityS = 'city_s',
	CityB = 'city_b',
	Woods = 'woods',
	Lake = 'lake',
	Landmark = 'landmark',
	None = 'none'
}

//----------------------------

export type MarkerEvent<T> = T & {
	layer: mapboxgl.Layer;
	source: string;
	sourceLayer: string;
	state: { [key: string]: any };
};
