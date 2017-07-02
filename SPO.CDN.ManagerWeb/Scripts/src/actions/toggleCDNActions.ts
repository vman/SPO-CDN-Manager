import { ActionTypes, Action } from './actionTypes';
import { fetchCDNSettings, requestCDNSettingsError } from '../actions/actionCreators';

//Action Creators to create and return Actions
const toggleCDNRequest = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_CDN_REQUEST,
	payload: toggle
});

export const toggleCDNSuccess = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_CDN_SUCCESS,
	payload: toggle
});

const toggleCDNError = (): Action => ({
	type: ActionTypes.TOGGLE_CDN_ERROR
});

export const showConfirmationDialog = (): Action => ({
	type: ActionTypes.TOGGLE_CDN_CONFIRM
});

export const closeConfirmationDialog = (): Action => ({
	type: ActionTypes.TOGGLE_CDN_CONFIRM_NO
});

export const toggleCDN = (toggle: boolean) => {
	return async (dispatch: any) => {

		dispatch(toggleCDNRequest(toggle));

		const reqHeaders = new Headers({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache'
		});

		const response = await fetch(`/Home/SetCDN?value=${toggle}`, {
			credentials: 'same-origin',
			method: 'POST',
			headers: reqHeaders
		});

		if (response.ok) {
			const responseJSON: boolean = await response.json();
			dispatch(toggleCDNSuccess(responseJSON));
			dispatch(fetchCDNSettings());
		}
		else {
			const responseText = await response.text();
			dispatch(toggleCDNError());
			dispatch(requestCDNSettingsError(responseText));
		}
	};
};
