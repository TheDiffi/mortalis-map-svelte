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
			path: '/beyonk',
			label: 'Beyonk Map'
		}
	];
</script>

<div style="margin: 1em; padding-top:2em;text-align: center;">
	<h1>Where to?</h1>
	<Subroutes {routes} />
</div>

<style>
	h1 {
		color: #ff3e00;
		font-size: 5em;
		font-synthesis: 1px;
		padding-bottom: 0;
	}
</style>
