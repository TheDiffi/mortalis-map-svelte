
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
	title: string;
	style: LayerStyles;
	symbol: string;
	active: boolean;
};

export enum MarkerTypes {
	Session = 'session',
	Marker = 'marker'
}


export const MARKER_LAYERS: MarkerLayer[] = [
	{
		type: MarkerTypes.Marker,
		title: 'Markers',
		style: 'symbol',
		symbol: 'marker-sb-1',
		active: true
	},
	{
		type: MarkerTypes.Session,
		title: 'Session',
		style: 'symbol',
		symbol: 'marker-sb-1',
		active: true
	}
];