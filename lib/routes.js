import React from 'react';
import {Route} from 'react-router';

import {
  Application,
  Home,
  Login
} from './components';

export default (
  <Route component={Application}>
    <Route path="/" component={Home}/>
    <Route path="login" component={Login}/>
  </Route>
);
