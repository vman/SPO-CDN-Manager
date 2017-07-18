import { ActionTypes, Action } from './actionTypes';
import * as api from '../api';

//Action Creators to create and return Actions
export const requestFiletypes = (): Action => ({
    type: ActionTypes.FETCH_FILETYPES_REQUEST
});

export const updateFiletypesRequest = (): Action => ({
    type: ActionTypes.UPDATE_FILETYPES_REQUEST
});

export const updateFiletypesSuccess = (filetypes: string[]): Action => ({
    type: ActionTypes.UPDATE_FILETYPES_SUCCESS,
    payload: filetypes
});

export const updateFiletypesError = (error: Error): Action => ({
    type: ActionTypes.UPDATE_FILETYPES_ERROR,
    payload: error.message
});

export const requestFiletypesSuccess = (filetypes: string[]): Action => ({
    type: ActionTypes.FETCH_FILETYPES_SUCCESS,
    payload: filetypes
});

export const requestFiletypesError = (error: Error): Action => ({
    type: ActionTypes.FETCH_FILETYPES_ERROR,
    payload: error.message
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

export const toggleAddFiletypePanel = (toggle: boolean): Action => ({
    type: ActionTypes.TOGGLE_ADD_FILETYPE_PANEL,
    payload: toggle
});

export function updateFiletypes(_filetypes: string[]) {
    return async (dispatch: any) => {

        dispatch(updateFiletypesRequest());

        try {
            const result: string[] = await api.post(`/Home/SetFiletypes`, JSON.stringify({ filetypes: _filetypes }));
            dispatch(updateFiletypesSuccess(result));
        } catch (error) {
            dispatch(updateFiletypesError(error));
        }
    };
}
