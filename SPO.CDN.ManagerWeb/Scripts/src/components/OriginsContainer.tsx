import * as React from "react";

import { List } from 'office-ui-fabric-react/lib/List';
import { Label } from 'office-ui-fabric-react/lib/Label'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IOriginsContainerProps {
    Origins: string[];
}

export interface IOriginsContainerState {
    showPanel: boolean;
}

export class OriginsContainer extends React.Component<IOriginsContainerProps, IOriginsContainerState> {
    constructor(props: IOriginsContainerProps) {
        super(props);
        this.state = {
            showPanel: false
        };
    }

    public render() {
        return <div className="o365Manager-OriginsContainer">

            <PrimaryButton text='Add New Origin' onClick={this._showPanel.bind(this)} />
            <PrimaryButton text='Create Default Origins' onClick={() => alert('Clicked')} />

            <ul>
                {this.props.Origins.map((origin, index) =>
                    <li key={index}>
                        {origin}
                    </li>
                )}
            </ul>

            <Panel
                isOpen={this.state.showPanel}
                onDismiss={() => this.setState({ showPanel: false })}
                type={PanelType.medium}
                isLightDismiss={ true }
                headerText='Add New CDN Origin'>
                <span className='ms-font-m'>Content goes here.</span>
            </Panel>
        </div>
    }

    private _showPanel(){
        this.setState({
            showPanel: true
        });
    }
}