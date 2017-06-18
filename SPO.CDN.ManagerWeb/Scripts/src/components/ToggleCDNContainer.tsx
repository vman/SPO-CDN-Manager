import * as React from "react";
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IToggleCDNContainerProps {
    Enabled: boolean
    toggleCDN: (checked: boolean) => void
}

export interface IToggleCDNContainerState {
    showDialog: boolean;
    isChecked: boolean;
}

export class ToggleCDNContainer extends React.Component<IToggleCDNContainerProps, IToggleCDNContainerState> {

    constructor(props: IToggleCDNContainerProps) {
        super(props);
        this.state = {
            showDialog: false,
            isChecked: this.props.Enabled
        };
    }

    public render() {
        return <div className="o365Manager-ToggleCDNContainer">
            <Toggle
                label='Use Office 365 Public CDN'
                onText='On'
                offText='Off'
                checked={this.state.isChecked}
                onChanged={this._checked.bind(this)} />

            <Dialog
                isOpen={this.state.showDialog}
                type={DialogType.largeHeader}
                onDismiss={this._closeDialog.bind(this)}
                title='Change CDN Settings?'
                subText='Are you sure you want to change the CDN settings for your tenant?'
                isBlocking={true}>
                <DialogFooter>
                    <DefaultButton onClick={this._dialogYesClicked.bind(this)} text='Yes' />
                    <DefaultButton onClick={this._closeDialog.bind(this)} text='No' />
                </DialogFooter>
            </Dialog>
        </div>
    }

    private _dialogYesClicked() {
        this.props.toggleCDN(this.state.isChecked)
        this.setState({ showDialog: false });
    }

    private _checked(_isChecked: boolean) {
        this.setState({
            isChecked: _isChecked,
            showDialog: true
        });
    }

    private _closeDialog() {
        this.setState({
            isChecked: !this.state.isChecked,
            showDialog: false
        });
    }
}