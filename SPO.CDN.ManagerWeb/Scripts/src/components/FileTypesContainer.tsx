import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label'
import { List } from 'office-ui-fabric-react/lib/List';

export interface IFileTypesContainerProps {
    FileTypes: string[];
}

export interface IFileTypesContainerState {
}

export class FileTypesContainer extends React.Component<IFileTypesContainerProps, IFileTypesContainerState> {
    public render() {
        return <div className='o365Manager-FileTypesContainer'>
            <ul>
                {this.props.FileTypes.map((filetype, index) =>
                    <li key={index}>
                        {filetype}
                    </li>
                )}
            </ul>
        </div>;
    }
}