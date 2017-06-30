export type Office365CDNManagerState = Readonly<{
	SPOSiteUrl: string;
	isLoading: boolean;
	ErrorMessage: string;
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
		ErrorMessage: string;
	}>;
}>;

export interface IOffice365CDNManagerState{
	PublicCDNEnabled: boolean;
	Filetypes: string[];
	Origins: string[];
	SPOSiteUrl: string;
}

export type Office365CDNManagerStore = {
	CDNSettings: Office365CDNManagerState;
	Origins: Office365CDNManagerState;
};
