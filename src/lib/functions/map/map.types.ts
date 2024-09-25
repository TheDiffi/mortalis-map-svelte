export type MapStyle = {
	name: MapStyleName;
	title: string;
	active: boolean;
    url: string;
};
export enum MapStyleName {
	Normal = 'Normal',
	Player = 'Player'
}

export const MAP_STYLES: MapStyle[] = [
	{
		name: MapStyleName.Normal,
		title: 'Normal',
		active: false,
        url: "mapbox://styles/thediffi/cld7hz283000j01ockqljc73u",

	},
	{
		name: MapStyleName.Player,
		title: 'Player',
		active: false,
        url: "mapbox://styles/thediffi/cleizzrd3000601nvl3tlp6q3",

	}
];
