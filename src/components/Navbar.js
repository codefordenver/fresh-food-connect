import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {
  FontIcon,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
  DropDownIcon,
  RaisedButton
} from 'material-ui';


class Navbar extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const {user, logout} = this.props;

    let iconMenuItems = user ? [
      // { payload: '1', text: `Logged in as ${user.name}` },
      { payload: '2', text: 'Log Out' }
    ] : [
      { payload: '1', text: 'Log In' }
    ];

    return (
      <Toolbar style={{backgroundColor: '#45b337'}}>
        <ToolbarGroup key={0} float="left">
          <Link to="/">
            <ToolbarTitle text="Fresh Food Connect" style={{
          color: 'white'}}/>
          </Link>
        </ToolbarGroup>

        <ToolbarGroup key={1} float="right">
          <FontIcon className="mui-icon-sort" />
          <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />
          {user ?
            <Link to="/">
              <RaisedButton label="Sign Out" secondary={true} onClick={logout}/>
            </Link>
          :
            <Link to="login">
              <RaisedButton label="Sign In" primary={true}/>
            </Link>}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default Navbar;
