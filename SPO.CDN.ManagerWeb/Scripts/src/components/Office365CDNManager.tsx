import * as React from 'react';
import { Header } from './Header';
import { OriginsContainer } from './OriginsContainer';
import { FileTypesContainer } from './FileTypesContainer';
import { ToggleCDNContainer } from './ToggleCDNContainer';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import './O365CDNManager.module.scss';

export interface IOffice365CDNManagerState {
	PublicCDNEnabled: boolean;
	Filetypes: string[];
	Origins: string[];
	SPOSiteUrl: string;
	showSpinner: boolean;
}

interface IOffice365CDNManagerProps {
}

export class Office365CDNManager extends React.Component<IOffice365CDNManagerProps, IOffice365CDNManagerState> {

	constructor(props: IOffice365CDNManagerProps) {
		super(props);
		this.state = {
			PublicCDNEnabled: false,
			Filetypes: [],
			Origins: [],
			SPOSiteUrl: '',
			showSpinner: true
		};
	}

	public render() {
		return <Fabric>
			<div className='o365Manager-Container'>
				<div className='ms-Grid'>
					<div className='ms-Grid-row'>
						<div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
							<Header SPOSiteUrl={this.state.SPOSiteUrl} />
						</div>
					</div>
					<div className='ms-Grid-row'>
						<div className='ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg12'>
							<Pivot linkSize={PivotLinkSize.large}>
								<PivotItem linkText='Origins' itemIcon='Globe'>
									<OriginsContainer
										Origins={this.state.Origins}
										handleStateUpdate={this._handleStateUpdate.bind(this)} />
									{this.state.showSpinner &&
										<Spinner size={SpinnerSize.large} />
									}
								</PivotItem>
								<PivotItem linkText='Filetypes' itemIcon='OpenFile'>
									<FileTypesContainer
										FileTypes={this.state.Filetypes}
										handleStateUpdate={this._handleStateUpdate.bind(this)} />
								</PivotItem>
								<PivotItem linkText='Turn CDN On/Off' itemIcon='Settings' >
									<ToggleCDNContainer
										Enabled={this.state.PublicCDNEnabled} handleStateUpdate={this._handleStateUpdate.bind(this)} />
								</PivotItem>
							</Pivot>
						</div>
					</div>
				</div>
			</div>
		</Fabric>;
	}

	componentDidMount() {
		this._getCDNSettings();
	}

	private async _getCDNSettings() {
		const reqHeaders = new Headers({
			'Cache-Control': 'no-cache, no-store, must-revalidate',
			'Pragma': 'no-cache'
		});

		const response = await fetch('/Home/GetCDNSettings', {
			credentials: 'same-origin',
			headers: reqHeaders
		});

		const o365Cdn: IOffice365CDNManagerState = await response.json();

		this.setState({
			PublicCDNEnabled: o365Cdn.PublicCDNEnabled,
			Filetypes: o365Cdn.Filetypes,
			Origins: o365Cdn.Origins,
			SPOSiteUrl: o365Cdn.SPOSiteUrl,
			showSpinner: false
		});
	}

	private _handleStateUpdate(newState: any) {
		this.setState(newState);
	}
}
