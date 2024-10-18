import { type IWDFeature, type IWDFeatureProperties, IWDFeatureTypes } from './geojon.types';
import iwdFeaturesJson from '$lib/data/geo/iwd_features.json';

export interface IWDFeaturesGeoJson
	extends GeoJSON.FeatureCollection<GeoJSON.Geometry, IWDFeatureGeoJsonProperties> {
	name: 'iwd_features';
}

type IWDFeatureGeoJson = GeoJSON.Feature<GeoJSON.Geometry, IWDFeatureGeoJsonProperties>;

type IWDFeatureGeoJsonProperties = {
	id: string;
	type?: string;
	name?: string;
	Name?: string;
	description: string;
	popup?: boolean;
	popup_content?: string;
	content?: string;
};

export class IWDFeatures
	implements GeoJSON.FeatureCollection<GeoJSON.Geometry, IWDFeatureProperties>
{
	private static instance: IWDFeatures | null = null;
	private json: IWDFeaturesGeoJson;
	type: 'FeatureCollection' = 'FeatureCollection';
	features: IWDFeature[] = [];

	public static getInstance(): IWDFeatures {
		if (!IWDFeatures.instance) {
			IWDFeatures.instance = new IWDFeatures();
		}
		return IWDFeatures.instance;
	}

	private constructor() {
		this.json = iwdFeaturesJson as IWDFeaturesGeoJson;
		const temp = this.json.features
			.map((feature) => this.transformFeature(feature))
			.filter((f) => f !== null) as IWDFeature[];
		this.features = temp;
	}

	private transformFeature(jsonFeature: IWDFeatureGeoJson): IWDFeature | null {
		const f = jsonFeature.properties;

		if (!f) {
			console.error('Feature has no properties', jsonFeature);
			return null;
		}

		const newProps = {
			id: f.id,
			type: this.parseType(f.type),
			name: f.name ?? f.Name ?? '',
			description: f.description ?? '',
			hasPopup: f.popup ?? false,
			popup_content: f.popup_content ?? f.description?.slice(0, 100) + '...' ?? '',
			content: f.content ?? f.description ?? ''
		};

		return {
			id: jsonFeature.id,
			type: 'Feature',
			geometry: jsonFeature.geometry,
			properties: newProps
		};
	}

	private parseType(type?: string): IWDFeatureTypes {
		switch (type) {
			case 'city_m':
				return IWDFeatureTypes.CityM;
			case 'city_s':
				return IWDFeatureTypes.CityS;
			case 'city_b':
				return IWDFeatureTypes.CityB;
			case 'woods':
				return IWDFeatureTypes.Woods;
			case 'lake':
				return IWDFeatureTypes.Lake;
			case 'landmark':
				return IWDFeatureTypes.Landmark;
			default:
				return IWDFeatureTypes.None;
		}
	}

	getFeatureById(id: string): IWDFeature | undefined {
		return this.features.find((f) => f.properties.id === id);
	}

	getFeaturesByType(type: IWDFeatureTypes): IWDFeature[] {
		return this.features.filter((f) => f.properties.type === type);
	}

	getAllFeatures(): IWDFeature[] {
		return this.features;
	}
}
