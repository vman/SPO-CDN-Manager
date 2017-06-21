import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IPanelContainerPropsState {

}

export interface IPanelContainerProps {
	showPanel: boolean;
	panelHeader: string;
	panelSubText: string;
	textFieldLabel: string;
	textFieldPlaceHolder: string;
	handleCancelClicked: () => void;
	handleTextFieldChanged: () => void;
	handleSubmitClicked: () => void;
	messagebarTextInfo: string;
}


export class PanelContainer extends React.Component<IPanelContainerProps, IPanelContainerPropsState> {
	public render() {
		return <Panel
			isOpen={this.props.showPanel}
			onDismiss={this.props.handleCancelClicked}
			type={PanelType.medium}
			isLightDismiss={true}
			headerText={this.props.panelHeader}>
			<Label>{this.props.panelSubText}</Label>
			<TextField label={this.props.textFieldLabel} placeholder={this.props.textFieldPlaceHolder} onChanged={this.props.handleTextFieldChanged} />
			<PrimaryButton text='Add' onClick={this.props.handleSubmitClicked} />
			<MessageBar>{this.props.messagebarTextInfo}</MessageBar>
		</Panel>
	}
}