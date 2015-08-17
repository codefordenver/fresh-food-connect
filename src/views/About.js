import React, {Component} from 'react';
import MiniInfoBar from '../components/MiniInfoBar';
import {requireServerImage} from '../util';

const kitten = __CLIENT__ ? require('./kitten.jpg') : requireServerImage('./kitten.jpg');

export default class About extends Component {
  state = {
    showKitten: false
  }

  handleToggleKitten() {
    this.setState({showKitten: !this.state.showKitten});
  }

  render() {
    const {showKitten} = this.state;
    return (
      <div>
        <div className="container">
          <h1>About Fresh Food Connect</h1>
          <h2>A project of <a href="http://www.codefordenver.org/" target="_blank">Code for Denver</a></h2>

          <p> Based on  <a
              href="https://github.com/erikras/react-redux-universal-hot-example"
              target="_blank">react-redux-univeral-hot-example</a>.
          </p>

        </div>
      </div>
    );
  }
}
