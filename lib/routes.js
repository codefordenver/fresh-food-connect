import React from 'react';
import {Route, Router, redirectTo} from 'react-router';
import * as storage from './persistence/storage';
import * as constants from './constants';
import {
  Application,
  Home,
  Login,
  SignUp
} from './components';

import Admin from './components/views/Admin';

import {UserProfile, NotFound} from './components/views';

export function renderRoutes(history, store) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={UserProfile} onEnter={requireAuth(store)}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/admin" component={Admin}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  );
}

function requireAuth(store) {
  const token = storage.get('ffc-token');
  const {auth} = store.getState();

  if (token) {
    store.dispatch(constants.VALIDATE_TOKEN);
    console.log(auth);
  } else {
    redirectTo('/login');
  }
}
