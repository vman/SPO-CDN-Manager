import { Action, ActionTypes } from '../actions/actionTypes';
import { ToggleCDNState } from '../types';

const initialState: ToggleCDNState = {
	Enabled: false,
	showDialog: false
};

export const toggleCDNReducer = (state: ToggleCDNState = initialState, action: Action): ToggleCDNState => {
	switch (action.type) {
		case ActionTypes.TOGGLE_CDN_REQUEST:
			return state;
		case ActionTypes.TOGGLE_CDN_SUCCESS:
			return {
				...state,
				Enabled: action.payload
			};
		case ActionTypes.TOGGLE_CDN_SUCCESS:
			return state;
		default: return state;
	}
};
