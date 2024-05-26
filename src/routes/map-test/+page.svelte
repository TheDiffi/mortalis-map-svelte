<script>
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import MapButton from '$lib/components/Buttons/MapButton.svelte';
	import Map from '../map/Map.svelte';
	import Sidebar from '../map/MapSidebar.svelte';

	let active = false;
	import { sidebarContent } from '../../lib/functions/sidebar/sidebarStore';

	function updateContent() {
		sidebarContent.update((content) => content + '!');
	}
</script>

<div class="map-container">
	<Map />
</div>

<div class="button-container">
	<div>Test</div>
	<MapButton
		onClick={() => {
			console.log('clicked');
		}}>Test</MapButton
	>
	<HamburgerButton
		{active}
		onClick={() => {
			console.log('clicked', active);
			active = !active;
		}}
	/>
	<HamburgerButton
		{active}
		onClick={() => {
			console.log('clicked', active);
			active = !active;
		}}
		variant="close"
	/>
	<MapButton onClick={updateContent}>Change Content Store</MapButton>
</div>

<div class="test-sidebar-container">
	<Sidebar></Sidebar>
</div>

<style>
	.map-container {
		width: 400px;
		height: 400px;
	}
	.button-container {
		display: inline-flex;
	}
	.test-sidebar-container {
		position: absolute;
	}
</style>
