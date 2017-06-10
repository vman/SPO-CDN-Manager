import * as React from "react";
import * as jQuery from "jquery";
import { IOffice365Cdn } from "../dto/Office365Cdn";
import {
    Spinner,
    SpinnerSize,
    Label,
    Pivot,
    PivotItem,
    PivotLinkSize,
    Toggle
} from 'office-ui-fabric-react';

export interface IOffice365CDNManagerState {
    CDNEnabled?: boolean;
    Filetypes?: string[];
    Origins?: string[];
    SPOSiteUrl?: string;
}

// State is never set so we use the 'undefined' type.
export class Office365CDNManager extends React.Component<IOffice365Cdn, IOffice365CDNManagerState> {

    public render() {
        return <div className="o365Manager-Container">
            <Label>Manage Office 365 Public CDN Settings for {this.state.SPOSiteUrl}</Label>
            <Spinner size={SpinnerSize.large} />
            <Pivot linkSize={PivotLinkSize.large}>
                <PivotItem linkText='Origins'>

                </PivotItem>
                <PivotItem linkText='Filetypes'>

                </PivotItem>
                <PivotItem linkText='Turn CDN On/Off'>
                    <Toggle
                        defaultChecked={false}
                        label='Use Office 365 Public CDN'
                        onText='On'
                        offText='Off' />
                </PivotItem>
            </Pivot>
        </div>;
    }
    constructor() {
        super();

        this.state = {
        };
    }
    componentDidMount() {
        this._getCDNSettings();
    }

    private async _getCDNSettings() {

        // jQuery.ajax("/Home/GetCDNSettings")
        // 	.then(function (data: any) {

        // 		console.log(data);

        // 	}, function () {
        // 		console.log(arguments);
        // 	});

        const response = await fetch("/Home/GetCDNSettings", { credentials: 'include' });

        const o365Cdn: IOffice365Cdn = await response.json();

        this.setState({
            CDNEnabled: o365Cdn.Enabled,
            Filetypes: o365Cdn.FileTypes,
            Origins: o365Cdn.Origins,
            SPOSiteUrl: o365Cdn.SPOSiteUrl
        });

    }
}