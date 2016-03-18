import React, { Component, PropTypes } from 'react';

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <div>
        <h1 className="pageTitle text-center">Admin</h1>
        { this.props.children }
      </div>
    )
  }
}
