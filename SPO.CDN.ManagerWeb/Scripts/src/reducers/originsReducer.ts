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
		case ActionTypes.TOGGLE_DEFAULT_ORIGIN_DIALOG:
			return {
				...state,
				showCreateDefaultOriginsDialog: action.payload
			};
		case ActionTypes.CREATE_DEFAULT_ORIGIN_REQUEST:
			return {
				...state,
				showCreateDefaultOriginsDialog: false
			};
		case ActionTypes.TOGGLE_DELETE_ORIGIN_DIALOG:
			return {
				...state,
				showDeleteOriginsDialog: action.payload
			};
		case ActionTypes.SET_ORIGIN_TO_DELETE:
			return {
				...state,
				originToDelete: action.payload
			};
		case ActionTypes.DELETE_ORIGIN_REQUEST:
			return {
				...state,
				showDeleteOriginsDialog: false
			};
		default: return state;
	}
};
