import React from 'react';
import {Route} from 'react-router';

import {
  Application,
  Home,
  Login
} from './components';

import {UserProfile, NotFound} from './components/views';

export default (
  <Route component={Application}>
    <Route path="/" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile" component={UserProfile}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
