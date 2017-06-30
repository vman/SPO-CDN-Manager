import { combineReducers } from 'redux';
import { Action, ActionTypes } from '../actions/actionTypes';
import { Office365CDNManagerState, Office365CDNManagerStore } from '../types';

export const initialState: Office365CDNManagerState = {
	SPOSiteUrl: '',
	isLoading: true,
	ErrorMessage: '',
	PublicCDN: {
		Enabled: false,
		showDialog: false
	},
	Filetypes: {
		items: [],
		showPanel: false,
		showDialog: false,
		fileTypeToDelete: '',
		fileTypeToAdd: '',
		requestResult: '',
		isRequestSuccess: false
	},
	Origins: {
		items: [],
		showPanel: false,
		originToAdd: '',
		originToDelete: '',
		showCreateDefaultOriginsDialog: false,
		showDeleteOriginsDialog: false,
		requestResult: '',
		isRequestSuccess: false,
		ErrorMessage: ''
	},

};

const cdnSettingsReducer = (state: Office365CDNManagerState = initialState, action: Action):
	Office365CDNManagerState => {
	switch (action.type) {
		case ActionTypes.FETCH_CDN_SETTINGS_REQUEST:
			return {
				...state, isLoading: true
			};
		case ActionTypes.FETCH_CDN_SETTINGS_SUCCESS:
			return {
				...state,
				isLoading: false,
				SPOSiteUrl: action.payload.SPOSiteUrl,
				Origins: {
					...state.Origins,
					items: action.payload.Origins
				},
				Filetypes: {
					...state.Filetypes,
					items: action.payload.Filetypes
				},
				PublicCDN: {
					...state.PublicCDN,
					Enabled: action.payload.PublicCDNEnabled
				}
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

const originsReducer = (state: Office365CDNManagerState = initialState, action: Action):
	Office365CDNManagerState => {
	switch (action.type) {
		case ActionTypes.FETCH_CDN_SETTINGS_REQUEST:
			return {
				...state, isLoading: true
			};
		case ActionTypes.FETCH_CDN_SETTINGS_SUCCESS:
			return {
				...state
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

const rootReducer = combineReducers<Office365CDNManagerStore>({
	CDNSettings: cdnSettingsReducer,
	Origins: originsReducer
});

export default rootReducer;
