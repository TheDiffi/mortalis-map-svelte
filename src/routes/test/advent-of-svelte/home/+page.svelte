<script>
	import Mistletoe from '$lib/components/icons/Mistletoe.svelte';
	import Paper from '$lib/components/layout/Paper.svelte';
</script>

<div class="my-auto min-h-screen bg-gray-100 p-8 text-center">
	<h1 class="mb-6 mt-20 text-5xl font-bold text-svelte">
		Advent of Svelte <div class="mistletoe"><Mistletoe /></div>
	</h1>
	<p class="mb-4 text-center text-lg">A Svelte challenge for each day until Christmas Eve!</p>
	<p class="mb-8 text-center text-lg">
		Join the festivities and participate in a daily frontend challenge using Svelte.
	</p>
	<p class="mb-4 pt-6 text-2xl font-semibold">The challenges</p>
	<div class="container w-1/2">
		<Paper>
			<div class="quote relative italic">
				<p class="relative z-10 mb-4 text-base">
					Every year, Santa and his elves work around the clock to prepare for Christmas. This year,
					however, he faces an unprecedented challenge. The Magical Christmas Code, which powers
					Santa's Sleigh and ensures the smooth delivery of presents, was shattered into 24
					fragments.
				</p>
				<p class="relative z-10 mb-4 text-base">
					Santa immediately called upon his sentient robot assistant Svelte Bot to get the sleigh
					operational, but they can't do it alone. Each day, a new challenge awaits - a unique
					puzzle that, when solved, will unlock a fragment of the Magical Christmas Code. Will you
					help Santa and Svelte Bot fix the Sleigh and save Christmas?!
				</p>
			</div>
		</Paper>
	</div>
</div>

<style>
	.mistletoe {
		width: 50px;
		display: inline-block;
		position: absolute;
		transform: translate(-5px, -25px) rotate(30deg);
	}

	.quote::before {
		content: '“';
		font-size: 2em;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(-60%) translateY(-30%);
		font-size: 16em;
		padding: 0;
		margin: 0;
		color: var(--color-gray-300);
		z-index: 0;
	}

	.quote::after {
		content: '”';
		font-size: 2em;
		position: absolute;
		height: fit-content;
		bottom: 0;
		right: 0;
		transform: translateX(20%) translateY(60%);
		font-size: 16em;
		padding: 0;
		margin: 0;
		color: var(--color-gray-300);
		z-index: 0;
	}
</style>
