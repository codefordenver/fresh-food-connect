import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {
  FontIcon,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  DropDownIcon,
  FlatButton
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

    const iconMenuItems = user ? [
      // { payload: '1', text: `Logged in as ${user.name}` },
      { payload: '2', text: 'Log Out' }
    ] : [
      { payload: '1', text: 'Log In' }
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
          <FontIcon className="mui-icon-sort" />
          <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
          {user ?
            <Link to="/">
              <FlatButton label="Sign Out"
                  secondary={true}
                  onClick={logout}
                  style={{signInOutBtnStyles}}/>
            </Link>
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
