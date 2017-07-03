const reqHeaders = new Headers({
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	'Pragma': 'no-cache'
});

export async function get(url: string): Promise<any> {
	return fetchInternal(url, 'GET');
}

export async function post(url: string): Promise<any> {
	return fetchInternal(url, 'POST');
}

const fetchInternal = async (url: string, _method: string) => {
	const response: Response = await fetch(url, {
		credentials: 'same-origin',
		headers: reqHeaders,
		method: _method
	});

	if (response.ok) {
		return await response.json();
	}
	else {
		const errorText = await response.text();
		throw new Error(errorText);
	}
};
