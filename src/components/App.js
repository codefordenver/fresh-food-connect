import React, {Component, PropTypes} from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        Hi! I'm on every page
        {this.props.children}
      </div>
    );
  }
}
