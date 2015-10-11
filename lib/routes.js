import React from 'react';
import {Route, Router} from 'react-router';

import * as storage from './persistence/storage';
import {validateToken} from './actions/authActions';
import {loginFrom} from './actions/redirectActions';

import {
  Application,
  DonationSubmitted,
  ForgotPassword,
  Home,
  HowItWorks,
  Login,
  GotNoVeggies,
  GotVeggies,
  NewPassword,
  SignupWizard
} from './components';

import Admin from './components/views/Admin';

import {
  UserProfile,
  ComingSoon,
  NotFound
} from './components/views';

export function renderRoutes(history, store) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/confirm-donation" component={GotVeggies} onEnter={requireAuth(store)}/>
        <Route path="/donation-confirmed" component={DonationSubmitted}/>
        <Route path="/sorrynotthistime" component={GotNoVeggies} onEnter={requireAuth(store)}/>
        <Route path="/signup" component={SignupWizard}/>
        <Route path="/reset-password" component={ForgotPassword}/>
        <Route path="/reset" component={NewPassword}/>
        <Route path="/profile" component={UserProfile} onEnter={requireAuth(store)}/>
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
      const currentUri = [location.pathname, location.search, location.hash].join('');
      store.dispatch(loginFrom(currentUri));
      transition.to('/login');
    }
  };
}
