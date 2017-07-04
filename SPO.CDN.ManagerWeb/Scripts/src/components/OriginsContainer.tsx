import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { DialogContainer } from './DialogContainer';
import { PanelContainer } from './PanelContainer';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Office365CDNManagerState } from '../types';
import { Dispatch } from 'redux';
import {
	toggleDefaultOriginsDialog,
	createDefaultOrigins,
	deleteOrigin,
	toggleDeleteOriginsDialog,
	setOriginToDelete
} from '../actions/originActions';
import { connect } from 'react-redux';

export interface IOriginsContainerProps {
}

interface IConnectedDispatch {
	toggleDefaultOriginsDialog: (toggle: boolean) => void;
	toggleDeleteOriginsDialog: (toggle: boolean) => void;
	createDefaultOrigins: () => void;
	setOriginToDelete: (originUrl: string) => void;
	deleteOrigin: (originUrl: string) => void;
}

function mapStateToProps(state: Office365CDNManagerState, ownProps: IOriginsContainerProps): Office365CDNManagerState {
	return state;
}

const mapDispatchToProps = (dispatch: Dispatch<Office365CDNManagerState>): IConnectedDispatch => ({
	toggleDefaultOriginsDialog: (toggle: boolean) => {
		dispatch(toggleDefaultOriginsDialog(toggle));
	},
	toggleDeleteOriginsDialog: (toggle: boolean) => {
		dispatch(toggleDeleteOriginsDialog(toggle));
	},
	createDefaultOrigins: () => {
		dispatch(createDefaultOrigins());
	},
	setOriginToDelete: (originUrl: string) => {
		dispatch(setOriginToDelete(originUrl));
	},
	deleteOrigin: (originUrl: string) => {
		dispatch(deleteOrigin(originUrl));
	}
});

class OriginsContainer extends React.Component<IOriginsContainerProps & Office365CDNManagerState & IConnectedDispatch, {}> {
	public render() {

		const _items: any = [];

		this.props.Origins.items.map((_origin, index) =>
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
								onClick={() => this.setState({ showAddNewOriginPanel: true })} />
							<PrimaryButton
								text='Create Default Origins'
								onClick={() => this.props.toggleDefaultOriginsDialog(true)} />
							{this.props.Origins.ErrorMessage !== '' &&
								<MessageBar messageBarType={MessageBarType.error}>{this.props.Origins.ErrorMessage}</MessageBar>
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
				showPanel={this.props.Origins.showPanel}
				handleSubmitClicked={this._handleAddNewOrigin.bind(this)}
				handleCancelClicked={() => this.setState({ showAddNewOriginPanel: false })}
				handleTextFieldChanged={this._ontxtAddOriginChanged.bind(this)}
				panelHeader='Add New CDN Origin'
				panelSubText={`Add the relative url of a SharePoint folder to be set as CDN Origin.
								Wildcards beginning with */ are also supported.`}
				textFieldLabel='Relative Url of Folder'
				textFieldPlaceHolder='/sites/intranet/publishingimages'
				messagebarInfoText='It can take up to 15 minutes for the CDN origin to be available for publishing assets'
				isRequestSuccess={this.props.Origins.isRequestSuccess}
				messagebarResultText={this.props.Origins.requestResult} />

			<DialogContainer
				showDialog={this.props.Origins.showCreateDefaultOriginsDialog}
				submitClicked={() => this.props.createDefaultOrigins()}
				cancelClicked={() => this.props.toggleDefaultOriginsDialog(false)}
				dialogTitle='Create default CDN Origins?'
				dialogSubText='Are you sure you want to create the default CDN origins?' />

			<DialogContainer
				showDialog={this.props.Origins.showDeleteOriginsDialog}
				submitClicked={() => this.props.deleteOrigin(this.props.Origins.originToDelete) }
				cancelClicked={() => this.props.toggleDeleteOriginsDialog(false)}
				dialogTitle='Delete a CDN Origin?'
				dialogSubText='Are you sure you want to delete the CDN origin?'
				content={this.props.Origins.originToDelete} />
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
					iconProps={{ iconName: 'Trash' }}
					onClick={() => {
						this.props.setOriginToDelete(item.origin);
						this.props.toggleDeleteOriginsDialog(true);
					}} />;
			}

		}
		else {
			return <Label>{fieldContent}</Label>;
		}
	}

	private async _handleAddNewOrigin() {

		// const reqHeaders = new Headers({
		// 	'Cache-Control': 'no-cache, no-store, must-revalidate',
		// 	'Pragma': 'no-cache'
		// });

		// const response = await fetch(`/Home/AddOrigin?folderUrl=${this.state.newOrigin}`, {
		// 	credentials: 'same-origin',
		// 	method: 'POST',
		// 	headers: reqHeaders
		// });

		// if (!response.ok) {
		// 	const responseText = await response.text();
		// 	this.setState({
		// 		requestResult: responseText,
		// 		isRequestSuccess: false
		// 	});

		// 	throw new Error(responseText);
		// }

		// const _origins: string[] = await response.json();

		// this.props.handleStateUpdate({
		// 	Origins: _origins
		// });

		// this.setState({
		// 	isRequestSuccess: true,
		// 	requestResult: 'Done'
		// });
	}

	private _ontxtAddOriginChanged(value: string): void {
		return this.setState({
			newOrigin: value
		});
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(OriginsContainer);
