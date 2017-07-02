import { ActionTypes, Action } from './actionTypes';

//Action Creators to create and return Actions
export const requestFiletypes = (): Action => ({
	type: ActionTypes.FETCH_FILETYPES_REQUEST
});

export const requestFiletypesSuccess = (origins: string[]): Action => ({
	type: ActionTypes.FETCH_FILETYPES_SUCCESS,
	payload: origins
});

export const requestOriginsrequestFiletypesError = (error: string): Action => ({
	type: ActionTypes.FETCH_FILETYPES_ERROR,
	payload: error
});
