import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DialogContainer } from './DialogContainer';

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
        return <div className='o365Manager-ToggleCDNContainer'>
            <Toggle
                label='Use Office 365 Public CDN'
                onText='On'
                offText='Off'
                checked={this.state.isChecked}
                onChanged={this._checked.bind(this)} />

			<DialogContainer
				showDialog={this.state.showDialog}
				submitClicked={this._dialogYesClicked.bind(this)}
				cancelClicked={this._closeDialog.bind(this)}
				dialogTitle='Change CDN Settings?'
				dialogSubText='Are you sure you want to change the CDN settings for your tenant?' />
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