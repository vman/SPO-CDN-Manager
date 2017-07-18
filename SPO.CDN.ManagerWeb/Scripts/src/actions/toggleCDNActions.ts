import { ActionTypes, Action } from './actionTypes';
import { fetchCDNSettings, requestCDNSettingsError } from '../actions/settingActions';
import * as api from '../api';

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

        try {
            const result: boolean = await api.post(`/Home/SetCDN?value=${toggle}`);
            dispatch(toggleCDNSuccess(result));
            dispatch(fetchCDNSettings());
        } catch (error) {

            dispatch(toggleCDNError());
            dispatch(requestCDNSettingsError(error));
        }
    };
};
