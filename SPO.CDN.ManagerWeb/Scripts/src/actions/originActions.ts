import { ActionTypes, Action } from './actionTypes';
import * as api from '../api';

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

const addNewOriginRequest = (): Action => ({
	type: ActionTypes.ADD_NEW_ORIGIN_REQUEST
});

export function addNewOrigin() {

	return async (dispatch: any) => {

		dispatch(addNewOriginRequest());

		try {
			const result: string[] = await api.post('/Home/GetCDNSettings');

			dispatch(requestOriginsSuccess(result));

		} catch (error) {
			dispatch(requestOriginsError(error));
		}
	};
}
