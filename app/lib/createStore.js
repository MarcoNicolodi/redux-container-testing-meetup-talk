import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { routerMiddleware, routerReducer as router } from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory';
import document from '../features/list/state/ducks';
import { watchFetch } from '../features/list/state/sagas';


const sagaMiddlware = createSagaMiddleware();
export default(initialState) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const store = createStore(
    combineReducers({ document }),
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddlware)),
  );

  sagaMiddlware.run(watchFetch);

  return store;
};
