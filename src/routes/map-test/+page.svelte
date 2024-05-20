<script>
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import HamburgerIcon from '$lib/components/Buttons/FancyHamburgerIcon.svelte';
	import MapButton from '$lib/components/Buttons/MapButton.svelte';
	import Map from '../map/Map.svelte';
	import Sidebar from '../map/MapSidebar.svelte';

	let active = false;
</script>

<div class="map-container">
	<Map />
</div>
<Sidebar hidden />

<div>Test</div>
<MapButton
	onClick={() => {
		console.log('clicked');
	}}
>Test</MapButton>


<HamburgerButton
	{active}
	onClick={() => {
		console.log('clicked', active);
		active = !active;
	}}
/>
<HamburgerButton {active} onClick={() => {
	console.log('clicked', active);
	active = !active;
}} variant="close" />

<style>
	.map-container {
		width: 400px;
		height: 400px;
	}
</style>
