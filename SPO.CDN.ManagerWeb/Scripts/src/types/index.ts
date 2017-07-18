export interface IOffice365CDNManagerDTO {
    PublicCDNEnabled: boolean;
    Filetypes: string[];
    Origins: string[];
    SPOSiteUrl: string;
}

export type ToggleCDNState = Readonly<{
    Enabled: boolean;
    showDialog: boolean;
}>;

export type FiletypesState = Readonly<{
    items: string[],
    showPanel: boolean;
    showDialog: boolean;
    fileTypeToAdd: string;
    fileTypeToDelete: string;
    isRequestSuccess: boolean;
    requestResult: string;
}>;

export type OriginsState = Readonly<{
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

export type SettingsState = Readonly<{
    SPOSiteUrl: string;
    isLoading: boolean;
    ErrorMessage: string;
}>;

export type Office365CDNManagerState = Readonly<{
    Settings: SettingsState;
    Origins: OriginsState;
    Filetypes: FiletypesState;
    ToggleCDN: ToggleCDNState;
}>;
