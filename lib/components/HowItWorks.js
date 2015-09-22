import React, {Component} from 'react';
import {Paper} from 'material-ui';

export default class HowItWorks extends Component {
  render() {
    return (
    <Paper zDepth={5} rounded={true} className="how-it-works-container">
      <h1 className="text-center how-it-works-title">How it works</h1>
      <div className="how-it-works flex-container">
        <p className="flex-item">Backyard or community gardeners can sign up to donate extra fruits and vegetables.
          Each week, you will receive an email or text asking if you have produce from your garden to donate. If you do, you
          will put it on your front porch on your designated date, and our youth employees will pick it up. The veggies will
          either be donated or sold very affordably to food insecure families.
        </p>
      </div>
    </Paper>);
  }
}
