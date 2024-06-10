/* import { RulerControl } from "mapbox-gl-controls";
import StylesSwitcher from "./stylesSwitcher";
import { TO_METER as MAPBOX_TO_MILES } from "../constants";
import { LengthConverter } from "./lengthConverter";

export const styles = [
	{
		label: "Normal",
		styleName: "Normal",
		styleUrl: "mapbox://styles/thediffi/cld7hz283000j01ockqljc73u",
	},
	{
		label: "Player",
		styleName: "Player",
		styleUrl: "mapbox://styles/thediffi/cleizzrd3000601nvl3tlp6q3",
	},
];

const switchToFeetZoomLevel = 16;

export default function loadMapControls(map, controls, changeStyle) {
	// with custom styles:
	loadStyleSwitcher();

	function loadStyleSwitcher() {
		const styleSwitcher = new StylesSwitcher({
			styles: styles,
			onChange: (style) => changeStyle(style.label),
		});

		// removes existing style switcher
		if ("styleSwitcher" in controls) {
			map.removeControl(controls["styleSwitcher"]);
			delete controls["styleSwitcher"];
		}

		map.addControl(styleSwitcher, "bottom-right");
		controls["styleSwitcher"] = styleSwitcher;
	}

}

var activeEnum = "style-switcher-active";

export default class StylesSwitcher extends Base {
	styles;
	onChange;
	buttons;
	first;

	constructor(options) {
		super();
		this.styles = options?.styles ?? this.defaultOptions;
		this.onChange = options?.onChange;
		this.buttons = [];
		this.first = true;
	}

	createButton(style) {
		button.onClick(() => {
			if (isActive(button)) return;
			this.map.setStyle(style.styleUrl);
			this.buttons.forEach((button) => {
				setActive(false, button);
			});
			setActive(true, button);
		});
		
	}
}

 */