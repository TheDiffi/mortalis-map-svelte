<script>
	import Subroutes from '$lib/components/common/Subroutes.svelte';

	const routes = [
		{
			path: '/',
			label: 'Home'
		},
		{
			path: '/test/beyonk',
			label: 'the Beyonk Map'
		},
		{
			path: '/test/advent-of-svelte',
			label: 'the Advent of Svelte'
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
