import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { DialogContainer } from './DialogContainer';
import { PanelContainer } from './PanelContainer';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export interface IOriginsContainerProps {
	Origins: string[];
	handleStateUpdate: (newSate: any) => void;
}

export interface IOriginsContainerState {
	showAddNewOriginPanel: boolean;
	newOrigin: string;
	originToDelete: string;
	showCreateDefaultOriginsDialog: boolean;
	showDeleteOriginsDialog: boolean;
	isRequestSuccess: boolean;
	requestResult: string;
	messageBarErrorText: string;
}

export class OriginsContainer extends React.Component<IOriginsContainerProps, IOriginsContainerState> {
	constructor(props: IOriginsContainerProps) {
		super(props);
		this.state = {
			showAddNewOriginPanel: false,
			newOrigin: '',
			originToDelete: '',
			showCreateDefaultOriginsDialog: false,
			showDeleteOriginsDialog: false,
			requestResult: '',
			isRequestSuccess: false,
			messageBarErrorText: ''
		};
	}
	public render() {

		const _items: any = [];

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
							<PrimaryButton
								className='Origins-AddNewOrigins'
								text='Add New Origin'
								onClick={() => this.setState({showAddNewOriginPanel: true})} />
							<PrimaryButton
								text='Create Default Origins'
								onClick={() => this.setState({ showCreateDefaultOriginsDialog: true })} />
							{this.state.messageBarErrorText !== '' &&
								<MessageBar messageBarType={MessageBarType.error}>{this.state.messageBarErrorText}</MessageBar>
							}
						</div>
					</div>
				</div>
				<div className='ms-Grid-row'>
					<div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12 details-list-container'>
						<DetailsList
							items={_items}
							columns={[
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
							]}
							onRenderItemColumn={this._renderItemColumn.bind(this)}
							selectionMode={SelectionMode.none}
							layoutMode={DetailsListLayoutMode.justified}
							isHeaderVisible={false}
						/>
					</div>
				</div>
			</div>

			<PanelContainer
				showPanel={this.state.showAddNewOriginPanel}
				handleSubmitClicked={this._handleAddNewOrigin.bind(this)}
				handleCancelClicked={() => this.setState({ showAddNewOriginPanel: false })}
				handleTextFieldChanged={this._ontxtAddOriginChanged.bind(this)}
				panelHeader='Add New CDN Origin'
				panelSubText={`Add the relative url of a SharePoint folder to be set as CDN Origin.
								Wildcards beginning with */ are also supported.`}
				textFieldLabel='Relative Url of Folder'
				textFieldPlaceHolder='/sites/intranet/publishingimages'
				messagebarInfoText='It can take up to 15 minutes for the CDN origin to be available for publishing assets'
				isRequestSuccess={this.state.isRequestSuccess}
				messagebarResultText={this.state.requestResult} />

			<DialogContainer
				showDialog={this.state.showCreateDefaultOriginsDialog}
				submitClicked={this._handleCreateDefaultOrigins.bind(this)}
				cancelClicked={() => this.setState({ showCreateDefaultOriginsDialog: false })}
				dialogTitle='Create default CDN Origins?'
				dialogSubText='Are you sure you want to create the default CDN origins?' />

			<DialogContainer
				showDialog={this.state.showDeleteOriginsDialog}
				submitClicked={this._handleDeleteOrigin.bind(this)}
				cancelClicked={() => this.setState({ showDeleteOriginsDialog: false })}
				dialogTitle='Delete a CDN Origin?'
				dialogSubText='Are you sure you want to delete the CDN origin?'
				content={this.state.originToDelete} />
		</div>;
	}

	private _renderItemColumn(item: any, index: any, column: any) {
		const fieldContent = item[column.fieldName];

		if (column.key === 'column1') {

			const strOrgin: string = item.origin;

			if (strOrgin.indexOf('configuration pending') !== -1) {
				return <IconButton iconProps={{ iconName: 'CloudUpload' }} />;
			}
			else {
				return <IconButton
					iconProps={{ iconName: 'Delete' }}
					onClick={() => this.setState({
						showDeleteOriginsDialog: true,
						originToDelete: item.origin
					})} />;
			}

		}
		else {
			return <Label>{fieldContent}</Label>;
		}
	}

	private async _handleCreateDefaultOrigins() {

		this.setState({
			showCreateDefaultOriginsDialog: false
		});

		const response = await fetch(`/Home/CreateDefaultOrigins`, {
			credentials: 'same-origin',
			method: 'POST'
		});

		if (!response.ok) {
			const responseText = await response.text();
			this.setState({
				messageBarErrorText: responseText
			});
			throw new Error(responseText);
		}

		const _origins: string[] = await response.json();

		this.props.handleStateUpdate({
			Origins: _origins
		});
	}

	private async _handleDeleteOrigin() {

		this.setState({
			showDeleteOriginsDialog: false
		});

		const response = await fetch(`/Home/RemoveOrigin?originURL=${this.state.originToDelete}`, {
			credentials: 'same-origin',
			method: 'POST'
		});

		if (!response.ok) {
			const responseText = await response.text();
			this.setState({ requestResult: responseText });
			throw new Error(responseText);
		}

		const _origins: string[] = await response.json();

		this.props.handleStateUpdate({
			Origins: _origins
		});
	}

	private async _handleAddNewOrigin() {

		const response = await fetch(`/Home/AddOrigin?folderUrl=${this.state.newOrigin}`, {
			credentials: 'same-origin',
			method: 'POST'
		});

		if (!response.ok) {
			const responseText = await response.text();
			this.setState({
				requestResult: responseText,
				isRequestSuccess: false
			});

			throw new Error(responseText);
		}

		const _origins: string[] = await response.json();

		this.props.handleStateUpdate({
			Origins: _origins
		});

		this.setState({
			isRequestSuccess: true,
			requestResult: 'Done'
		});
	}

	private _ontxtAddOriginChanged(value: string): void {
		return this.setState({
			newOrigin: value
		});
	}

}
