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
const image = require('../../assets/images/logo.png');

const css = {
  brand: {
    display: 'inline-block',
    verticalAlign: 'top',
    background: `url(${image}) center center / cover no-repeat`,
    width: $size,
    height: $size
  },

  nav: {
    backgroundColor: '#45b337',
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
    // const styles = require('./Navbar.scss');
    const {user, logout} = this.props;

    let iconMenuItems = [
      {payload: '1', text: 'Profile'},
      {payload: '2', text: 'Map'}
    ];

    const signInOutBtnStyles = {
      backgroundColor: 'transparent',
      signInOutBtnStyles
    };

    return (
      <Toolbar style={css.nav}>
        <ToolbarGroup key={0} float="left">
          <Link to="/">
            <div style={css.brand}/>
            <ToolbarTitle text="Fresh Food Connect" style={{
              color: 'white'}}/>
          </Link>
        </ToolbarGroup>

        <ToolbarGroup key={1} float="right">
          {user ?
            <div>
              <ToolbarTitle text={user.email} style={{color:'white'}}/>
              <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems}
                            iconStyle={{color: 'white'}}/>
              <Avatar>F</Avatar>
              <ToolbarSeparator/>
              <FlatButton label="Sign Out"
                          secondary={true}
                          onClick={logout.bind(null, user.email)}/>
            </div>
            :
            <Link to="login">
              <FlatButton label="Sign In"
                          primary={true}
                          style={{lineHeight: '56px'}}/>
            </Link>}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Navbar;
