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

export const toggleDeleteFiletypeDialog = (toggle: boolean): Action => ({
	type: ActionTypes.TOGGLE_DELETE_FILETYPE_DIALOG,
	payload: toggle
});

export const setFiletypeToDelete = (filetype: string): Action => ({
	type: ActionTypes.SET_FILETYPE_TO_DELETE,
	payload: filetype
});

export const setFiletypeToAdd = (filetype: string): Action => ({
	type: ActionTypes.SET_FILETYPE_TO_ADD,
	payload: filetype
});

export function deleteFiletype(filetype: string) {
	
} 