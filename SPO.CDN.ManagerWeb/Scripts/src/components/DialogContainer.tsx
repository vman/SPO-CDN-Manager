import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface IDialogContainerProps {
	showDialog: boolean;
	dialogTitle: string;
	dialogSubText: string;
	submitClicked: () => void;
	cancelClicked: () => void;
	content?: string;
}

export interface IDialogContainerPropsState{
}

export class DialogContainer extends React.Component<IDialogContainerProps, IDialogContainerPropsState> {

	public render() {
		return <Dialog
				isOpen={this.props.showDialog}
				type={DialogType.largeHeader}
				onDismiss={this.props.cancelClicked.bind(this)}
				title={this.props.dialogTitle}
				subText={this.props.dialogSubText}
				isBlocking={true}>
				<Label>{this.props.content}</Label>
				<DialogFooter>
					<DefaultButton onClick={this.props.submitClicked.bind(this)} text='Yes' />
					<DefaultButton onClick={this.props.cancelClicked.bind(this)} text='No' />
				</DialogFooter>
			</Dialog>;
	}
}
