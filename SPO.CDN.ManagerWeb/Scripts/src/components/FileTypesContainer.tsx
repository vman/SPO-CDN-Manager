import * as React from 'react';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PanelContainer } from './PanelContainer';
import { DialogContainer } from './DialogContainer';
import { Office365CDNManagerState } from '../types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
	toggleDeleteFiletypeDialog,
	setFiletypeToDelete,
 	updateFiletypes } from '../actions/filetypeActions';

export interface IFileTypesContainerProps {
}

interface IConnectedDispatch {
	toggleDeleteFiletypeDialog: (toggle: boolean) => void;
	setFiletypeToDelete: (filetype: string) => void;
	updateFiletypes: () => void;
}

function mapStateToProps(state: Office365CDNManagerState, ownProps: IFileTypesContainerProps): Office365CDNManagerState {
	return state;
}

const mapDispatchToProps = (dispatch: Dispatch<Office365CDNManagerState>): IConnectedDispatch => ({
	setFiletypeToDelete: (filetype: string) => {
		dispatch(setFiletypeToDelete(filetype));
	},
	toggleDeleteFiletypeDialog: (toggle: boolean) => {
		dispatch(toggleDeleteFiletypeDialog(toggle));
	},
	updateFiletypes: () => {
		dispatch(updateFiletypes());
	}
});

class FileTypesContainer extends React.Component<IFileTypesContainerProps & Office365CDNManagerState & IConnectedDispatch, {}> {

	public render() {
		const _items: any = [];

		this.props.Filetypes.items.map((_filetype, index) =>
			_items.push({
				key: index,
				delete: '',
				filetype: _filetype
			})
		);

		return <div className='o365Manager-FileTypesContainer'>
			<div className='ms-Grid'>
				<div className='ms-Grid-row'>
					<div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
						<div className='Origins-Button-Container'>
							<PrimaryButton
								className='FileTypes-AddNewFileType'
								text='Add Filetype'
								onClick={() => this.setState({ showPanel: true })} />
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
									fieldName: 'filetype',
									minWidth: 300
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
				showPanel={this.props.Filetypes.showPanel}
				handleSubmitClicked={this._addNewFileType.bind(this)}
				handleCancelClicked={() => this.setState({ showPanel: false })}
				handleTextFieldChanged={this._ontxtAddFiletypeChanged.bind(this)}
				panelHeader='Add a Filetype'
				panelSubText='Add a file extention to be included in the CDN'
				textFieldLabel='File extension'
				textFieldPlaceHolder='e.g. PNG'
				isRequestSuccess={this.props.Filetypes.isRequestSuccess}
				messagebarResultText={this.props.Filetypes.requestResult} />

			<DialogContainer
				showDialog={this.props.Filetypes.showDialog}
				submitClicked={() => this.props.updateFiletypes(this.props.Filetypes.items)}
				cancelClicked={() => this.props.toggleDeleteFiletypeDialog(false)}
				dialogTitle='Delete a File extention?'
				dialogSubText='Are you sure you want to delete the following File extention?'
				content={this.props.Filetypes.fileTypeToDelete} />
		</div>;
	}

	private _renderItemColumn(item: any, index: any, column: any) {
		const fieldContent = item[column.fieldName];
		if (column.key === 'column1') {
			return <IconButton
				iconProps={{ iconName: 'Trash' }}
				onClick={() => {
					this.props.setFiletypeToDelete(item.filetype);
					this.props.toggleDeleteFiletypeDialog(true);
				}} />;
		}
		else {
			return <Label>{fieldContent}</Label>;
		}
	}

	private _deleteFileType() {
		const initialFileTypes = this.props.Filetypes.items;
		const newFileTypes = initialFileTypes.filter((_fileType) => {
			return _fileType !== this.props.Filetypes.fileTypeToDelete;
		});

		this.setState({
			showDeleteFileTypeDialog: false
		});

		this._setFileTypes(newFileTypes);
	}

	private _addNewFileType() {
		const _fileTypes = this.props.Filetypes.items;
		_fileTypes.push(this.props.Filetypes.fileTypeToAdd);

		this._setFileTypes(_fileTypes);
	}

	private async _setFileTypes(newFileTypes: string[]) {

		// const reqHeaders = new Headers({
		// 	'content-type': 'application/json; charset=utf-8',
		// 	'dataType': 'json',
		// 	'Cache-Control': 'no-cache, no-store, must-revalidate',
		// 	'Pragma': 'no-cache'
		// });

		// const response = await fetch(`/Home/SetFiletypes`, {
		// 	credentials: 'same-origin',
		// 	method: 'POST',
		// 	cache: 'no-store',
		// 	headers: reqHeaders,
		// 	body: JSON.stringify({ filetypes: newFileTypes })
		// });

		// if (!response.ok) {
		// 	const responseText = await response.text();
		// 	this.setState({
		// 		requestResult: responseText,
		// 		isRequestSuccess: false
		// 	});

		// 	throw new Error(responseText);
		// }

		// const _fileTypes: string[] = await response.json();

		// // this.props.handleStateUpdate({
		// // 	Filetypes: _fileTypes
		// // });

		// this.setState({
		// 	isRequestSuccess: true,
		// 	requestResult: 'Done'
		// });
	}

	private _ontxtAddFiletypeChanged(value: string): void {
		// this.setState({
		// 	newFileType: value
		// });
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FileTypesContainer);
