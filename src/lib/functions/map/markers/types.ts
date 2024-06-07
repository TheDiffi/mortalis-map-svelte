import mpgl from 'mapbox-gl';

export enum MarkerTypes {
	Session = 'session',
	Marker = 'marker'
}

export type LayerStyles =
	| 'symbol'
	| 'raster'
	| 'custom'
	| 'background'
	| 'circle'
	| 'fill-extrusion'
	| 'fill'
	| 'heatmap'
	| 'hillshade'
	| 'line'
	| 'sky';

export type MarkerLayer = {
	type: MarkerTypes;
	style: LayerStyles;
	symbol: string;
	layerName: string;
};

type MarkerProperties = {
	title: string;
	image: string | null;
	type: MarkerTypes;
	popup: true;
	popup_content: string;
	content: string;
};

export interface MarkerGeoJson extends GeoJSON.FeatureCollection<GeoJSON.Point, MarkerProperties> {
	name: 'markers';
}

export type MarkerFeatures = GeoJSON.Feature<GeoJSON.Point, MarkerProperties>[];

//----------------------------

export type IWD_FEATURE_MarkerMapboxEvent = mapboxgl.MapMouseEvent & {
	features?: IWD_FEATURE_MarkerMapboxGeoJSONFeature[] | undefined;
} & mapboxgl.EventData;

export type IWD_FEATURE_MarkerGeoJsonProperties = {
	Name: string;
	description: string;
	id: string;
	popup: boolean;
	type: string;
	popup_content?: string;
	content?: string;
};

export type IWD_FEATURE_MarkerMapboxGeoJSONFeature = GeoJSON.Feature<
	GeoJSON.Point,
	IWD_FEATURE_MarkerGeoJsonProperties
> & {
	layer: mpgl.Layer;
	source: string;
	sourceLayer: string;
	state: { [key: string]: any };
};

//----------------------------
