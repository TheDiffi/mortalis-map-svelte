<script lang="ts">
	type Corner = 'top-left' | 'bottom-left' | 'bottom right' | 'top-right';

	export let corner: Corner;
    export let style = '';

</script>

<div class="corner {corner}" style={style}>
	<slot />
</div>

<style>
	.corner {
		position: absolute;
	}

	.top-right {
		top: 0;
		right: 0;
	}

	.top-left {
		top: 0;
		left: 0;
	}

	.bottom-left {
		bottom: 0;
		left: 0;
	}

	.bottom-right {
		bottom: 0;
		right: 0;
	}
</style>
