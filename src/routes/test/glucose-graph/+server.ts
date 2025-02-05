export async function GET() {
	const response = await fetch('https://legendary-api.davidpenn.dev/cgm?type=graph', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
