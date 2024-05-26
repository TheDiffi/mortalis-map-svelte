<script lang="ts">
</script>

<button class="button" on:click>
	<slot></slot>
</button>

<style>
	.button {
		background: var(--color-gray-50);
		border: 2px solid var(--color-gray-400);
		border-radius: 6px;
		padding: 3px;
		margin: 0;
		outline: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease-in-out;
	}

	.button > * {
		transition: inherit;
	}
</style>
