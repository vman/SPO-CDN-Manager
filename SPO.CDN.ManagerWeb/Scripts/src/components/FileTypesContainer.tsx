import * as React from "react";

export interface IFileTypesContainerProps {
    FileTypes: string[];
}

export class FileTypesContainer extends React.Component<IFileTypesContainerProps, null> {
    constructor(props: IFileTypesContainerProps) {
        super(props);
    }

    public render() {
        //need to check if this.props.FileTypes is not undefined before rendering
        return <div className="o365Manager-FileTypesContainer">
            {this.props.FileTypes && 
                <ul>
                    {this.props.FileTypes.map((filetype) =>
                        <li key={filetype.toString()}>
                            {filetype}
                        </li>
                    )}
                </ul>
            }
        </div>;
    }
}