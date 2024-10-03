<script lang="ts">
	export let clazz: string = '';
</script>

<div class="paper {clazz}">
	<slot name="title" class="title" />
	<slot name="subtitle" class="subtitle" />
	<div class="body">
		<slot />
	</div>
</div>

<style>
	.paper {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 2px solid #9b9b9b;
		background-color: #f9f9f9;
		box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		width: fit-content;
		margin: 0 auto;
		padding: 3em 4em;
	}

	.body {
		margin-top: 20px;
	}
</style>
