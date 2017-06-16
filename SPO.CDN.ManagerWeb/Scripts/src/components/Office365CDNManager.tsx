import * as React from "react";
import { Header } from './Header';
import { OriginsContainer } from './OriginsContainer';
import { FileTypesContainer } from './FileTypesContainer';
import { ToggleCDNContainer } from './ToggleCDNContainer';

interface IOffice365CDNManagerState {
    PublicCDNEnabled: boolean;
    Filetypes: string[];
    Origins: string[];
    SPOSiteUrl: string;
}

interface IOffice365CDNManagerProps {
}

export class Office365CDNManager extends React.Component<IOffice365CDNManagerProps, IOffice365CDNManagerState> {

    public render() {
        return <div className="o365Manager-Container">
            <Header SPOSiteUrl={this.state.SPOSiteUrl} />
            <OriginsContainer Origins={this.state.Origins} />
            <FileTypesContainer FileTypes={this.state.Filetypes} />
            <ToggleCDNContainer Enabled={this.state.PublicCDNEnabled} />
        </div>;
    }
    
    constructor(props: IOffice365CDNManagerProps) {
        super(props);
        this.state = {
            PublicCDNEnabled: false,
            Filetypes: [],
            Origins: [],
            SPOSiteUrl: ""
        };
    }

    componentDidMount() {
        this._getCDNSettings();
    }


    private async _getCDNSettings() {

        //const response = await fetch("/Home/GetCDNSettings", { credentials: 'include' });

        //const o365Cdn: IOffice365CDNManagerState = await response.json();

        const o365Cdn: IOffice365CDNManagerState = {
            "PublicCDNEnabled": true,
            "Filetypes": ["CSS", "EOT", "GIF", "ICO", "JPEG", "JPG", "JS", "MAP", "PNG", "SVG", "TTF", "WOFF"],
            "Origins": ["*/MASTERPAGE (configuration pending)",
                "*/STYLE LIBRARY (configuration pending)"
            ],
            "SPOSiteUrl": "https://dummy.sharepoint.com"
        };

        setTimeout(() => {
            this.setState(o365Cdn);
        }, 1000);


    }
}