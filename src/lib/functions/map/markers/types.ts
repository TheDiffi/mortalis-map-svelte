
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

export enum MarkerTypes {
	Session = 'session',
	Marker = 'marker'
}
