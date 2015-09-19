import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Radium from 'radium';
import {
  // FontIcon,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  ToolbarSeparator,
  DropDownIcon,
  FlatButton,
  Avatar
} from 'material-ui';

const $size = 56;
const image = require('../../assets/images/icon.png');

const css = {
  brand: {
    display: 'inline-block',
    verticalAlign: 'top',
    background: `url(${image}) center center / cover no-repeat`,
    width: $size,
    height: $size
  },

  nav: {
    backgroundColor: 'black',
    position: 'fixed',
    top: 0,
    marginTop: 0,
    zIndex: 100
  }
};

@Radium
class Navbar extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const {user, logout} = this.props;

    let iconMenuItems = [
      {payload: '1', text: 'Profile'},
      {payload: '2', text: 'Map'}
    ];

    return (
      <Toolbar style={css.nav}>
        <ToolbarGroup key={0} float="left">
          <Link to="/">
            <div style={css.brand}/>
            <ToolbarTitle text="Fresh Food Connect" style={{
              color: 'white'}}/>
          </Link>
        </ToolbarGroup>
        <nav role="navigation">
          <ul className="flex-container row-flow">
            <li className="flex-item"><Link to="coomingsoon">How Fresh Food Connect Works</Link></li>
            <li className="flex-item"><Link to="coomingsoon">Connect Stories</Link></li>
            <li className="flex-item"><a href="mailto:codefordenver@gmail.com" target="_blank">Contact FFC</a></li>
            <li className="flex-item">
              {user ?
                <div>
                  <Link to="profile">
                    <Avatar>{user.email.slice(0,1)}</Avatar>
                  </Link>
                  <ToolbarSeparator/>
                  <Link onClick={logout}>Sign Out</Link>
                </div>
                :
                <Link to="login">Sign In</Link>}
            </li>
          </ul>
        </nav>
      </Toolbar>
    );
  }
}

export default Navbar;
