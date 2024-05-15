<script lang="ts">
	import HamburgerIcon from './FancyHamburgerIcon.svelte';
	import Button from './MapButton.svelte';
	import type { HamburgerButtonVariant } from './types';

	export let onClick: (e: MouseEvent) => void;
	export let active = false;
	export let variant: HamburgerButtonVariant = 'simple';
	export let rotation = '90deg';

	function handleClick(e: MouseEvent) {
		if (onClick) {
			onClick(e);
			return;
		}

		active = !active;
	}
</script>

<div>
	{#if variant === 'simple'}
		<Button onClick={handleClick}>
			<img
				style="transform: {active ? `rotate(${rotation})` : `none`}"
				class="hamburger-button"
				src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/null/external-mobile-application-hamburger-menu-setting-interface-basic-regular-tal-revivo.png"
				alt="Toggle Sidebar"
			/>
		</Button>
	{:else}
		<Button onClick={handleClick}>
			<HamburgerIcon {active} {variant} --rotation={rotation}/>
		</Button>
	{/if}
</div>

<style>
	.hamburger-button {
		padding: auto;
		transition: all 0.3s ease-out;
	}
</style>
