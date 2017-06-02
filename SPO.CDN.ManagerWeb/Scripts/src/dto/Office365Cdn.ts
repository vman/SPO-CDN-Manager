export enum CdnType {
    Public,
    Private
}

export interface IOffice365Cdn {
    Type?: CdnType;
    Enabled?: boolean;
    SPOSiteUrl?: string;
    Origins?: string[];
    FileTypes?: string[];
}

export class Office365Cdn implements IOffice365Cdn {
    Type?: CdnType;
    Enabled?: boolean;
    SPOSiteUrl?: string;
    Origins?: string[];
    FileTypes?: string[];
}