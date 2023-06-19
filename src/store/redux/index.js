import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

const reduxSagaMiddleware = createSagaMiddleware();
const reduxMiddlewares = [reduxSagaMiddleware];

const initialState = {};

const reducer = (state = initialState, action) => {};

const store = createStore(
   reducer,
   initialState,
   applyMiddleware(...reduxMiddlewares)
);

export default store;
