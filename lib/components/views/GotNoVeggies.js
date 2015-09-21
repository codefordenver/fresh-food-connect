import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from 'actions/authActions';
import * as userActions from 'actions/userActions';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class GotNoVeggies extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    store: PropTypes.object
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {store} = this.props;

    store.dispatch(userActions.setDonationPreference({donationSize:0, comments:''}));
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
