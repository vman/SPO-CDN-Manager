import * as React from "react";
import * as jQuery from "jquery"; //remove this ultimately

import {
    Spinner,
    SpinnerSize,
    Label,
    Pivot,
    PivotItem,
    PivotLinkSize,
    Toggle,
    DetailsList,
    DetailsListLayoutMode
} from 'office-ui-fabric-react';

export interface IOffice365CDNManagerState {
    Enabled?: boolean;
    FileTypes?: string[];
    Origins?: string[];
    SPOSiteUrl?: string;
}

export enum CdnType {
    Public,
    Private
}

//export interface IOffice365CDNManagerProps { 
//    SPOSiteUrl?: string;
//    Origins?: string[];
//    FileTypes?: string[];
//}

//export class Office365Cdn implements IOffice365Cdn {
//    Type?: CdnType;
//    Enabled?: boolean;
//    SPOSiteUrl?: string;
//    Origins?: string[];
//    FileTypes?: string[];
//}

let _columns = [
    {
        key: 'column1',
        name: 'delete',
        fieldName: 'delete',
        minWidth: 100,
        maxWidth: 200,
        isResizable: false
    },
    {
        key: 'column2',
        name: 'origin',
        fieldName: 'origin',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
];

let _items: any[];

// State is never set so we use the 'undefined' type.
export class Office365CDNManager extends React.Component<null, IOffice365CDNManagerState> {


    public render() {
        return <div className="o365Manager-Container">
            <Label>Manage Office 365 Public CDN Settings for {this.state.SPOSiteUrl}</Label>
            <Spinner size={SpinnerSize.large} />
            <Pivot linkSize={PivotLinkSize.large}>
                <PivotItem linkText='Origins'>
                    <DetailsList
                        items={this.state.Origins}
                        columns={_columns}
                        setKey='set'
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                    />
                </PivotItem>
                <PivotItem linkText='Filetypes'>

                </PivotItem>
                <PivotItem linkText='Turn CDN On/Off'>
                    <Toggle
                        defaultChecked={this.state.Enabled}
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

        const o365Cdn: IOffice365CDNManagerState = await response.json();

        //no orgins are selected in the current tenant so .length is throwing an error
        for (let i = 0; i < o365Cdn.Origins.length; i++) {
            _items.push({
                key: i,
                name: o365Cdn.Origins[i],
                value: i
            });
        }

        this.setState({
            Enabled: o365Cdn.Enabled,
            FileTypes: o365Cdn.FileTypes,
            Origins: o365Cdn.Origins,
            SPOSiteUrl: o365Cdn.SPOSiteUrl
        });

    }
}