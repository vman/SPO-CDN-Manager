import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IPanelContainerProps {
    showPanel: boolean;
    panelHeader: string;
    panelSubText: string;
    textFieldLabel: string;
    textFieldPlaceHolder: string;
    handleCancelClicked: () => void;
    handleTextFieldChanged: (value: string) => void;
    handleSubmitClicked: () => void;
    messagebarInfoText?: string;
    messagebarResultText?: string;
    isRequestSuccess: boolean;
}

export class PanelContainer extends React.Component<IPanelContainerProps, {}> {
    public render() {

        return <Panel
            isOpen={this.props.showPanel}
            onDismiss={this.props.handleCancelClicked}
            type={PanelType.medium}
            isLightDismiss={true}
            headerText={this.props.panelHeader}>
            <Label>{this.props.panelSubText}</Label>
            <TextField
                label={this.props.textFieldLabel}
                placeholder={this.props.textFieldPlaceHolder}
                onChanged={this.props.handleTextFieldChanged} />
            <PrimaryButton text='Add' onClick={this.props.handleSubmitClicked} />

            {this.props.messagebarInfoText &&
                <MessageBar>{this.props.messagebarInfoText}</MessageBar>
            }

            {this.props.messagebarResultText !== '' && this.props.isRequestSuccess &&
                <MessageBar messageBarType={MessageBarType.success}>{this.props.messagebarResultText}</MessageBar>
            }

            {this.props.messagebarResultText !== '' && !this.props.isRequestSuccess &&
                <MessageBar messageBarType={MessageBarType.error}>{this.props.messagebarResultText}</MessageBar>
            }

        </Panel>;
    }
}
