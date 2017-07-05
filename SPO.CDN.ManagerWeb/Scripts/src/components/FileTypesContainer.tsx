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
	updateFiletypes,
	toggleAddFiletypePanel,
	setFiletypeToAdd
} from '../actions/filetypeActions';

export interface IFileTypesContainerProps {
}

interface IConnectedDispatch {
	toggleDeleteFiletypeDialog: (toggle: boolean) => void;
	setFiletypeToDelete: (filetype: string) => void;
	updateFiletypes: (filetypes: string[]) => void;
	toggleAddFiletypePanel: (toggle: boolean) => void;
	setFiletypeToAdd: (filetype: string) => void;
}

function mapStateToProps(state: Office365CDNManagerState, ownProps: IFileTypesContainerProps): Office365CDNManagerState {
	return state;
}

const mapDispatchToProps = (dispatch: Dispatch<Office365CDNManagerState>): IConnectedDispatch => ({
	setFiletypeToAdd: (filetype: string) => {
		dispatch(setFiletypeToAdd(filetype));
	},
	setFiletypeToDelete: (filetype: string) => {
		dispatch(setFiletypeToDelete(filetype));
	},
	toggleDeleteFiletypeDialog: (toggle: boolean) => {
		dispatch(toggleDeleteFiletypeDialog(toggle));
	},
	toggleAddFiletypePanel: (toggle: boolean) => {
		dispatch(toggleAddFiletypePanel(toggle));
	},
	updateFiletypes: (filetypes: string[]) => {
		dispatch(updateFiletypes(filetypes));
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
								onClick={() => this.props.toggleAddFiletypePanel(true)} />
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
				handleSubmitClicked={() => {
					//Add new filetype to existing filetypes
					const newFiletypes = this.props.Filetypes.items.concat(this.props.Filetypes.fileTypeToAdd);
					this.props.updateFiletypes(newFiletypes);
				}}
				handleCancelClicked={() => this.props.toggleAddFiletypePanel(false)}
				handleTextFieldChanged={(value: string) => this.props.setFiletypeToAdd(value)}
				panelHeader='Add a Filetype'
				panelSubText='Add a file extention to be included in the CDN'
				textFieldLabel='File extension'
				textFieldPlaceHolder='e.g. PNG'
				isRequestSuccess={this.props.Filetypes.isRequestSuccess}
				messagebarResultText={this.props.Filetypes.requestResult} />

			<DialogContainer
				showDialog={this.props.Filetypes.showDialog}
				submitClicked={() => {
					//remove the selected filetype from the current filetype
					const filteredItems = this.props.Filetypes.items.filter((item) => item !== this.props.Filetypes.fileTypeToDelete);
					this.props.updateFiletypes(filteredItems);
				}}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(FileTypesContainer);
