import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import player from './player';

const reducer = combineReducers({
    player
})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleWare,
    createLogger({ collapsed: true })
))

const store = createStore(reducer, middleware);

export default store;

export * from './player';