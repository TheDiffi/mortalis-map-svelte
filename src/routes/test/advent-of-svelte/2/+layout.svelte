<div class="head-container">
	<div class="head">
		<div>
			<h1>Day 2</h1>
			<h2>Merry Munch-o-Meter</h2>
		</div>
	</div>

	<div class="content"><slot /></div>
</div>

<style>
	.head-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.head {
		min-width: 300px;
		min-height: 150px;
		width: fit-content;
		background-color: var(--christmas-color-sienna);
		display: flex;
		align-items: center;
		padding: 0 2em;
		padding-left: 40px;
		border-radius: 0 30px 30px 0;
		transform: translateX(-30px);
		margin: 30px 0;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='%23F6E7E0FF' stroke-width='25' stroke-dasharray='2%2c 6' stroke-dashoffset='28' stroke-linecap='butt'/%3e%3c/svg%3e");
	}

	.head h1 {
		color: var(--christmas-color-seashell);
		font-size: 3em;
		font-weight: 800;
		margin-right: 5px;
		margin-bottom: 0;
	}

	.head h2 {
		color: var(--christmas-color-seashell);
		font-size: 1.2em;
		font-weight: 800;
		margin-top: -5px;
		margin-bottom: 35px;
	}

	.content {
		flex-grow: 1;
		padding-left: 1em;
	}
</style>
