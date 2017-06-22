import * as React from 'react';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PanelContainer } from './PanelContainer';
import { DialogContainer } from './DialogContainer';

export interface IFileTypesContainerProps {
	FileTypes: string[];
	handleStateUpdate: (newSate: any) => void;
}

export interface IFileTypesContainerState {
	showPanel: boolean;
	showDeleteFileTypeDialog: boolean;
	fileTypeToDelete: string;
	newFileType: string;
	isRequestSuccess: boolean;
	requestResult: string;

}

export class FileTypesContainer extends React.Component<IFileTypesContainerProps, IFileTypesContainerState> {
	constructor(props: IFileTypesContainerProps) {
		super(props);
		this.state = {
			showPanel: false,
			showDeleteFileTypeDialog: false,
			fileTypeToDelete: '',
			newFileType: '',
			requestResult: '',
			isRequestSuccess: false,
		};
	}

	public render() {
		let _items: any = [];

		this.props.FileTypes.map((_filetype, index) =>
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
							<PrimaryButton className='FileTypes-AddNewFileType' text='Add Filetype' onClick={() => this.setState({ showPanel: true })} />
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
				showPanel={this.state.showPanel}
				handleSubmitClicked={this._addNewFileType.bind(this)}
				handleCancelClicked={() => this.setState({ showPanel: false })}
				handleTextFieldChanged={this._ontxtAddFiletypeChanged.bind(this)}
				panelHeader='Add a Filetype'
				panelSubText='Add a file extention to be included in the CDN'
				textFieldLabel='File extension'
				textFieldPlaceHolder='e.g. PNG'
				isRequestSuccess={this.state.isRequestSuccess}
				messagebarResultText={this.state.requestResult} />

			<DialogContainer
				showDialog={this.state.showDeleteFileTypeDialog}
				submitClicked={this._deleteFileType.bind(this)}
				cancelClicked={() => this.setState({ showDeleteFileTypeDialog: false })}
				dialogTitle='Delete a File extention?'
				dialogSubText='Are you sure you want to delete the following File extention?'
				content={this.state.fileTypeToDelete} />
		</div>;
	}

	private _renderItemColumn(item: any, index: any, column: any) {
		const fieldContent = item[column.fieldName];
		index;
		if (column.key === 'column1') {
			return <IconButton
				iconProps={{ iconName: 'Delete' }}
				onClick={() => this.setState({
					showDeleteFileTypeDialog: true,
					fileTypeToDelete: item.filetype
				})} />
		}
		else {
			return <Label>{fieldContent}</Label>;
		}
	}

	private _deleteFileType() {
		let initialFileTypes = this.props.FileTypes;
		let newFileTypes = initialFileTypes.filter((_fileType) => {
			return _fileType != this.state.fileTypeToDelete;
		});

		this.setState({
			showDeleteFileTypeDialog: false
		});

		this._setFileTypes(newFileTypes);
	}

	private _addNewFileType() {
		let _fileTypes = this.props.FileTypes;
		_fileTypes.push(this.state.newFileType);

		this._setFileTypes(_fileTypes);
	}

	private async _setFileTypes(newFileTypes: string[]) {

		const reqHeaders = new Headers({
			'content-type': 'application/json; charset=utf-8',
			'dataType': 'json'
		});

		const response = await fetch(`/Home/SetFiletypes`, {
			credentials: 'same-origin',
			method: 'POST',
			headers: reqHeaders,
			body: JSON.stringify({ filetypes: newFileTypes })
		});

		if (!response.ok) {
			const responseText = await response.text();
			this.setState({
				requestResult: responseText,
				isRequestSuccess: false
			});

			throw new Error(responseText);
		};

		const _fileTypes: string[] = await response.json();

		this.props.handleStateUpdate({
			Filetypes: _fileTypes
		});
	}

	private _ontxtAddFiletypeChanged(value: string): void {
		this.setState({  
			newFileType: value
		});
	}
}