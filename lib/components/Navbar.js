import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

const image = require('../../assets/images/logo.png');

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

    let menuLinks = document.querySelectorAll('.navigation__menu .pure-menu-item a');
    for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function() {
        closeMenu();
      });
    };

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

  };

  render() {
    const {user, logout} = this.props;
    return (
      <div className="custom-wrapper pure-g navigation" id="menu">
        <div className="navigation__logo">
          <div className="pure-menu">
            <Link to="/">
              <img alt="Fresh Food Connect" src={image} />
            </Link>
            <a className="custom-toggle" id="toggle"><s className="bar"></s><s className="bar"></s></a>
          </div>
        </div>
        <div className="navigation__menu">
          <div className="pure-menu pure-menu-horizontal custom-can-transform">
            <ul className="pure-menu-list">
              <li className="pure-menu-item"><Link to="/">Home</Link></li>
              <li className="pure-menu-item"><Link to="howitworks">How Fresh Food Connect Works</Link></li>
              <li className="pure-menu-item"><Link to="comingsoon">Connect Stories</Link></li>
              <li className="pure-menu-item"><a href="mailto://info@groundworkcolorado.org" target="_blank">Contact FFC</a></li>
                {user ?
                    <li className="pure-menu-item pure-menu-item--profile signout-profile">
                      <Link to="profile">Profile</Link>
                      <a onClick={logout}>Sign Out</a>
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
