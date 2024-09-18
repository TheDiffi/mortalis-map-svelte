<div class="paper">
	<slot name="title" class="title" />
	<slot name="subtitle" class="subtitle" />
	<div class="body">
		<slot />
	</div>
</div>

<style>
	.paper {
		background-color: #f4f4f4;
		border-radius: 10px;
		padding: 30px;
		margin: 10px;
	}

	.body {
		margin-top: 20px;
	}
</style>
