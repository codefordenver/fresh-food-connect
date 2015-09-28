/* global __DEVTOOLS__ */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHistory, createHashHistory } from 'history';
import { Styles } from 'material-ui';
import { routerStateReducer, reduxReactRouter} from 'redux-router';

import logger from './middleware/logger';
import createApiPromise from './middleware/apiPromise';
import * as reducers from './reducers';
import ApiClient from './ApiClient';
import {renderRoutes} from './routes';

// Use hash location for static hosting sans backend
// but switch to HTML5 history locally.
const historyCreator = process.env.NODE_ENV === 'production' ? createHashHistory : createHistory;

const ThemeManager = new Styles.ThemeManager();
const apiPromise = createApiPromise(new ApiClient());

const middleware = [
  thunk,
  logger,
  apiPromise
];

const storeEnhancers = [
  applyMiddleware(...middleware),
  reduxReactRouter({
    createHistory: historyCreator
  })
];

if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools');
  storeEnhancers.push(devTools());
}

const combinedReducer = combineReducers({
  ...reducers,
  router: routerStateReducer
});
const finalCreateStore = compose(...storeEnhancers)(createStore);
const store = finalCreateStore(combinedReducer);

function getRootChildren() {
  const rootChildren = [
    <Provider key="provider" store={store}>
      {renderRoutes.bind(null, store)}
    </Provider>
  ];

  if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } =
      require('redux-devtools/lib/react');
    rootChildren.push(
      <DebugPanel key="debug-panel" top right bottom>
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    );
  }
  return rootChildren;
}

export default class Root extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <div>{getRootChildren()}</div>
    );
  };
}
