import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DialogContainer } from './DialogContainer';
import { Office365CDNManagerState } from '../types';
import { Dispatch } from 'redux';
import { toggleCDN, showConfirmationDialog, closeConfirmationDialog } from '../actions/toggleCDNActions';
import { connect } from 'react-redux';

export interface IToggleCDNContainerProps {
}

interface IConnectedDispatch {
    toggleCDN: (toggle: boolean) => void;
    showConfirmationDialog: () => void;
    closeConfirmationDialog: () => void;
}

function mapStateToProps(state: Office365CDNManagerState, ownProps: IToggleCDNContainerProps): Office365CDNManagerState {
    return state;
}

const mapDispatchToProps = (dispatch: Dispatch<Office365CDNManagerState>): IConnectedDispatch => ({
    toggleCDN: (toggle: boolean) => {
        dispatch(toggleCDN(toggle));
    },
    showConfirmationDialog: () => {
        dispatch(showConfirmationDialog());
    },
    closeConfirmationDialog: () => {
        dispatch(closeConfirmationDialog());
    }
});

class ToggleCDNContainer extends React.Component<IToggleCDNContainerProps & Office365CDNManagerState & IConnectedDispatch, {}> {

    public render() {
        return <div className='o365Manager-ToggleCDNContainer'>
            <Toggle
                label='Use Office 365 Public CDN'
                onText='On'
                offText='Off'
                checked={this.props.ToggleCDN.Enabled}
                onChanged={this._checked.bind(this)} />

            <DialogContainer
                showDialog={this.props.ToggleCDN.showDialog}
                submitClicked={this._dialogYesClicked.bind(this)}
                cancelClicked={this._closeDialog.bind(this)}
                dialogTitle='Change CDN Settings?'
                dialogSubText='Are you sure you want to change the CDN settings for your tenant?' />
        </div>;
    }

    private _dialogYesClicked() {
        this.props.toggleCDN(!this.props.ToggleCDN.Enabled);
    }

    private _checked() {
        this.props.showConfirmationDialog();
    }

    private _closeDialog() {
        this.props.closeConfirmationDialog();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleCDNContainer);
