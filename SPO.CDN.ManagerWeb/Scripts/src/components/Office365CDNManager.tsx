import * as React from "react";
import { Header } from './Header';
import { OriginsContainer } from './OriginsContainer';
import { FileTypesContainer } from './FileTypesContainer';
import { ToggleCDNContainer } from './ToggleCDNContainer';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';

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
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12">
                        <Header SPOSiteUrl={this.state.SPOSiteUrl} />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12">
                        <Pivot linkSize={PivotLinkSize.large}>
                            <PivotItem linkText='Origins'>
                                <OriginsContainer Origins={this.state.Origins} />
                            </PivotItem>
                            <PivotItem linkText='Filetypes'>
                                <FileTypesContainer FileTypes={this.state.Filetypes} />
                            </PivotItem>
                            <PivotItem linkText='Turn CDN On/Off'>
                                <ToggleCDNContainer Enabled={this.state.PublicCDNEnabled} onChanged={this.toggleCDN} />
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>
            </div>
        </div>
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

    private toggleCDN = (isChecked: boolean) => {
        this.setState({ PublicCDNEnabled: isChecked });
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