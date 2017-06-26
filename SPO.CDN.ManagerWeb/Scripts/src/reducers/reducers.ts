import { Action, FETCH_CDN_SETTINGS_REQUEST, FETCH_CDN_SETTINGS_SUCCESS } from '../actions/actionCreators';

export type State = Readonly<{
	SPOSiteUrl: string;
	isLoading: boolean;
	PublicCDN: Readonly<{
		Enabled: boolean;
		showDialog: boolean;
	}>;
	Filetypes: Readonly<{
		items: string[],
		showPanel: boolean;
		showDialog: boolean;
		fileTypeToAdd: string;
		fileTypeToDelete: string;
		isRequestSuccess: boolean;
		requestResult: string;
	}>;
	Origins: Readonly<{
		items: string[],
		showPanel: boolean;
		originToAdd: string;
		originToDelete: string;
		showCreateDefaultOriginsDialog: boolean;
		showDeleteOriginsDialog: boolean;
		isRequestSuccess: boolean;
		requestResult: string;
		messageBarErrorText: string;
	}>;
}>;

export const initialState: State = {
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

export default function reducer(state: State = initialState, action: Action): State {
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
		default: return state;
	}
}
