import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isInfoLoaded} from '../reducers/info';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import {load as loadInfo} from '../actions/infoActions';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import InfoBar from '../components/InfoBar';
import {createTransitionHook} from '../universalRouter';
import {requireServerCss} from '../util';
import {
  AppBar,
  FontIcon,
  Styles,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  DropDownIcon
} from 'material-ui';

const styles = __CLIENT__ ? require('./App.scss') : requireServerCss(require.resolve('./App.scss'));

const ThemeManager = new Styles.ThemeManager();


class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.transitionTo('/profile');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.transitionTo('/');
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    const {user} = this.props;

    let iconMenuItems = user ? [
      // { payload: '1', text: `Logged in as ${user.name}` },
      { payload: '2', text: 'Log Out' }
    ] : [
      { payload: '1', text: 'Log In' }
    ];

    return (
      <div className={styles.app}>

        <Toolbar style={{backgroundColor: '#00AD88'}}>
          <ToolbarGroup key={0} float="left">
            <ToolbarTitle text="Fresh Food Connect" />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
          </ToolbarGroup>
        </Toolbar>

        {/*<nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <div className={styles.brand}/>
              Fresh Food Connect
            </Link>

            <ul className="nav navbar-nav">
              {!user && <li><Link to="/login">Login</Link></li>}
              {user && <li className="logout-link"><a href="/logout" onClick={::this.handleLogout}>Logout</a></li>}
            </ul>

            {user && <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}

          </div>
        </nav>*/}

        <div className={styles.appContent}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

@connect(state => ({
  user: state.auth.user
}))
export default
class AppContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    const promises = [];
    if (!isInfoLoaded(store.getState())) {
      promises.push(store.dispatch(loadInfo()));
    }
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    const { user, dispatch } = this.props;
    return <App user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </App>;
  }
}
