<script lang="ts">
	import MapButton from '$lib/components/Buttons/MapButton.svelte';
	import type { MarkerLayer, MarkerTypes } from '$lib/functions/map/markers/types';

	export let markerLayers: MarkerLayer[];
	export let toggleSessionMarkers: (layerName: MarkerTypes) => void;
</script>

<div class="control-group">
	{#each markerLayers as markerLayer}
		<button
			value={markerLayer.type}
			class:active={markerLayer.active}
			on:click={() => toggleSessionMarkers(markerLayer.type)}>{markerLayer.title}</button
		>
	{/each}
</div>

<style>
	.control-group {
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		pointer-events: auto;
		background-color: white;
		display: flex;
		flex-direction: column;
	}

	button {
		background-color: transparent;
		border: 0;
		box-sizing: border-box;
		cursor: pointer;
		display: block;
		height: 29px;
		outline: none;
		overflow: hidden;
		padding: 1px 5px;
	}

	button.active {
		background-color: rgb(0 0 0/10%);
	}

	button:first-child {
		border-radius: 4px 4px 0 0;
	}

	button:last-child {
		border-radius: 0 0 4px 4px;
	}

	button + button {
		border-top: 1px solid #ddd;
	}

	button:not(:disabled):hover {
		background-color: rgb(0 0 0/5%);
	}
</style>
