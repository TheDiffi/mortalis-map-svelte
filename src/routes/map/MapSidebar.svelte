<script>
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import { onMount } from 'svelte';
	import { sidebarContent } from '../../lib/functions/sidebar/sidebarStore';

	export let hidden = false;
	let active = true;
	let buttonRotation = '0deg';
	$: position = active ? '0' : '-100%';

	onMount(() => {
		return rotateButtonOnMobile();
	});

	function rotateButtonOnMobile() {
		const handleResize = () => (buttonRotation = window.innerWidth <= 600 ? '-90deg' : '0deg');
		window.addEventListener('resize', handleResize);
		handleResize(); // Call once to set initial rotation

		return () => window.removeEventListener('resize', handleResize);
	}

	function toggleSidebar() {
		active = !active;
	}
</script>

<div class="sidebar-container">
	<div class="button-container" class:active>
		<HamburgerButton variant="arrow-1" {active} rotation={buttonRotation} onClick={toggleSidebar} />
	</div>
	{#if !hidden}
		<div id="sidebar" class:not-active={!active}>
			<div id="content-container">
				{@html $sidebarContent}
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
		position: relative;
		width: 100%;
		overflow: scroll;
		background-color: var(--color-primary-700);
		left: 0;
		top: 0;
		transition:
			left 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
			top 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	#sidebar.not-active {
		top: 21vh ;
	}

	.button-container {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 100;
		padding: 15px;
	}

	.button-container.active {
		bottom: auto;
	}

	#content-container {
		padding: 10px 20px 20px 70px;
	}

	@media (min-width: 600px) {
		.sidebar-container {
			top: 0;
		}

		#sidebar.not-active {
			left: -50% ;
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
