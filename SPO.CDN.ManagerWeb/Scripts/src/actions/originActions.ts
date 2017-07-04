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

export const requestOriginsError = (error: Error): Action => ({
	type: ActionTypes.FETCH_ORIGINS_ERROR,
	payload: error.message
});

const addNewOriginError = (error: Error): Action => ({
	type: ActionTypes.ADD_NEW_ORIGIN_ERROR,
	payload: error.message
});

const addNewOriginRequest = (): Action => ({
	type: ActionTypes.ADD_NEW_ORIGIN_REQUEST
});

const addNewOriginSuccess = (): Action => ({
	type: ActionTypes.ADD_NEW_ORIGIN_SUCCESS
});

export const setOriginToAdd = (originUrl: string): Action => ({
	type: ActionTypes.SET_ORIGIN_TO_ADD,
	payload: originUrl
});

export const setOriginToDelete = (originUrl: string): Action => ({
	type: ActionTypes.SET_ORIGIN_TO_DELETE,
	payload: originUrl
});

export const toggleDefaultOriginsDialog = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_DEFAULT_ORIGIN_DIALOG,
	payload: toggle
});

export const toggleOriginsPanel = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_ORIGIN_PANEL,
	payload: toggle
});

export const toggleDeleteOriginsDialog = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_DELETE_ORIGIN_DIALOG,
	payload: toggle
});

const createDefaultOriginsRequest = (): Action => ({
	type: ActionTypes.CREATE_DEFAULT_ORIGIN_REQUEST
});

const deleteOriginsRequest = (): Action => ({
	type: ActionTypes.DELETE_ORIGIN_REQUEST
});

export function deleteOrigin(originToDelete: string) {

	return async (dispatch: any) => {

		dispatch(deleteOriginsRequest());

		try {
			const result: string[] = await api.post(`/Home/RemoveOrigin?originURL=${originToDelete}`);

			dispatch(requestOriginsSuccess(result));

		} catch (error) {
			dispatch(requestOriginsError(error));
		}
	};
}

export function createDefaultOrigins() {

	return async (dispatch: any) => {

		dispatch(createDefaultOriginsRequest());

		try {
			const result: string[] = await api.post('/Home/CreateDefaultOrigins');

			dispatch(requestOriginsSuccess(result));

		} catch (error) {
			dispatch(requestOriginsError(error));
		}
	};
}

export function addOrigin(originUrl: string) {

	return async (dispatch: any) => {

		dispatch(addNewOriginRequest());

		try {
			const result: string[] = await api.post(`/Home/AddOrigin?folderUrl=${originUrl}`);

			dispatch(requestOriginsSuccess(result));
			dispatch(addNewOriginSuccess());

		} catch (error) {
			dispatch(addNewOriginError(error));
		}
	};
}
