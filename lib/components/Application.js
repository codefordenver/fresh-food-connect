import React, { PropTypes } from 'react';
import Radium from 'radium';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from '../actions/authActions';
import Navbar from './Navbar';

const css = {
  base: {
    marginTop: 56
  }
};

@Radium
@connect(
  state => ({ user: state.auth.user }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)
export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    user: PropTypes.object,
    logout: PropTypes.func
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.replaceWith('/profile');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.transitionTo('/');
    }
  }

  render() {
    const {user, logout} = this.props;

    return (
      <div style={css.base}>
        <Navbar user={user} logout={logout}/>

        <div id="main">
          {/* this will render the child routes */}
          {this.props.children}
        </div>
      </div>
    );
  };
}
