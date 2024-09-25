<script lang="ts">
	type Route = {
		path: string;
		label: string;
	};

	export let routes: Route[] = [];
</script>

<div class="links">
	{#each routes as route}
		<p>
			Visit <a href={route.path}>{route.label}</a>
		</p>
	{/each}
</div>

<style>
	p {
		color: #333;
	}
	a {
		color: #ff3e00;
		text-decoration: none;
	}
	a:hover {
		color: #b43e17;
		text-decoration: underline;
	}
	.links {
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
</style>
