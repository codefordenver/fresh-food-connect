//import React, {Component, PropTypes} from 'react';
//import {bindActionCreators} from 'redux';
//import {connect} from 'react-redux';

//import {isLoaded as isInfoLoaded} from '../reducers/info';
//import {isLoaded as isAuthLoaded} from '../reducers/auth';
//import {load as loadInfo}from '../actions/infoActions';
//import {load as loadAuth, logout} from '../actions/authActions';
//import {createTransitionHook} from '../universalRouter';
//import {Styles} from 'material-ui';
//import Navbar from '../components/Navbar';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//
//injectTapEventPlugin();
//
//const title = 'Fresh Food Connect';
//const description = 'Fresh Food Connect App | Code For Denver';
//const image = './assets/images/logo';
//
//const ThemeManager = new Styles.ThemeManager();
//
//
//@connect(
//    state => ({user: state.auth.user}),
//    dispatch => bindActionCreators({logout}, dispatch))
//export default class App extends Component {
//  static propTypes = {
//    children: PropTypes.object.isRequired,
//    user: PropTypes.object,
//    logout: PropTypes.func.isRequired
//  };
//
//  static contextTypes = {
//    router: PropTypes.object.isRequired,
//    store: PropTypes.object.isRequired
//  };
//
//  static childContextTypes = {
//    muiTheme: React.PropTypes.object
//  };
//
//  componentWillMount() {
//    const {router, store} = this.context;
//    this.transitionHook = createTransitionHook(store);
//    router.addTransitionHook(this.transitionHook);
//  }
//
//  componentWillReceiveProps(nextProps) {
//    if (!this.props.user && nextProps.user) {
//      // login
//      this.context.router.transitionTo('/profile');
//    } else if (this.props.user && !nextProps.user) {
//      // logout
//      this.context.router.transitionTo('/');
//    }
//  }
//
//  componentWillUnmount() {
//    const {router} = this.context;
//    router.removeTransitionHook(this.transitionHook);
//  }
//
//  getChildContext() {
//    return {
//      muiTheme: ThemeManager.getCurrentTheme()
//    };
//  }
//
//  render() {
//    const styles = require('./App.scss');
//    const {user} = this.props;
//
//    return (
//      <div className={styles.app}>
//        <Navbar user={user} logout={this.props.logout}/>
//
//        <div className={styles.appContent}>
//          {this.props.children}
//        </div>
//      </div>
//    );
//  }
//
//  static fetchData(store) {
//    const promises = [];
//    if (!isInfoLoaded(store.getState())) {
//      promises.push(store.dispatch(loadInfo()));
//    }
//    if (!isAuthLoaded(store.getState())) {
//      promises.push(store.dispatch(loadAuth()));
//    }
//    return Promise.all(promises);
//  }
//}


import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Menu from './Menu';
import Footer from './Footer';

export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any
  };

  constructor(props, context) {
    super(props, context);

    this.handleMenuClick = this.handleMenuClick.bind(this);

    this.state = {
      isMenuActive: false
    };
  };

  handleMenuClick(evt) {
    evt.preventDefault();
    this.setState({isMenuActive: !this.state.isMenuActive});
  };

  render() {
    const { isMenuActive } = this.state;
    const activeClass = isMenuActive ? 'active' : '';

    return (
      <div id="layout" className={activeClass}>
        <a href="#menu" id="menuLink"
           className={classnames('menu-link', activeClass)}
           onClick={this.handleMenuClick}>
          <span></span>
        </a>

        <Menu activeClass={activeClass}/>

        <div id="main">
          {/* this will render the child routes */}
          {this.props.children}
        </div>

        <Footer />
      </div>
    );
  };
}
