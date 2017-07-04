import * as React from 'react';
import { Header } from './Header';
import OriginsContainer from './OriginsContainer';
import { FileTypesContainer } from './FileTypesContainer';
import ToggleCDNContainer from './ToggleCDNContainer';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './O365CDNManager.module.scss';

import { Office365CDNManagerState } from '../types';
import { connect } from 'react-redux';
import { fetchCDNSettings } from '../actions/settingActions';
import { Dispatch } from 'redux';

interface IOffice365CDNManagerProps {

}

interface IConnectedDispatch {
	fetchCDNSettings: () => void;
}

function mapStateToProps(state: Office365CDNManagerState, ownProps: IOffice365CDNManagerProps): Office365CDNManagerState {
	return state;
}

const mapDispatchToProps = (dispatch: Dispatch<Office365CDNManagerState>): IConnectedDispatch => ({
	fetchCDNSettings: () => {
		dispatch(fetchCDNSettings());
	}
});

class Office365CDNManager extends React.Component<IOffice365CDNManagerProps & Office365CDNManagerState & IConnectedDispatch, {}> {
	public render() {
		return <Fabric>
			<div className='o365Manager-Container'>
				<div className='ms-Grid'>
					<div className='ms-Grid-row'>
						<div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
							<Header SPOSiteUrl={this.props.Settings.SPOSiteUrl} />
						</div>
					</div>
					<div className='ms-Grid-row'>
						<div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
							<Pivot linkSize={PivotLinkSize.large}>
								<PivotItem linkText='Origins' itemIcon='Globe'>
									<OriginsContainer />
									{this.props.Settings.isLoading &&
										<Spinner size={SpinnerSize.large} />
									}
								</PivotItem>
								<PivotItem linkText='Filetypes' itemIcon='OpenFile'>
									<FileTypesContainer
										FileTypes={this.props.Filetypes.items}
										handleStateUpdate={this._handleStateUpdate.bind(this)} />
								</PivotItem>
								<PivotItem linkText='Turn CDN On/Off' itemIcon='Settings' >
									<ToggleCDNContainer />
								</PivotItem>
							</Pivot>
						</div>
					</div>
				</div>
			</div>
		</Fabric>;
	}

	componentDidMount() {
		this.props.fetchCDNSettings();
	}

	private _handleStateUpdate(newState: any) {
		//this.setState(newState);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Office365CDNManager);
