import * as React from "react";

import { List } from 'office-ui-fabric-react/lib/List';
import { Label } from 'office-ui-fabric-react/lib/Label'

export interface IOriginsContainerProps {
    Origins: string[];
}

export interface IOriginsContainerState {
}

export class OriginsContainer extends React.Component<IOriginsContainerProps, IOriginsContainerState> {
    public render() {
        return <div className="o365Manager-OriginsContainer">
            <ul>
                {this.props.Origins.map((origin, index) =>
                    <li key={index}>
                        {origin}
                    </li>
                )}
            </ul>
        </div>
    }
}