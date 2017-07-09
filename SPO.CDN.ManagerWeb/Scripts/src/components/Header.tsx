import * as React from 'react';
import { FontClassNames, FontSizes } from '@uifabric/styling';

export interface IHeaderProps {
	SPOSiteUrl?: string;
}

export interface IHeaderState {

}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
	public render() {
		return <div className='o365Manager-Header'>
			<span className={[FontClassNames.xxLarge, FontSizes.xxLarge].join(' ')}>
				Manage Office 365 Public CDN Settings for <span className={[FontClassNames.xLarge, FontSizes.xLarge].join(' ')}>{this.props.SPOSiteUrl}</span>
			</span>
			<span className='o365Manager-contact'>
				by <a target='_blank' href='https://twitter.com/vrdmn'>@vrdmn</a>
			</span>
		</div>;
	}
}
