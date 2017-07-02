import { ActionTypes, Action } from './actionTypes';

//Action Creators to create and return Actions
export const toggleCDNRequest = (): Action => ({
	type: ActionTypes.TOGGLE_CDN_REQUEST
});

export const toggleCDNSuccess = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_CDN_SUCCESS,
	payload: toggle
});

export const toggleCDNError = (error: string): Action => ({
	type: ActionTypes.TOGGLE_CDN_ERROR,
	payload: error
});
