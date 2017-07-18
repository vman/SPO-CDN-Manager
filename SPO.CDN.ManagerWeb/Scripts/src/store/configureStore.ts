import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore() {

    if (process.env.NODE_ENV === 'production') {
        return createStore(rootReducer, applyMiddleware(thunkMiddleware));
    }
    else {
        return createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
    }
}
