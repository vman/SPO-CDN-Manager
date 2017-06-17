import * as React from "react";
import { Label } from 'office-ui-fabric-react';

export interface IHeaderProps {
    SPOSiteUrl?: string;
}

export class Header extends React.Component<IHeaderProps, null> {
    public render() {
        return <div className="o365Manager-Header">
            <Label className="ms-font-su ms-fontSize-xxl">Manage Office 365 Public CDN settings for {this.props.SPOSiteUrl}</Label>
        </div>;
    }
}