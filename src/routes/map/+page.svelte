<script>
	import Map from './Map.svelte';
	import Sidebar from './MapSidebar.svelte';
</script>

<div class="map-container">
	<Map />
</div>
<Sidebar>
	<div slot="content">
		<h1>Map Sidebar</h1>
		<p>Some content here</p>
	</div>
</Sidebar>

<style>
	.map-container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.map-container-test {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 400px;
		height: 400px;
	}
</style>
