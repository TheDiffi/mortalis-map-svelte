<script>
	import Subroutes from '$lib/components/common/Subroutes.svelte';

	const routes = [
		{
			path: '/',
			label: 'Home'
		},
		{
			path: '/map',
			label: 'The Map'
		},
		{
			path: '/map-test',
			label: 'The Map Test Area'
		},
		{
			path: '/test',
			label: 'The General Test Page'
		}
	];
</script>

<div class="m-4 pt-8 text-center">
	<h1 class="text-8xl font-bold m-20 pt-20" >Where to?</h1>
	<Subroutes {routes} />
</div>

<style>
	h1 {
		color: #ff3e00;
	}
</style>
