const reqHeaders = new Headers({
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	'Pragma': 'no-cache'
});

export async function get(url: string): Promise<any> {

	const response: Response = await fetch(url, {
		credentials: 'same-origin',
		headers: reqHeaders
	});

	if (response.ok) {
		return await response.json();
	}
	else {
		const errorText = await response.text();
		throw new Error(errorText);
	}
}
