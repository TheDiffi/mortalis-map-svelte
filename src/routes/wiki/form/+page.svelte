<script>
	import Paper from '$lib/components/layout/Paper.svelte';
</script>

<div class="form-container">
	<Paper>
		<h1 slot="title">Create a new character</h1>
		<h5 slot="subtitle">Fill in the form below to create a new character</h5>
		<form>
			<label for="name">Name</label>
			<input type="text" id="name" name="name" required />

			<label for="age">Age</label>
			<input type="number" id="age" name="age" required />

			<label for="origin">Origin</label>
			<input type="text" id="origin" name="origin" required />

			<label for="description">Description</label>
			<textarea id="description" name="description" required></textarea>

			<button type="submit">Submit</button>
		</form>
	</Paper>
</div>

<style>
	.form-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
		margin-top: 2rem;
	}

	h1 {
		margin-bottom: 0rem;
		margin-left: -3px;
	}

	h5 {
		margin-top: 0.2rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.5rem;
	}

	input,
	textarea {
		margin-bottom: 1rem;
	}

	button {
		margin-top: 1rem;
	}
</style>
