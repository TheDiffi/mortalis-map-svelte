<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import List from './List.svelte';
	import Input from '$lib/components/common/ui/input/input.svelte';

	let data = [];
	let input = '';

	$: nice = data.filter((x) => x?.tally >= 0).sort((a, b) => b.tally - a.tally);
	$: naughty = data.filter((x) => x?.tally < 0).sort((a, b) => a.tally - b.tally);
	$: found = data.filter((x) => x.name.toLowerCase().includes(input.toLowerCase()));

	onMount(async () => {
		const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		console.log('response >>:', response);
		const result = await response.json();
		console.log('result >>:', result);
		// Assuming result has a structure that includes an array of items with a 'tally' property
		// Adjust the following line according to the actual structure of the fetched data
		data = result || [];
	});
</script>

<h1 class="my-4 text-5xl font-extrabold">Advent of Svelte</h1>

{#if data.length === 0}
	<p>Loading...</p>
{:else}
	<Input bind:value={input} placeholder="Search" class="my-3  max-w-64" />
	<div class="list-container">
		{#if input}
			<div>
				<List bind:list={found}>
					<span slot="title"><h2 class="py-3 text-3xl">Found</h2></span>
				</List>
			</div>
		{/if}
		<div>
			<List backgroundColor="#ccd1ad" icon="✅" bind:list={nice}>
				<span slot="title"><h2 class="py-3 text-3xl">Nice</h2></span>
			</List>
		</div>
		<div>
			<List icon="❌" bind:list={naughty}>
				<span slot="title"><h2 class="py-3 text-3xl">Naughty</h2></span>
			</List>
		</div>
	</div>
{/if}

<style>
	.list-container {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	.list-container div {
		flex: 1;
	}
</style>
