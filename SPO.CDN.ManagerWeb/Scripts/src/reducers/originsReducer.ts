import { Action, ActionTypes } from '../actions/actionTypes';
import { OriginsState } from '../types';

const initialState: OriginsState = {
	items: [],
	showPanel: false,
	originToAdd: '',
	originToDelete: '',
	showCreateDefaultOriginsDialog: false,
	showDeleteOriginsDialog: false,
	requestResult: '',
	isRequestSuccess: false,
	ErrorMessage: ''
};

export const originsReducer = (state: OriginsState = initialState, action: Action): OriginsState => {
	switch (action.type) {
		case ActionTypes.FETCH_ORIGINS_REQUEST:
			return state;
		case ActionTypes.FETCH_ORIGINS_SUCCESS:
			return {
				...state,
				items: action.payload
			};
		case ActionTypes.FETCH_ORIGINS_ERROR:
			return {
				...state,
				ErrorMessage: action.payload
			};
		default: return state;
	}
};
