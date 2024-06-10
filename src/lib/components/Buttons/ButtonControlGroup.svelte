<script lang="ts">
	type ControlButton = {
		value: string;
		title: string;
		style?: string;
		active?: boolean;
		disabled?: boolean;
		on: { click: (value: string) => void };
	};

	export let buttons: ControlButton[];
</script>

<div class="control-group">
	{#each buttons as button}
		<button
			value={button.value}
			class:active={button.active}
			disabled={button.disabled}
			style={button.style}
			on:click={() => button.on.click(button.value)}>{button.title}</button
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
		z-index: 2;
		position: relative;
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
