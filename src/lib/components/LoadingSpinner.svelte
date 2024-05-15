<script>
	export let opaque = false;
	$: overlayOpacity = opaque ? 1 : 0.5;
</script>

<div class="overlay"></div>
<div class="spinner"></div>

<style>
	.spinner {
		border: 8px solid var(--color-gray-100);
		border-top: 8px solid var(--color-primary-100);
		border-radius: 50%;
		width: 60px;
		height: 60px;
		animation: spin 2s linear infinite;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.overlay {
		background-color: var(--color-surface-200);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: opacity(overlayOpacity);
	}

	@keyframes spin {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}
</style>
