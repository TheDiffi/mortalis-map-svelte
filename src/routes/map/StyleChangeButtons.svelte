<script lang="ts">
	import ButtonControlGroup from '$lib/components/Buttons/ButtonControlGroup.svelte';
	import type { MapStyle } from '$lib/functions/map/map.types';

	export let setStyle: (styleName: string) => void;
	export let mapStyles: MapStyle[];

	$: buttons = mapStyles.map((style) => {
		return {
			value: style.name,
			title: style.title + style.active,
			active: style.active,
			on: {
				click: setStyle
			}
		};
	});
</script>

<ButtonControlGroup {buttons} />
