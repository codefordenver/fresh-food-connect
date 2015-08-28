import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import Home from 'views/Home';
import About from 'views/About';
import Login from 'views/Login';
import RequireLogin from 'views/RequireLogin';
import LoginSuccess from 'views/LoginSuccess';
import Survey from 'views/Survey';
import NotFound from 'views/NotFound';
import UserProfile from 'views/UserProfile';
import SignUp from 'views/SignUp';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login}/>
      <Route component={RequireLogin} onEnter={RequireLogin.onEnter(store)}>
        <Route path="/loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="/survey" component={Survey}/>
      <Route path="/profile" component={UserProfile}/>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
