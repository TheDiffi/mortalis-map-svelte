<script>
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import { onMount } from 'svelte';

	export let hidden = false;
	let active = true;
	let rotation = '0deg';

	function toggleSidebar() {
		active = !active;
	}

	onMount(() => {
		const handleResize = () => (rotation = window.innerWidth <= 600 ? '-90deg' : '0deg');
		window.addEventListener('resize', handleResize);
		handleResize(); // Call once to set initial rotation

		return () => window.removeEventListener('resize', handleResize);
	});
</script>

<div class="sidebar-container">
	<div class="button-container" class:active>
		<HamburgerButton variant="arrow-1" {active} {rotation} onClick={toggleSidebar} />
	</div>
	{#if !hidden && active}
		<div id="sidebar">
			<div id="content-container">
				<slot name="content" />
			</div>
		</div>
	{/if}
</div>

<style>
	.sidebar-container {
		position: absolute;
		bottom: 0;
		left: 0;
		max-height: 20vh;
		width: 100%;
	}

	#sidebar {
		width: 100%;
		overflow: scroll;
		background-color: var(--color-primary-700);
	}

	.button-container {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
		padding: 15px;
	}

	.button-container.active {
		top: 0;
		bottom: auto;
	}

	#content-container {
		padding: 10px 20px 20px 70px;
	}

	@media (min-width: 600px) {
		.sidebar-container {
			top: 0;
		}

		#sidebar {
			display: block;
			height: 100vh;
			width: 25vw;
			max-width: 700px;
			min-width: 300px;
		}

		#content-container {
			padding: 80px 50px 30px;
		}

		.button-container {
			top: 0;
		}
	}
</style>
