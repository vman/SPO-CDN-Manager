import * as React from "react";
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IToggleCDNContainerProps {
    Enabled: boolean
}

//Think if checked should be state instead of props as needs to be canged
export class ToggleCDNContainer extends React.Component<IToggleCDNContainerProps, null> {
    public render() {
        return <div className="o365Manager-ToggleCDNContainer">
            <Toggle
                defaultChecked={this.props.Enabled}
                label='Use Office 365 Public CDN'
                onText='On'
                offText='Off'
                checked={this.props.Enabled} />
        </div>
    }
}