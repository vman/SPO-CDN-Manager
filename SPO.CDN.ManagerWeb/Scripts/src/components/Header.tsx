import * as React from 'react';
//import { Label } from 'office-ui-fabric-react/lib/Label'

export interface IHeaderProps {
    SPOSiteUrl?: string;
}

export interface IHeaderState{

}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
    public render() {
        return <div className='o365Manager-Header'>
            <span className='ms-font-xxl ms-fontSize-xxl'>
                Manage Office 365 Public CDN Settings for <span className='ms-font-xl ms-fontSize-xl ms-u-slideDownIn20'>{this.props.SPOSiteUrl}</span>
            </span>
        </div>;
    }
}