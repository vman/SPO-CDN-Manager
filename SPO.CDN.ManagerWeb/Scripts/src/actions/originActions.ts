import { ActionTypes, Action } from './actionTypes';

//Action Creators to create and return Actions
export const requestOrigins = (): Action => ({
	type: ActionTypes.FETCH_ORIGINS_REQUEST
});

export const requestOriginsSuccess = (origins: string[]): Action => ({
	type: ActionTypes.FETCH_ORIGINS_SUCCESS,
	payload: origins
});

export const requestOriginsError = (error: string): Action => ({
	type: ActionTypes.FETCH_ORIGINS_ERROR,
	payload: error
});
