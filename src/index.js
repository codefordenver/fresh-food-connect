import 'babel/polyfill';
import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import App from './components/App';
import Home from './components/Home';

React.render((
  <Router history={history}>
    <Route component={App}>
      <Route path="/" component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'));
