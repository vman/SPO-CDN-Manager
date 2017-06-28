import * as React from 'react';
import * as ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { fetchCDNSettings } from './actions/actionCreators';
import reducer from './reducers/reducers';

import { Office365CDNManager } from './components/Office365CDNManager';

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
	  thunkMiddleware, // lets us dispatch() functions
	 	loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(fetchCDNSettings())
  .then(() => console.log(store.getState()));

ReactDOM.render(<Office365CDNManager/>, document.getElementById('cdnManagerContainer'));
