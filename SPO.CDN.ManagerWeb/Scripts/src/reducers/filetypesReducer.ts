import { Action, ActionTypes } from '../actions/actionTypes';
import { FiletypesState } from '../types';

const initialState: FiletypesState = {
	items: [],
	showPanel: false,
	showDialog: false,
	fileTypeToDelete: '',
	fileTypeToAdd: '',
	requestResult: '',
	isRequestSuccess: false
};

export const fileTypesReducer = (state: FiletypesState = initialState, action: Action): FiletypesState => {
	switch (action.type) {
		case ActionTypes.FETCH_FILETYPES_REQUEST:
			return state;
		case ActionTypes.FETCH_FILETYPES_SUCCESS:
			return {
				...state,
				items: action.payload
			};
		case ActionTypes.FETCH_CDN_SETTINGS_ERROR:
			return {
				...state,
				isRequestSuccess: false,
				requestResult: action.payload
			};
		default: return state;
	}
};
