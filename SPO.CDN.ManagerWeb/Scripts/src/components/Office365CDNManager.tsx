import * as React from 'react';
import { Header } from './Header';
import { OriginsContainer } from './OriginsContainer';
import { FileTypesContainer } from './FileTypesContainer';
import { ToggleCDNContainer } from './ToggleCDNContainer';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import './O365CDNManager.module.scss';

interface IOffice365CDNManagerState {
    PublicCDNEnabled: boolean;
    Filetypes: string[];
    Origins: string[];
    SPOSiteUrl: string;
    showSpinner?: boolean;
    errorMessage: string;
    successMessage: string;
}

interface IOffice365CDNManagerProps {
}

export class Office365CDNManager extends React.Component<IOffice365CDNManagerProps, IOffice365CDNManagerState> {

    constructor(props: IOffice365CDNManagerProps) {
        super(props);
        this.state = {
            PublicCDNEnabled: false,
            Filetypes: [],
            Origins: [],
            SPOSiteUrl: '',
            showSpinner: true,
            errorMessage: '',
            successMessage: ''
        };
    }

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
                                <PivotItem linkText='Origins' itemIcon='Globe'>
                                    <OriginsContainer
                                            Origins={this.state.Origins}
                                            errorMessage={this.state.errorMessage}
                                            successMessage={this.state.successMessage}                                       
                                            handleCreateDefaultOrigins={this._createDefaultOrigins.bind(this)}
                                            handleAddNewOrigin={this._addNewOrigin.bind(this)}
                                            handleDeleteOrigin={this._deleteOrigin.bind(this)} />
                                    {this.state.showSpinner &&
                                        <Spinner size={ SpinnerSize.large } />
                                    }
                                </PivotItem>
                                <PivotItem linkText='Filetypes' itemIcon='OpenFile'>
                                    <FileTypesContainer FileTypes={this.state.Filetypes} />
                                </PivotItem>
                                <PivotItem linkText='Turn CDN On/Off' itemIcon='Settings' >
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

    componentDidMount() {
        this._getCDNSettings();
    }

    private async _deleteOrigin(origin: string) {

        const response = await fetch(`/Home/RemoveOrigin?originURL=${origin}`, {
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

    private async _addNewOrigin(origin: string) {

        const response = await fetch(`/Home/AddOrigin?folderUrl=${origin}`, {
            credentials: 'same-origin',
            method: 'POST'
        });

        if (!response.ok) {
            const responseText = await response.text();
            this.setState({ errorMessage: responseText});
            throw new Error(responseText);
        };

        const _origins: string[] = await response.json();

        this.setState({ Origins: _origins, successMessage:'Done' });

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

        const response = await fetch('/Home/GetCDNSettings', { 
            credentials: 'same-origin'
         });

        const o365Cdn: IOffice365CDNManagerState = await response.json();

        this.setState(o365Cdn);
        this.setState({
            showSpinner:false
        })
    }
}