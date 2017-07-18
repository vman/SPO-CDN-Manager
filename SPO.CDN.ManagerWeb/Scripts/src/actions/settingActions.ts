import { IOffice365CDNManagerDTO } from '../types';
import { ActionTypes, Action } from './actionTypes';
import { requestOriginsSuccess } from './originActions';
import { requestFiletypesSuccess } from './filetypeActions';
import { toggleCDNSuccess } from './toggleCDNActions';
import * as api from '../api';

//Action Creators to create and return Actions
const requestCDNSettings = (): Action => ({
    type: ActionTypes.FETCH_CDN_SETTINGS_REQUEST
});

const requestCDNSettingsSuccess = (spositeurl: string): Action => ({
    type: ActionTypes.FETCH_CDN_SETTINGS_SUCCESS,
    payload: spositeurl
});

export const requestCDNSettingsError = (error: string): Action => ({
    type: ActionTypes.FETCH_CDN_SETTINGS_ERROR,
    payload: error
});

export function fetchCDNSettings() {

    return async (dispatch: any) => {

        dispatch(requestCDNSettings());

        try {
            const result: IOffice365CDNManagerDTO = await api.get('/Home/GetCDNSettings');

            dispatch(requestCDNSettingsSuccess(result.SPOSiteUrl));
            dispatch(requestOriginsSuccess(result.Origins));
            dispatch(requestFiletypesSuccess(result.Filetypes));
            dispatch(toggleCDNSuccess(result.PublicCDNEnabled));

        } catch (error) {
            dispatch(requestCDNSettingsError(error));
        }
    };
}
