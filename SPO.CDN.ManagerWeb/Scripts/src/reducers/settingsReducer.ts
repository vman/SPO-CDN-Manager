import { Action, ActionTypes } from '../actions/actionTypes';
import { SettingsState } from '../types';

const initialState: SettingsState = {
    SPOSiteUrl: '',
    isLoading: true,
    ErrorMessage: '',
};

export const settingsReducer = (state: SettingsState = initialState, action: Action): SettingsState => {
    switch (action.type) {
        case ActionTypes.FETCH_CDN_SETTINGS_REQUEST:
            return {
                ...state, isLoading: true
            };
        case ActionTypes.FETCH_CDN_SETTINGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                SPOSiteUrl: action.payload
            };
        case ActionTypes.FETCH_CDN_SETTINGS_ERROR:
            return {
                ...state,
                isLoading: false,
                ErrorMessage: action.payload
            };
        default: return state;
    }
};
