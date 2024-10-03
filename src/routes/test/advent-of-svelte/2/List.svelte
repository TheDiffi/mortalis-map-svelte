<script>
	// @ts-nocheck
	export let list = [];
	export let backgroundColor;
	export let icon;

	const green = '#ccd1ad';
	const red = '#F6E7E0';

	$: completeList = list.map((x) => ({
		...x,
		icon: x.tally >= 0 ? '✅' : '❌',
		color: x.tally >= 0 ? green : red
	}));
</script>

{#if list.length}
	<slot name="title"></slot>
	<ul>
		{#each completeList as item}
			<li style:--color={backgroundColor ?? item.color}>
				<span class="icon">{icon ?? item.icon}</span>
				<span class="name">{item.name}</span>
				<br />
				<span class="tally">Tally: {item.tally}</span>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		padding-left: 0;
	}

	li {
		--color: var(--christmas-color-seashell);

		margin: 0;
		padding: 0;
		list-style: none;

		margin-bottom: 0.5em;
		padding: 0.5em;
		width: fit-content;
		min-width: 50%;
		border-radius: 10px;
		background-color: var(--color);
	}

	.icon {
		content: var(--icon);
		display: inline-block;

		margin-right: 0.2em;
	}

	.name {
		font-size: 1.1em;
	}
	.tally {
		color: var(--christmas-color-cinnamon);
		font-size: 0.8em;
	}
</style>
