import React, { PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from '../actions/authActions';
import Navbar from './Navbar';

@connect(
  state => ({ user: state.auth.user, loginRedirectedFrom: state.redirect.loginRedirectedFrom }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)
export default class Application extends React.Component {

  static propTypes = {
    actions: PropTypes.object,
    children: PropTypes.any,
    location: PropTypes.object,
    loginRedirectedFrom: PropTypes.string,
    user: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      const {pathname} = this.props.location;

      if (/login|signup/.test(pathname)) {
        if (this.props.loginRedirectedFrom) {
          this.context.router.replaceWith(this.props.loginRedirectedFrom);
        } else {
          this.context.router.replaceWith('/profile');
        }
      } else if (/reset/.test(pathname)) {
        this.context.router.replaceWith('/login');
      }
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.transitionTo('/');
    }
  }

  render() {
    const {user, actions} = this.props;

    return (
      <div>
        <Navbar user={user} logout={actions.logout}/>

        <div id="main">
          {/* this will render the child routes */}
          {this.props.children}
        </div>
      </div>
    );
  };
}
