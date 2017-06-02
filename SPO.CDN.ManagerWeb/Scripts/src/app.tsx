import * as React from "react";
import * as ReactDOM from "react-dom";

import { Office365CDNManager } from "./components/Office365CDNManager";
import { IOffice365Cdn, Office365Cdn, CdnType } from "./dto/Office365Cdn";


const o365cdnProps: IOffice365Cdn = { Type: CdnType.Public, Enabled: true,  };

const o365ManagerElement: React.ReactElement<IOffice365Cdn> = React.createElement(Office365CDNManager, o365cdnProps);

ReactDOM.render(o365ManagerElement, document.getElementById("cdnManagerContainer"));