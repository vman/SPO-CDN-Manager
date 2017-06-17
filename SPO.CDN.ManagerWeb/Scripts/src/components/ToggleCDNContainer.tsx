import * as React from "react";
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export interface IToggleCDNContainerProps {
    Enabled: boolean
    onChanged: (checked: boolean) => void
}

export class ToggleCDNContainer extends React.Component<IToggleCDNContainerProps, null> {
    public render() {
        return <div className="o365Manager-ToggleCDNContainer">
            <Toggle
                label='Use Office 365 Public CDN'
                onText='On'
                offText='Off'
                checked={this.props.Enabled}
                onChanged={this.props.onChanged} />
        </div>
    }
}