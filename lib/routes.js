import React from 'react';
import {Route} from 'react-router';

import {
  Application,
  Home,
  Login,
  SignUp
} from './components';

import About from './components/views/About';

export default (
  <Route component={Application}>
    <Route path="/" component={Home}/>
    <Route path="login" component={Login}/>
    <Route path="about" component={About}/>
    <Route path="signup" component={SignUp}/>
  </Route>
);
