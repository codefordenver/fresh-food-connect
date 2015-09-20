import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {
  ToolbarTitle,
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
  }
};

class Navbar extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentDidMount() {

    const menu = document.getElementById('menu'),
      WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';

    function toggleHorizontal() {
      [].forEach.call(
        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
        function (el) {
          el.classList.toggle('pure-menu-horizontal');
        }
      );
    };

    function toggleMenu() {
      // set timeout so that the panel has a chance to roll up
      // before the menu switches states
      if (menu.classList.contains('open')) {
        setTimeout(toggleHorizontal, 500);
      }
      else {
        toggleHorizontal();
      }
      menu.classList.toggle('open');
      document.getElementById('toggle').classList.toggle('x');
    };

    function closeMenu() {
      if (menu.classList.contains('open')) {
        toggleMenu();
      }
    }

    document.getElementById('toggle').addEventListener('click', function () {
      toggleMenu();
    });

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

  }

;

  render() {
    const {user, logout} = this.props;
    return (
      <div className="custom-wrapper pure-g" id="menu">
        <div className="pure-u-1 pure-u-lg-1-3">
          <div className="pure-menu">
            <Link to="/">
              <div style={css.brand}/>
              <ToolbarTitle text="Fresh Food Connect" style={{color: 'white'}}/>
            </Link>
            <a href="#" className="custom-toggle" id="toggle"><s className="bar"></s><s className="bar"></s></a>
          </div>
        </div>
        <div className="pure-u-2 pure-u-lg-2-3">
          <div className="pure-menu pure-menu-horizontal custom-can-transform">
            <ul className="pure-menu-list">
              <li className="pure-menu-item"><Link to="coomingsoon">How Fresh Food Connect Works</Link></li>
              <li className="pure-menu-item"><Link to="coomingsoon">Connect Stories</Link></li>
              <li className="pure-menu-item"><a href="mailto:codefordenver@gmail.com" target="_blank">Contact FFC</a></li>
                {user ?
                    <li className="pure-menu-item pure-menu-item--profile signout-profile">
                      <Link to="profile"><Avatar>{user.email.slice(0, 1)}</Avatar></Link>
                      <Link onClick={logout}>Sign Out</Link>
                    </li>
                  :
                    <li className="pure-menu-item pure-menu-item--profile">
                      <Link to="signup">Sign Me Up!</Link>
                      <Link to="login">Log In</Link>
                    </li>
                }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
