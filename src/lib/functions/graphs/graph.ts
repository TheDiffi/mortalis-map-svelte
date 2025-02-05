type LineChartData = {
	date: Date;
	value: number;
};

type DerivativeData = {
	date: Date;
	value: number; // Rate of change in mg/dL per minute
};

export function calculateDerivative(data: LineChartData[]): DerivativeData[] {
	// Ensure data is sorted by date
	const sortedData = [...data].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	const derivatives: DerivativeData[] = [];

	for (let i = 1; i < sortedData.length; i++) {
		const current = sortedData[i];
		const previous = sortedData[i - 1];

		// Calculate time difference in minutes
		const timeDiff =
			(new Date(current.date).getTime() - new Date(previous.date).getTime()) / (1000 * 60);

		// Calculate value difference (Δy)
		const valueDiff = current.value - previous.value;

		// Calculate rate of change (Δy/Δt)
		const rateOfChange = valueDiff / timeDiff;

		// Use the midpoint time between readings for the derivative point
		const midpointTime = new Date(
			(new Date(current.date).getTime() + new Date(previous.date).getTime()) / 2
		);

		derivatives.push({
			date: midpointTime,
			value: Number(rateOfChange.toFixed(2)) // Round to 2 decimal places
		});
	}

	return derivatives;
}

// Optional: Add a smoothing function if the derivative is too noisy
export function smoothDerivative(
	derivatives: DerivativeData[],
	windowSize: number = 3
): DerivativeData[] {
	const smoothed: DerivativeData[] = [];

	for (let i = 0; i < derivatives.length; i++) {
		const window = derivatives.slice(
			Math.max(0, i - Math.floor(windowSize / 2)),
			Math.min(derivatives.length, i + Math.floor(windowSize / 2) + 1)
		);

		const avgValue = window.reduce((sum, point) => sum + point.value, 0) / window.length;

		smoothed.push({
			date: derivatives[i].date,
			value: Number(avgValue.toFixed(2))
		});
	}

	return smoothed;
}
