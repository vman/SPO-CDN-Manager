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
        case ActionTypes.TOGGLE_DELETE_FILETYPE_DIALOG:
            return {
                ...state,
                showDialog: action.payload
            };
        case ActionTypes.TOGGLE_ADD_FILETYPE_PANEL:
            return {
                ...state,
                showPanel: action.payload,
                requestResult: ''
            };
        case ActionTypes.SET_FILETYPE_TO_ADD:
            return {
                ...state,
                fileTypeToAdd: action.payload
            };
        case ActionTypes.SET_FILETYPE_TO_DELETE:
            return {
                ...state,
                fileTypeToDelete: action.payload
            };
        case ActionTypes.UPDATE_FILETYPES_REQUEST:
            return {
                ...state,
                showDialog: false
            };
        case ActionTypes.UPDATE_FILETYPES_SUCCESS:
            return {
                ...state,
                items: action.payload,
                isRequestSuccess: true,
                requestResult: 'Done'
            };
        case ActionTypes.UPDATE_FILETYPES_ERROR:
            return {
                ...state,
                isRequestSuccess: false,
                requestResult: action.payload
            };
        default: return state;
    }
};
