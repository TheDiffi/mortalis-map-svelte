<script>
	import Map from './Map.svelte';
	import Sidebar from './MapSidebar.svelte';
</script>

<div class="map-container">
	<Map />
</div>
<Sidebar>
	<div slot="content">
		<h2 style="padding-bottom: 5px">Welcome to Icewind Dale</h2>
		<hr />
		<p>
			Click markers to view more information about the location <br /><br />
			You can also hold the right key to pan and rotate the map <br /><br />
			Try out the elements in the corner to see what they do! <br /><br />
			Also, I've heard that easthaven looks really good from up close ;)
		</p>
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
</style>
