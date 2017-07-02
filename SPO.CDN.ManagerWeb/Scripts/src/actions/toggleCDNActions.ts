import { ActionTypes, Action } from './actionTypes';

//Action Creators to create and return Actions
const toggleCDNRequest = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_CDN_REQUEST,
	payload: toggle
});

export const toggleCDNSuccess = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_CDN_SUCCESS,
	payload: toggle
});

const toggleCDNError = (error: string): Action => ({
	type: ActionTypes.TOGGLE_CDN_ERROR,
	payload: error
});

export const toggleCDN = (toggle: boolean) => {
	return (dispatch: any) => {

		dispatch(toggleCDNRequest(toggle));

		const reqHeaders = new Headers({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache'
		});

		return fetch('/Home/GetCDNSettings', {
			credentials: 'same-origin',
			headers: reqHeaders
		}).then(
			(response) => response.json(),
			(error) => dispatch(toggleCDNError(error))
			)
			.then((json: boolean) => {
				dispatch(toggleCDNSuccess(json));
			});
	};
};
