import { IOffice365CDNManagerDTO } from '../types';
import { ActionTypes, Action } from './actionTypes';
import { requestOriginsSuccess } from './originActions';
import { requestFiletypesSuccess } from './filetypeActions';
import { toggleCDNSuccess } from './toggleCDNActions';

//Action Creators to create and return Actions
const requestCDNSettings = (): Action => ({
	type: ActionTypes.FETCH_CDN_SETTINGS_REQUEST
});

const requestCDNSettingsSuccess = (spositeurl: string): Action => ({
	type: ActionTypes.FETCH_CDN_SETTINGS_SUCCESS,
	payload: spositeurl
});

const requestCDNSettingsError = (error: string): Action => ({
	type: ActionTypes.FETCH_CDN_SETTINGS_ERROR,
	payload: error
});

export function fetchCDNSettings() {
	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.

	return (dispatch: any) => {
		// First dispatch: the app state is updated to inform
		// that the API call is starting.

		dispatch(requestCDNSettings());

		// The function called by the thunk middleware can return a value,
		// that is passed on as the return value of the dispatch method.

		const reqHeaders = new Headers({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache'
		});

		// In this case, we return a promise to wait for.
		// This is not required by thunk middleware, but it is convenient for us.
		return fetch('/Home/GetCDNSettings', {
			credentials: 'same-origin',
			headers: reqHeaders
		}).then(
			(response) => response.json(),
			(error) => dispatch(requestCDNSettingsError(error))
			)
			.then((json: IOffice365CDNManagerDTO) => {
				// We can dispatch many times!
				// Here, we update the app state with the results of the API call.

				dispatch(requestCDNSettingsSuccess(json.SPOSiteUrl));
				dispatch(requestOriginsSuccess(json.Origins));
				dispatch(requestFiletypesSuccess(json.Filetypes));
				dispatch(toggleCDNSuccess(json.PublicCDNEnabled));
			});
	};
}
