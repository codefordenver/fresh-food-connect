import React from 'react';
import {Route, Router} from 'react-router';

import {
  Application,
  Home,
  Login,
  SignUp
} from './components';

import Admin from './components/views/Admin';

import {UserProfile, NotFound} from './components/views';

export function renderRoutes(history) {
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
  debugger;
  const state = store.getState();
  ///const isLoggedIn = Boolean(state.application.token)
  console.log(state);
  //if (!isLoggedIn)
  //  redirectTo('/login', {
  //    nextPathname: nextState.location.pathname
  //  })
}
