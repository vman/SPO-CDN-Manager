import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { cdnSettingsReducer } from '../reducers/reducers';

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
	cdnSettingsReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
  );
}
