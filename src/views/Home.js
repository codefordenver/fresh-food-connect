import React, {Component} from 'react';
import {Link} from 'react-router';
import { FlatButton, Styles } from 'material-ui';

const ThemeManager = new Styles.ThemeManager();


export default class Home extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');

    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>Fresh Food Connect</h1>
            <p>
                <Link to="login">
                    <FlatButton label="SUBSCRIBE" primary={true}/>
                </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
