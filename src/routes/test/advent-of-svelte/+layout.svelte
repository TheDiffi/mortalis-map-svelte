<script>
	import House from '$lib/icons/House.svelte';

	const days = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	];

	const availableDays = [1];
</script>

<div class="sidebar-container">
	<div class="sidebar">
		<h1 class="title">DAYS</h1>
		<div class="calendar">
			{#each days as day}
				<a class:available={availableDays.includes(day)} href={`${day}`}>{day}</a>
			{/each}
			<a href="/test/advent-of-svelte/home"> <House style="height:1em" /> </a>
		</div>
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.sidebar-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100%;
	}

	.sidebar {
		flex: 1 1 20%;
		max-width: 500px;
		background-color: var(--christmas-color-olive);
		padding: 30px;
		z-index: 1;
	}

	.content {
		flex: 4 1 80%;
		display: flex;
		flex-direction: column;
		overflow: scroll;
	}

	.title {
		color: white;
		font-size: 5em;
		font-synthesis: 1px;
		padding-bottom: 0;
	}

	.calendar {
		display: flex;
		flex-direction: row;
		justify-content: baseline;
		flex-wrap: wrap;
		width: 100%;
		gap: 1em;
	}

	.calendar a {
		text-decoration: none;
		height: 35px;
		width: 35px;
		border: 3px solid var(--christmas-color-peach);
		border-radius: 30%;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 800;
		color: var(--christmas-color-cinnamon);
	}

	.calendar a.available {
		color: var(--christmas-color-licorice);
	}

	.calendar a:hover {
		background-color: var(--christmas-color-peach);
		color: white;
	}

	:global(.calendar a svg) {
		fill: var(--christmas-color-licorice);
	}

	:global(.calendar a:hover svg) {
		fill: var(--christmas-color-seashell);
	}
</style>
