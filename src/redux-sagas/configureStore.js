import { applyMiddleware, compose, createStore } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './main';
import saga from './sagas';

export default function configureStore(initialState) {

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, thunkMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers));
  sagaMiddleware.run(saga);
  return store;
};
