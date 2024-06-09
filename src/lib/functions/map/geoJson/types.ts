import type { MarkerTypes } from '../markers/types';

export interface MarkerGeoJson
	extends GeoJSON.FeatureCollection<GeoJSON.Point, MarkerFeatureProperties> {
	name: 'markers';
}

export type MarkerFeature = GeoJSON.Feature<GeoJSON.Point, MarkerFeatureProperties>;

export type MarkerFeatureProperties = {
	tempId: string;
	type: MarkerTypes;
	name: string;
	image: string | null;
	hasPopup: boolean;
	popup_content: string;
	content: string;
};

//----------------------------

export type IWDFeature = GeoJSON.Feature<GeoJSON.Geometry, IWDFeatureProperties>;
export type IWDFeatureTown = GeoJSON.Feature<GeoJSON.Point, IWDFeatureProperties>;

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
