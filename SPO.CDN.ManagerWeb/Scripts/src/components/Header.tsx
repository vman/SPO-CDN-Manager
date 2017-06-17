import * as React from "react";
import { Label } from 'office-ui-fabric-react/lib/Label'

export interface IHeaderProps {
    SPOSiteUrl?: string;
}

export class Header extends React.Component<IHeaderProps, null> {
    public render() {
        return <div className="o365Manager-Header">
            <Label className="ms-font-su ms-fontSize-xxl">
                Manage Office 365 Public CDN Settings for <span className="ms-font-xl ms-fontSize-xl">{this.props.SPOSiteUrl}</span>
            </Label>
        </div>;
    }
}