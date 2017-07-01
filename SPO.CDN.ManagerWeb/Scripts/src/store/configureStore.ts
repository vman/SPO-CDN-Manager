import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { cdnManagerReducer } from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
 	cdnManagerReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
  );
}
