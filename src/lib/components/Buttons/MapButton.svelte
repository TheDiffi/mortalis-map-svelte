<script lang="ts">
</script>

<button class="button" on:click>
	<slot></slot>
</button>

<style>
	.button {
		background: var(--color-gray-50);
		border: 0;
		border-radius: 6px;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
		padding: 5px 8px;
		margin: 0;
		outline: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.1s ease-in-out;
	}

	.button:hover {
		background: var(--color-gray-200);
	}

	.button > * {
		transition: inherit;
	}
</style>
