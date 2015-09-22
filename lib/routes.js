import React from 'react';
import {Route, Router} from 'react-router';

import * as storage from './persistence/storage';
import {validateToken} from './actions/authActions';

import {
  Application,
  Home,
  Login,
  SignUp,
  HowItWorks
} from './components';

import Admin from './components/views/Admin';

import {
  UserProfile,
  ComingSoon,
  NotFound} from './components/views';

export function renderRoutes(history, store) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={UserProfile} onEnter={requireAuth(store)}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/admin" component={Admin} onEnter={requireAuth(store)}/>
        <Route path="/comingsoon" component={ComingSoon}/>
        <Route path="/howitworks" component={HowItWorks}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  );
}

function requireAuth(store) {
  return (nextState, transition) => {
    const tokens = JSON.parse(storage.get('ffc-token'));
    const {auth} = store.getState();

    if (tokens && !auth.loggedIn && !auth.loggingIn) {
      store.dispatch(validateToken(tokens));
    }
    else if (!tokens && !auth.loggedIn) {
      transition.to('/login');
    }
  };
}
