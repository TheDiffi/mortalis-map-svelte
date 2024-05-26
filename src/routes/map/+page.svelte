<script>
	import Map from './Map.svelte';
	import Sidebar from './MapSidebar.svelte';
</script>

<div class="map-container">
	<Map />
</div>
<Sidebar>
	
</Sidebar>

<style>
	.map-container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
</style>
