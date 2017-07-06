export async function get(url: string): Promise<any> {
	return fetchInternal(url, 'GET');
}

export async function post(url: string, _body?: string): Promise<any> {
	return fetchInternal(url, 'POST', _body);
}

const fetchInternal = async (url: string, _method: string, _body?: string) => {
	const reqHeaders = new Headers({
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'Pragma': 'no-cache',
		'content-type': 'application/json; charset=utf-8',
		'dataType': 'json'
	});

	const reqInit: RequestInit = {
		credentials: 'same-origin',
		headers: reqHeaders,
		method: _method
	};

	if (_body){
		reqInit.body = _body;
	}
	const response: Response = await fetch(url, reqInit);

	if (response.ok) {
		return await response.json();
	}
	else {
		const errorText = await response.text();
		throw new Error(errorText);
	}
};
