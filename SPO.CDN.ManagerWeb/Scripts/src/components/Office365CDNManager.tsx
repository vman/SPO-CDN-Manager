import * as React from "react";
import * as jQuery from "jquery";
import { Office365Cdn } from "../dto/Office365Cdn";
import { Spinner, SpinnerSize, Label } from 'office-ui-fabric-react';

// State is never set so we use the 'undefined' type.
export class Office365CDNManager extends React.Component<Office365Cdn, any> {

    public render() {
        return <div className="o365Manager-Container">
                    <Label>Large Spinner</Label>
                    <Spinner size={SpinnerSize.large} />
                </div>;
    }

    componentDidMount() {
        this._getCDNSettings();
    }

    componentWillUnmount() {

    }

    private async _getCDNSettings() {

        // jQuery.ajax("/Home/GetCDNSettings")
        // 	.then(function (data: any) {

        // 		console.log(data);

        // 	}, function () {
        // 		console.log(arguments);
        // 	});

        const response = await fetch("/Home/GetCDNSettings", { credentials: 'include' });

        const o365Cdn: Office365Cdn = await response.json();

        console.log(o365Cdn);

    }
}