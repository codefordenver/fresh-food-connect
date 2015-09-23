import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as userActions from 'actions/userActions';

const smallBag = require('assets/images/bag_size_sm_85x138.png');
const mediumBag = require('assets/images/bag_size_m_126x175.png');
const extraLargeBag = require('assets/images/bag_size_xl_252x181.png');

const iconRadio = require('assets/images/icon-radio.png');
const iconRadioChecked = require('assets/images/icon-radio-checked.png');

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
      { name: 'small', img: smallBag, value: 1, label: 'about a small bag' },
      { name: 'medium', img: mediumBag, value: 2, label: 'about a grocery bag full' },
      { name: 'extraLarge', img: extraLargeBag, value: 3, label: 'two big bags or more' }
    ];

    return (
      <div className="flex-container">
      {
        bagSizes.map((bagSize) => {
          return (
            <div className={classnames('donationSize '+bagSize.name, {selected: this.props.selected === `${bagSize.name}`})}
                    key={bagSize.value}
                    onClick={this.props.onSelect.bind(this, bagSize)} >
              <img className="radio"
                        src={iconRadio}
                        alt="" />
              <img className="radio checked"
                        src={iconRadioChecked}
                        alt="" />
              <img className="bag"
                        src={bagSize.img}
                        alt={bagSize.name} />
              <div className="bag_label">{bagSize.label}</div>
            </div>
          );
        })
      }
      </div>
    );
  }
}

DonationSizeChooser.props = {selected: null};

export default DonationSizeChooser;
