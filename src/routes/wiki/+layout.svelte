<nav>
	<a href="/wiki/characters">Characters</a>
	<a href="/wiki/form">Form</a>
</nav>

<slot />

<style>
	nav {
		background: #f4f4f4;
		padding: 1rem;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	nav a {
		margin: 0 1rem;
		text-decoration: none;
		color: #333;
		border-radius: 5px;
		background-color: #e4e4e4;
		padding: 0.7rem 1.2rem;
	}

	nav a:hover {
		background-color: #d4d4d4;
	}
</style>
