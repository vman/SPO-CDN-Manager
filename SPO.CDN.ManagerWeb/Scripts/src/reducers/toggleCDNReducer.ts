import { Action, ActionTypes } from '../actions/actionTypes';
import { ToggleCDNState } from '../types';

const initialState: ToggleCDNState = {
	Enabled: false,
	showDialog: false
};

export const toggleCDNReducer = (state: ToggleCDNState = initialState, action: Action): ToggleCDNState => {
	switch (action.type) {
		case ActionTypes.TOGGLE_CDN_CONFIRM:
			return {
				...state,
				showDialog: true
			};
		case ActionTypes.TOGGLE_CDN_CONFIRM_NO:
			return {
				...state,
				showDialog: false
			};
		case ActionTypes.TOGGLE_CDN_REQUEST:
			return {
				...state,
				showDialog: false,
				Enabled: !state.Enabled
			};
		case ActionTypes.TOGGLE_CDN_SUCCESS:
			return {
				...state,
				Enabled: action.payload
			};
		case ActionTypes.TOGGLE_CDN_ERROR:
			return {
				...state,
				Enabled: !state.Enabled
			};
		default: return state;
	}
};
