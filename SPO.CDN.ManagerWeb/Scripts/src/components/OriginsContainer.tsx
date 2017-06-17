import * as React from "react";
import "./O365CDNManager.module.scss";

import { List } from 'office-ui-fabric-react/lib/List';

export interface IOriginsContainerProps {
    Origins: string[];
}

export class OriginsContainer extends React.Component<IOriginsContainerProps, null> {
    public render() {
        return <div className="o365Manager-OriginsContainer">
            <List
                items={this.props.Origins}
                onRenderCell={(origin, index) => (
                    <li>{origin}</li>
                )}
             />
        </div>
    }
}