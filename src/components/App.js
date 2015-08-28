import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        Hi! I'm on every page
        {this.props.children}
      </div>
    );
  }
}
