<script>
	import Map from '../map/Map.svelte';
	import Sidebar from '../map/Sidebar.svelte';
</script>

<div class="map-container">
	<Map />
</div>
<Sidebar hidden/>

<style>
	.map-container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 400px;
		height: 400px;
	}
</style>
