import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { DialogContainer } from './DialogContainer';
import { Office365CDNManagerState } from '../types';
import { Dispatch } from 'redux';
import { toggleCDN } from '../actions/toggleCDNActions';
import { connect } from 'react-redux';

export interface IToggleCDNContainerProps {
}

interface IConnectedDispatch {
	toggleCDN: (toggle: boolean) => void;
}

function mapStateToProps(state: Office365CDNManagerState, ownProps: IToggleCDNContainerProps): Office365CDNManagerState {
	return state;
}

const mapDispatchToProps = (dispatch: Dispatch<Office365CDNManagerState>): IConnectedDispatch => ({
	toggleCDN: (toggle: boolean) => {
		dispatch(toggleCDN(toggle));
	}
});

export class ToggleCDNContainer extends React.Component<IToggleCDNContainerProps & Office365CDNManagerState & IConnectedDispatch, {}> {

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

	private async _dialogYesClicked() {

		try {

			this.setState({ showDialog: false });

			const reqHeaders = new Headers({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache'
			});

			const response = await fetch(`/Home/SetCDN?value=${this.props.Enabled}`, {
				credentials: 'same-origin',
				method: 'POST',
				headers: reqHeaders
			});

			if (!response.ok) {
				const responseText = await response.text();
				throw new Error(responseText);
			}

			const responseJSON: boolean = await response.json();

			this.props.handleStateUpdate({
				PublicCDNEnabled: responseJSON
			});

		}
		catch (error) {
			this.props.handleStateUpdate((prevState: any) => ({
				PublicCDNEnabled: !prevState.PublicCDNEnabled
			}));
		}
	}

	private _checked(_isChecked: boolean) {
		this.props.handleStateUpdate((prevState: any) => ({
			PublicCDNEnabled: !prevState.PublicCDNEnabled
		}));

		this.setState({
			showDialog: true
		});
	}

	private _closeDialog() {
		this.props.handleStateUpdate((prevState: any) => ({
			PublicCDNEnabled: !prevState.PublicCDNEnabled
		}));

		this.setState({
			showDialog: false
		});
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleCDNContainer);
