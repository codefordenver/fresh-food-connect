/* global __DEVTOOLS__ */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './middleware/logger';
import createApiPromise from './middleware/apiPromise';
import * as reducers from './reducers';
import ApiClient from './ApiClient';
import {renderRoutes} from './routes';
import { Styles } from 'material-ui';

const ThemeManager = new Styles.ThemeManager();
const apiPromise = createApiPromise(new ApiClient());

let combinedCreateStore;
if (__DEVTOOLS__) {
  const { devTools } = require('redux-devtools');
  combinedCreateStore = compose(devTools(), createStore);
} else
  combinedCreateStore = compose(createStore);
const finalCreateStore = applyMiddleware(thunk, logger, apiPromise)(combinedCreateStore);
const combinedReducer = combineReducers(reducers);
const store = finalCreateStore(combinedReducer);

function getRootChildren(history) {
  const rootChildren = [
    <Provider key="provider" store={store}>
      {renderRoutes.bind(null, history, store)}
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
    muiTheme: React.PropTypes.object
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    const { history } = this.props;
    return (
      <div>{getRootChildren(history)}</div>
    );
  };
}
