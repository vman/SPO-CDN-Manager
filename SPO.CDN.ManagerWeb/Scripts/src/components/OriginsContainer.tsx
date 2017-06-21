import * as React from 'react';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';

import {
    DetailsList,
    DetailsListLayoutMode, SelectionMode
} from 'office-ui-fabric-react/lib/DetailsList';

let _columns = [
    {
        key: 'column1',
        name: '',
        fieldName: 'delete',
        minWidth: 50
    },
    {
        key: 'column2',
        name: 'Origins',
        fieldName: 'origin',
        minWidth: 700
    }
];

export interface IOriginsContainerProps {
    Origins: string[];
    handleCreateDefaultOrigins: () => void
    handleAddNewOrigin: (origin: string) => void
    handleDeleteOrigin: (origin: string) => void
}

export interface IOriginsContainerState {
    showPanel: boolean;
    newOrigin: string;
}

export class OriginsContainer extends React.Component<IOriginsContainerProps, IOriginsContainerState> {
    constructor(props: IOriginsContainerProps) {
        super(props);
        this.state = {
            showPanel: false,
            newOrigin: ''
        };
    }

    public render() {
        let _items: any = [];
        this.props.Origins.map((_origin, index) =>
            _items.push({
                key: index,
                delete: '',
                origin: _origin
            })
        );

        return <div className='o365Manager-OriginsContainer'>
            <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
                        <div className='Origins-Button-Container'>
                            <PrimaryButton className='Origins-AddNewOrigins' text='Add New Origin' onClick={this._showPanel.bind(this)} />
                            <PrimaryButton text='Create Default Origins' onClick={this.props.handleCreateDefaultOrigins.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12 details-list-container'>
                        <DetailsList
                            items={_items}
                            columns={_columns}
                            onRenderItemColumn={this._renderItemColumn.bind(this)}
                            selectionMode={SelectionMode.none}
                            layoutMode={DetailsListLayoutMode.justified}
                            isHeaderVisible={true}
                        />
                    </div>
                </div>
            </div>
            <Panel
                isOpen={this.state.showPanel}
                onDismiss={() => this.setState({ showPanel: false })}
                type={PanelType.medium}
                isLightDismiss={true}
                headerText='Add New CDN Origin'>
                <Label>Add the relative url of a SharePoint folder to be set as CDN Origin. Wildcards beginning with */ are also supported.</Label>
                <TextField label='Relative Url of Folder' placeholder='/sites/intranet/publishingimages' onChanged={this._ontxtAddOriginChanged.bind(this)} />
                <PrimaryButton text='Add' onClick={this._handleAddNewOrigin.bind(this)} />
                <MessageBar>It can take up to 15 minutes for the CDN origin to be available for publishing assets</MessageBar>
            </Panel>
        </div>
    }

    private _renderItemColumn(item: any, index: any, column: any) {
        const fieldContent = item[column.fieldName];
        index;

        if (column.key === 'column1') {
            return <IconButton iconProps={{ iconName: 'Delete' }} onClick={this._handleDeleteOrigin.bind(this, item)} />
        }
        else {
            return <Label>{fieldContent}</Label>;
        }
    }

    private _handleDeleteOrigin(item: any) {
        
        this.props.handleDeleteOrigin(item.origin)
    }

    private _handleAddNewOrigin() {
        this.props.handleAddNewOrigin(this.state.newOrigin);
    }

    private _ontxtAddOriginChanged(value: string): void {
        return this.setState({
            newOrigin: value
        });
    }
    private _showPanel() {
        this.setState({
            showPanel: true
        });
    }

}