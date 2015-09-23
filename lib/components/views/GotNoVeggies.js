import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as userActions from 'actions/userActions';
import {getQueryVariable} from '../../utils/urlUtils';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(userActions, dispatch)
)
export default class GotNoVeggies extends Component {
  static propTypes = {
    user: PropTypes.object,
    setDonationPreference: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      comments: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    const locationId = getQueryVariable('location_id');
    this.props.setDonationPreference({
      locationId,
      userId: user.id,
      size: 0,
      comments: ''
    });
  }

  render() {
    return (
      <div className="content donations">
        <h2>Thanks for telling us!</h2>
        <p>
          We'll check with you again next week.
          <br/>
          We're glad you're part of our network of supportive gardeners!
        </p>
      </div>
    );
  }
}
