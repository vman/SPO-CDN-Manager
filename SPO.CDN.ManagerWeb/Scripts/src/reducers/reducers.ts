import { combineReducers } from 'redux';
import { Action,
	FETCH_CDN_SETTINGS_REQUEST,
	FETCH_CDN_SETTINGS_SUCCESS,
	FETCH_CDN_SETTINGS_ERROR } from '../actions/actionCreators';
import { Office365CDNManagerState } from '../types';

export const initialState: Office365CDNManagerState = {
	SPOSiteUrl: '',
	isLoading: true,
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
		messageBarErrorText: ''
	}
};

const cdnSettingsReducer = (state: Office365CDNManagerState = initialState, action: Action):
Office365CDNManagerState => {
	switch (action.type) {
		case FETCH_CDN_SETTINGS_REQUEST:
			return {
				...state, isLoading: true
			};
		case FETCH_CDN_SETTINGS_SUCCESS:
			return {
				...state,
				isLoading: false,
				Origins: action.payload.Origins
			};
		case FETCH_CDN_SETTINGS_ERROR:
			return {
				...state,
				isLoading: false
			};
		default: return state;
	}
};

const rootReducer = combineReducers({
  cdnSettingsReducer
});

export default rootReducer;
