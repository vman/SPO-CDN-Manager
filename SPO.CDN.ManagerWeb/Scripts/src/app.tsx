import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import Office365CDNManager from './components/Office365CDNManager';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
    <Office365CDNManager />
</Provider>, document.getElementById('cdnManagerContainer'));
