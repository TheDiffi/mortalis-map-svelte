<script lang="ts">
	import { LineChart } from 'layerchart';
	import { onMount } from 'svelte';
	import { calculateDerivative, smoothDerivative } from '$lib/functions/graphs/graph';

	let lineChartData: LineChartData[] = [];

	$: firstDerivative = lineChartData?.length
		? smoothDerivative(calculateDerivative(lineChartData), 3)
		: [];

	type LineChartData = {
		date: Date;
		value: number;
	};

	type GlucoseData = {
		Value: number;
		Timestamp: string;
		ValueInMgPerDl: number;
		isHigh: boolean;
		isLow: boolean;
	};

	onMount(async () => {
		const response = await fetch('/test/glucose-graph');
		const data: GlucoseData[] = await response.json();
		lineChartData = data.map((v) => ({
			date: new Date(v.Timestamp),
			value: v.Value
		}));

		console.log('lineChartData >>:', lineChartData);
		firstDerivative = lineChartData.map((v, i) => {
			if (i === 0) {
				return { date: v.date, value: 0 };
			}
			return { date: v.date, value: v.value - lineChartData[i - 1].value };
		});
	});
</script>

<main>
	<h1 class="my-6 p-2 text-center text-4xl font-bold">Glucose Graph Data</h1>
	<div
		class="mx-auto flex min-h-[600px] max-w-screen-lg flex-col items-center justify-center space-y-4 bg-surface-300 p-4"
	>
		{#if lineChartData.length > 0}
			<div class="w-full rounded border bg-surface-200 p-4">
				<h4 class="text-2xl font-bold">Glucose Level</h4>
				<div class="h-[300px] rounded border bg-surface-100 p-4">
					<LineChart data={lineChartData} x="date" y="value" renderContext="svg" />
				</div>
			</div>

			<div class="w-full rounded border bg-surface-200 p-4">
				<h4 class="text-2xl font-bold">First Derivative</h4>
				<div class="h-[300px] rounded border bg-surface-100 p-4">
					<LineChart data={firstDerivative} x="date" y="value" renderContext="svg" />
				</div>
			</div>
		{:else}
			<div class="rounded border bg-surface-200 p-7 text-center">
				<p class="text-xl">Loading...</p>
			</div>
		{/if}
	</div>
</main>
