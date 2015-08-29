import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
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
    const styles = require('./Navbar.scss');
    const {user, logout} = this.props;

    let iconMenuItems = [
      {payload: '1', text: 'Profile'},
      {payload: '2', text: 'Map'}
    ];

    const toolBarStyles = {
      backgroundColor: '#45b337',
      position: 'fixed',
      top: 0,
      zIndex: 100
    };

    const signInOutBtnStyles = {
      backgroundColor: 'transparent',
      signInOutBtnStyles
    };

    return (
      <Toolbar style={toolBarStyles}>
        <ToolbarGroup key={0} float="left">
          <Link to="/">
            <div className={styles.brand}/>
            <ToolbarTitle text="Fresh Food Connect" style={{
              color: 'white'}}/>
          </Link>
        </ToolbarGroup>

        <ToolbarGroup key={1} float="right">
          {user ?
            <div>
              <ToolbarTitle text={user.user.email}/>
              <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems}
                            iconStyle={{color: 'white'}}/>
              <Avatar>F</Avatar>
              <ToolbarSeparator/>
              <FlatButton label="Sign Out"
                          secondary={true}
                          onClick={logout}
                          style={{signInOutBtnStyles}}/>
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
