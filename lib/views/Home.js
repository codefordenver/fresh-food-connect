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
    const signUpBtnStyles = {
      fontSize: '1.5rem',
      lineHeight: '3rem'
    };

    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className={styles.container}>
            <h1 className={styles.tagline}>
              Donate Your Extra Garden Veggies
            </h1>
            <h4 className={styles.description}>
              Share the fresh food that you don't need
            </h4>
          </div>
          <div className={styles.callToActionContainer}>
            <Link to="login">
                <FlatButton label="COME AND GET IT" primary={true} style={signUpBtnStyles} />
            </Link>
          </div>
        </div>

        <div className={styles.about}>
          <h2>
            How Fresh Food Connect works
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p>
            Donec ac nisl a eros hendrerit vulputate. Maecenas fringilla ligula libero, sit amet dignissim ligula placerat nec.
          </p>
          <p>
            Pellentesque feugiat facilisis tortor accumsan sodales. Sed posuere ligula at metus accumsan, ut porttitor augue porttitor. Aliquam erat volutpat. Curabitur sed bibendum enim. Praesent euismod eros quis porttitor accumsan. Nunc vitae quam a sapien tincidunt laoreet id vitae erat.
          </p>
        </div>

        <hr />

        <div className={styles.facts}>
          <h3>
            Food Facts
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <hr />

        <div className={styles.tax}>
          Your donation is tax deductable
        </div>
      </div>
    );
  }
}
