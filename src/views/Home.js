import React, {Component} from 'react';
import {Link} from 'react-router';
import CounterButton from '../components/CounterButton';
import GithubButton from '../components/GithubButton';
import {requireServerCss, requireServerImage} from '../util';
import { FlatButton, Styles } from 'material-ui';

const ThemeManager = new Styles.ThemeManager();
const styles = __CLIENT__ ? require('./Home.scss') : requireServerCss(require.resolve('./Home.scss'));

// require the logo image both from client and server
let logoImage = '';
if (__CLIENT__) {
  logoImage = require('./logo.png');
} else {
  logoImage = requireServerImage('./logo.png');
}

export default class Home extends Component {
  getChildContext() {
    return {
        muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  render() {
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

Home.childContextTypes = {
    muiTheme: React.PropTypes.object
};
