import { settingsReducer } from './settingsReducer';
import { originsReducer } from './originsReducer';
import { fileTypesReducer } from './filetypesReducer';
import { toggleCDNReducer } from './toggleCDNReducer';
import { Office365CDNManagerState } from '../types';
import { combineReducers, Reducer } from 'redux';

const rootReducer: Reducer<Office365CDNManagerState> = combineReducers<Office365CDNManagerState>({
	Settings: settingsReducer,
	Origins: originsReducer,
	Filetypes: fileTypesReducer,
	ToggleCDN: toggleCDNReducer
});

export default rootReducer;
