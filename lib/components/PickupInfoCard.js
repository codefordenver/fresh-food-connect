import React, {Component, PropTypes} from 'react';
import {Card} from 'material-ui';

export default class PickupInfoCard extends Component {
  static propTypes = {
    pickupDay: PropTypes.string.isRequired
  }

  render() {
    return (
      <Card style={{margin: '26px 20px 0',
                      padding: '20px'}}>
        <h2>
          We pick up in your area on <em>{this.props.pickupDay}</em>
        </h2>
      </Card>
    );
  }
}
