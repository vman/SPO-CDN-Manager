import { Office365CDNManagerState } from '../types';

export enum ActionTypes {
	FETCH_CDN_SETTINGS_REQUEST = 'FETCH_CDN_SETTINGS_REQUEST',
	FETCH_CDN_SETTINGS_SUCCESS = 'FETCH_CDN_SETTINGS_SUCCESS',
	FETCH_CDN_SETTINGS_ERROR = 'FETCH_CDN_SETTINGS_ERROR'
}

export type Action =
	{ type: ActionTypes.FETCH_CDN_SETTINGS_REQUEST } |
	{ type: ActionTypes.FETCH_CDN_SETTINGS_SUCCESS, payload: Office365CDNManagerState } |
	{ type: ActionTypes.FETCH_CDN_SETTINGS_ERROR, payload: string };
