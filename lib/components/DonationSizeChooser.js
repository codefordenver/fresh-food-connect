import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as userActions from 'actions/userActions';

const smallBag = require('assets/images/bag_size_sm_85x138.png');
const mediumBag = require('assets/images/bag_size_m_126x175.png');
const extraLargeBag = require('assets/images/bag_size_xl_252x181.png');

@connect(
  (state) => ({user: state.auth.user}),
  dispatch => bindActionCreators(userActions, dispatch)
)

class DonationSizeChooser extends Component {
  static propTypes = {
    selected: PropTypes.string,
    onSelect: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const bagSizes = [
      { name: 'small', img: smallBag, value: 1 },
      { name: 'medium', img: mediumBag, value: 2 },
      { name: 'extraLarge', img: extraLargeBag, value: 3 }
    ];

    return (
      <div className="flex-container">
      {
        bagSizes.map((bagSize) => {
          return (
            <img className={classnames('donationSize', {selected: this.props.selected === `${bagSize.name}`})}
                src={bagSize.img}
                alt={bagSize.name}
                onClick={this.props.onSelect.bind(this, bagSize)}
                key={bagSize.value}
            />
          );
        })
      }
      </div>
    );
  }
}

DonationSizeChooser.props = {selected: null};

export default DonationSizeChooser;
