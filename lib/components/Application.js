import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Radium from 'radium';

import Menu from './Menu';
import Navbar from './Navbar';
import Footer from './Footer';
import {Styles} from 'material-ui';

const ThemeManager = new Styles.ThemeManager();

const css = {
  base: {
    marginTop: 56
  }
};


@Radium
export default class Application extends React.Component {

  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
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
      <div id="layout" className={activeClass} style={css.base}>
        <a href="#menu" id="menuLink"
           className={classnames('menu-link', activeClass)}
           onClick={this.handleMenuClick}>
          <span></span>
        </a>

        <Menu activeClass={activeClass}/>
        {/*<Navbar user={user} logout={this.props.logout}/>*/}
        <Navbar/>

        <div id="main">
          {/* this will render the child routes */}
          {this.props.children}
        </div>

        <Footer />
      </div>
    );
  };
}
