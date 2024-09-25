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
	type: MarkerType;
	title: string;
	style: LayerStyles;
	symbol: string;
	active: boolean;
};

export enum MarkerType {
	Session = 'session',
	Marker = 'marker'
}

export const MARKER_LAYERS: MarkerLayer[] = [
	{
		type: MarkerType.Marker,
		title: 'Markers',
		style: 'symbol',
		symbol: 'marker-sb-1',
		active: true
	},
	{
		type: MarkerType.Session,
		title: 'Session',
		style: 'symbol',
		symbol: 'marker-sb-1',
		active: true
	}
];
