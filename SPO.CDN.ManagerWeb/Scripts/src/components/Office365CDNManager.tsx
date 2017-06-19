import * as React from 'react';
import { Header } from './Header';
import { OriginsContainer } from './OriginsContainer';
import { FileTypesContainer } from './FileTypesContainer';
import { ToggleCDNContainer } from './ToggleCDNContainer';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import './O365CDNManager.module.scss';

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
        return <Fabric>
            <div className='o365Manager-Container'>
                <div className='ms-Grid'>
                    <div className='ms-Grid-row'>
                        <div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
                            <Header SPOSiteUrl={this.state.SPOSiteUrl} />
                        </div>
                    </div>
                    <div className='ms-Grid-row'>
                        <div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
                            <Pivot linkSize={PivotLinkSize.large}>
                                <PivotItem linkText='Origins'>
                                    <OriginsContainer
                                        Origins={this.state.Origins}
                                        handleCreateDefaultOrigins={this._createDefaultOrigins.bind(this)}
                                        handleAddNewOrigin={this._addNewOrigin.bind(this)} />
                                </PivotItem>
                                <PivotItem linkText='Filetypes'>
                                    <FileTypesContainer FileTypes={this.state.Filetypes} />
                                </PivotItem>
                                <PivotItem linkText='Turn CDN On/Off'>
                                    <ToggleCDNContainer
                                        Enabled={this.state.PublicCDNEnabled}
                                        toggleCDN={this._toggleCDN.bind(this)} />
                                </PivotItem>
                            </Pivot>
                        </div>
                    </div>
                </div>
            </div>
        </Fabric>
    }

    constructor(props: IOffice365CDNManagerProps) {
        super(props);
        this.state = {
            PublicCDNEnabled: false,
            Filetypes: [],
            Origins: [],
            SPOSiteUrl: ''
        };
    }

    componentDidMount() {
        this._getCDNSettings();
    }

    private async _addNewOrigin(origin: string) {

        const response = await fetch(`/Home/AddOrigin?folderUrl=${origin}`, {
            credentials: 'same-origin',
            method: 'POST'
        });

        if (!response.ok) {
            const responseText = await response.text();
            throw new Error(responseText);
        };

        const _origins: string[] = await response.json();

        this.setState({ Origins: _origins });

    }

    private async _createDefaultOrigins() {

        const response = await fetch(`/Home/CreateDefaultOrigins`, {
            credentials: 'same-origin',
            method: 'POST'
        });

        if (!response.ok) {
            const responseText = await response.text();
            throw new Error(responseText);
        };

        const _origins: string[] = await response.json();

        this.setState({ Origins: _origins });

    }

    private async _toggleCDN(isChecked: boolean) {

        try {
            this.setState({ PublicCDNEnabled: isChecked });

            const response = await fetch(`/Home/SetCDN?value=${isChecked}`, {
                credentials: 'same-origin',
                method: 'POST'
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(responseText);
            };

            const responseJSON: boolean = await response.json();

            this.setState({ PublicCDNEnabled: responseJSON });

        } catch (error) {
            this.setState({ PublicCDNEnabled: !isChecked });
            console.log(error);
        }
    }

    private async _getCDNSettings() {

        const response = await fetch('/Home/GetCDNSettings', { credentials: 'include' });

        const o365Cdn: IOffice365CDNManagerState = await response.json();

        this.setState(o365Cdn);
    }
}