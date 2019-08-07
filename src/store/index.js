import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const initState = {};
const middleware = [thunk];

const store = createStore(rootReducer, initState, applyMiddleware(...middleware));
window.store = store;
export default store;