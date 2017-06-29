export type Office365CDNManagerState = {
	SPOSiteUrl: string;
	isLoading: boolean;
	ErrorMessage: string;
	PublicCDN: {
		Enabled: boolean;
		showDialog: boolean;
	};
	Filetypes: {
		items: string[],
		showPanel: boolean;
		showDialog: boolean;
		fileTypeToAdd: string;
		fileTypeToDelete: string;
		isRequestSuccess: boolean;
		requestResult: string;
	};
	Origins: {
		items: string[],
		showPanel: boolean;
		originToAdd: string;
		originToDelete: string;
		showCreateDefaultOriginsDialog: boolean;
		showDeleteOriginsDialog: boolean;
		isRequestSuccess: boolean;
		requestResult: string;
		ErrorMessage: string;
	};
};
