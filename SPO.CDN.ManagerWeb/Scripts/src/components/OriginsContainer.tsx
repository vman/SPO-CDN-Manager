import * as React from 'react';

import { List } from 'office-ui-fabric-react/lib/List';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IOriginsContainerProps {
    Origins: string[];
    handleCreateDefaultOrigins: () => void
}

export interface IOriginsContainerState {
    showPanel: boolean;
}

export class OriginsContainer extends React.Component<IOriginsContainerProps, IOriginsContainerState> {
    constructor(props: IOriginsContainerProps) {
        super(props);
        this.state = {
            showPanel: false
        };
    }

    public render() {
        return <div className='o365Manager-OriginsContainer'>

            <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
                        <PrimaryButton text='Add New Origin' onClick={this._showPanel.bind(this)} />
                        <PrimaryButton text='Create Default Origins' onClick={this.props.handleCreateDefaultOrigins.bind(this)} />
                    </div>
                </div>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
                        <ul>
                            {this.props.Origins.map((origin, index) =>
                                <li key={index}>
                                    {origin}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Panel
                isOpen={this.state.showPanel}
                onDismiss={() => this.setState({ showPanel: false })}
                type={PanelType.largeFixed}
                isLightDismiss={true}
                headerText='Add New CDN Origin'>
                <Label>Add the relative url of a SharePoint folder to be set as CDN Origin. Wildcards beginning with */ are also supported.</Label>
                <TextField label='Relative Url of Folder' placeholder='/sites/intranet/publishingimages' />
                <PrimaryButton text='Add' /*onClick={this._showPanel.bind(this)}*/ />
                <MessageBar>It can take up to 15 minutes for the CDN origin to be available for publishing assets</MessageBar>
            </Panel>
        </div>
    }

    private _showPanel() {
        this.setState({
            showPanel: true
        });
    }

}