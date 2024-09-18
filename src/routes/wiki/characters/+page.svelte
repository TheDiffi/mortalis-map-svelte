<script lang="ts">
	export let data;
</script>

<div class="body">
	<ul>
		{#each data.characters as character}
			<li>
				<div class="name">{character.name}</div>
				<div class="info-container">
					<div class="age">Age: {character.age}</div>
					<div class="separator">-</div>
					<div class="origin">Origin: {character.origin}</div>
				</div>
				<div class="divider"></div>
				<div class="description">{character.description}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.body {
		margin: 1.8rem;
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
	}

	li {
		border: 1px solid black;
		margin: 1rem;
		padding: 1.5rem;
	}

	.name {
		font-size: 2rem;
		font-weight: bold;
	}

	.info-container {
		display: flex;
		font-size: 0.8rem;
		color: gray;
		margin-bottom: 1rem;
	}

	.separator {
		margin: 0 0.5rem;
	}

	.divider {
		width: 100%;
		height: 1px;
		background-color: gray;
		margin: 0.5rem 0;
	}
</style>
