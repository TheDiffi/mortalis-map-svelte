<script>
	import { onMount } from 'svelte';

	export let hidden = false;
	let sidebarVisible = true;

	/* onMount(() => {
		sidebarVisible = window.innerWidth > 600;
	}); */
	let test = '60px';

	function toggleSidebar() {
		sidebarVisible = !sidebarVisible;
	}
</script>

<div class="sidebar-container">
	<div class="button-container" class:active={sidebarVisible}>
		<button class="button" class:rotate={!sidebarVisible} on:click={toggleSidebar}
			><img
				src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/null/external-mobile-application-hamburger-menu-setting-interface-basic-regular-tal-revivo.png"
				alt="Toggle Sidebar"
			/></button
		>
	</div>
	{#if !hidden && sidebarVisible}
		<div id="sidebar">
			<div id="sidebar-content">
				<h2 style="padding-bottom: 5px">Welcome to Icewind Dale</h2>
				<hr />
				<p>
					Click markers to view more information about the location <br /><br />
					You can also hold the right key to pan and rotate the map <br /><br />
					Try out the elements in the corner to see what they do! <br /><br />
					Also, I've heard that easthaven looks really good from up close ;)
				</p>
				<p>
					Click markers to view more information about the location <br /><br />
					You can also hold the right key to pan and rotate the map <br /><br />
					Try out the elements in the corner to see what they do! <br /><br />
					Also, I've heard that easthaven looks really good from up close ;)
				</p>
				<p>
					Click markers to view more information about the location <br /><br />
					You can also hold the right key to pan and rotate the map <br /><br />
					Try out the elements in the corner to see what they do! <br /><br />
					Also, I've heard that easthaven looks really good from up close ;)
				</p>
				<p>
					Click markers to view more information about the location <br /><br />
					You can also hold the right key to pan and rotate the map <br /><br />
					Try out the elements in the corner to see what they do! <br /><br />
					Also, I've heard that easthaven looks really good from up close ;)
				</p>
				<p>
					Click markers to view more information about the location <br /><br />
					You can also hold the right key to pan and rotate the map <br /><br />
					Try out the elements in the corner to see what they do! <br /><br />
					Also, I've heard that easthaven looks really good from up close ;)
				</p>
				<p>
					Click markers to view more information about the location <br /><br />
					You can also hold the right key to pan and rotate the map <br /><br />
					Try out the elements in the corner to see what they do! <br /><br />
					Also, I've heard that easthaven looks really good from up close ;)
				</p>
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
	}

	#sidebar {
		display: block;
		width: 100%;
		overflow: scroll;
		background-color: blanchedalmond;
	}

	.button-container {
		display: block;
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

	.button {
		background: var(--color-gray-50);
		border: 2px solid var(--color-gray-400);
		border-radius: 6px;
		padding: 3px;
		margin: 0;
		outline: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease-in-out;
	}

	.button > * {
		transition: inherit;
	}

	.rotate {
		transform: rotate(90deg);
	}

	#sidebar-content {
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

		#sidebar-content {
			padding: 80px 50px 30px;
		}

		.button-container {
			top: 0;
		}
	}
</style>
