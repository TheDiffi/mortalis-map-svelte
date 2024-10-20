<script>
	import HamburgerButton from '$lib/components/Buttons/HamburgerButton.svelte';
	import { onMount } from 'svelte';
	import { sidebarContent } from '../../lib/functions/sidebar/sidebarStore';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { useMediaQuery } from '$lib/functions/useMediaQuery';

	export let hidden = false;
	let active = !hidden;
	let buttonRotation = '0deg';

	let isSmallStore = useMediaQuery('(min-width: 600px)');

	onMount(() => {
		function registerRotateButton() {
			const handleResize = () => (buttonRotation = window.innerWidth <= 600 ? '-90deg' : '0deg');
			window.addEventListener('resize', handleResize);
			handleResize(); // Call once to set initial rotation
			return () => window.removeEventListener('resize', handleResize);
		}

		return registerRotateButton();
	});

	function toggleSidebar() {
		active = !active;
	}
</script>

<div class="sidebar-container">
	<div class="button-container" class:active>
		<HamburgerButton variant="arrow-1" {active} rotation={buttonRotation} onClick={toggleSidebar} />
	</div>
	{#if active}
		<div
			id="sidebar"
			transition:fly={{
				duration: 300,
				opacity: 1,
				x: $isSmallStore ? -600 : 0,
				y: $isSmallStore ? 0 : 500,
				easing: quintOut
			}}
		>
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

		width: 100%;
	}

	#sidebar {
		position: relative;
		width: 100%;
		overflow: scroll;
		background-color: var(--color-primary-700);
		height: 20vh;
		left: 0;
		top: 0;
	}

	#sidebar.not-active {
		top: 21vh;
	}

	.button-container {
		position: absolute;
		bottom: 0;
		left: 0;
		height: fit-content;
		width: fit-content;
		z-index: 100;
		padding: 15px;

		transform: translateY(0px);
		transition: transform 0.31s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.button-container.active {
		transform: translateY(calc(-20vh - -100%));
	}

	#content-container {
		padding: 10px 20px 20px 70px;
	}

	:global(#content-container ul) {
		padding-left: 1rem;
	}

	:global(#content-container ul li) {
		margin-bottom: 0.5rem;
	}

	:global(#content-container blockquote) {
		margin: 1rem 0;
	}

	@media (min-width: 600px) {
		.sidebar-container {
			top: 0;
			width: initial;
		}

		#sidebar.not-active {
			left: -50%;
			top: 0;
		}

		#sidebar {
			display: block;
			height: 100vh;
			max-height: inherit;
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

		.button-container.active {
			transform: translateY(0px);
		}
	}
</style>
