import React, {Component} from 'react';
import {Link} from 'react-router';

// const logo = require('../../../assets/images/logo.png');
const iconPlan = require('../../../assets/images/icon-plant.png');
const mainVeggies = require('../../../assets/images/main-veggies.jpg');
const mainGardeners = require('../../../assets/images/main-gardeners.jpg');
const iconCyclist = require('../../../assets/images/icon-cyclist.png');
const iconPopcorn = require('../../../assets/images/icon-popcorn.png');
const iconFoodWaste = require('../../../assets/images/icon-food-waste.png');
const dugLogo = require('../../../assets/images/dug-logo.png');
const gwLogo = require('../../../assets/images/gw-logo.png');
const denverFoodRescueLogo = require('../../../assets/images/denverFoodRescueLogo.jpg');


export default class Home extends Component {
  render() {
    return (
      <div>
        <header className="banner" role="banner">
          <div className="banner__title">
            Donate Your
            <span className="banner__title__sub">Extra Garden Veggies</span>
          </div>
        </header>
        <main role="main">
          <div className="explanation">
            <div className="explanation__content">
              <strong className="explanation__content-title">It's so simple. </strong>
              <span className="explanation__content-if">If you are harvesting more from your garden than you can eat, </span>
              <span className="explanation__content-let">let us pick up your extra veg, and we'll share it with people in your area who can really use it!</span>
            </div>
            <img className="explanation__plant" src={iconPlan}/>
          </div>
          <div className="sign-me-up">
            <Link to="/signup" className="sign-me-up__card">
              <img className="sign-me-up__card-image" src={mainVeggies} alt="veggies"/>
              <div className="sign-me-up__card-overlay">
                <div className="sign-me-up__card-title">I have veggies!</div>
                <div className="sign-me-up__card-action">I want to share the extra food I don't need!</div>
                <div className="sign-me-up__card-small">Donations are tax deductible.</div>
              </div>
            </Link>
            <a className="sign-me-up__card sign-me-up__card--gardener" href="/signup">
              <img className="sign-me-up__card-image" src={mainGardeners} alt="gardeners"/>
              <div className="sign-me-up__card-overlay">
                <div className="sign-me-up__card-title">I'm a gardener.</div>
                <div className="sign-me-up__card-action">Sign me up!</div>
              </div>
            </a>
          </div>
          <div id="notes" className="flex-container">
            <Link to="/signup" className="note flex-item text-center">
              <div className="note-icon flex-container">
                <img src={iconCyclist} alt="cyclist"/>
              </div>
              <h2>We'll pick it up</h2>
              <p>
                Sign up for Fresh Food Connect.
                It's easy, and we'll do all the work (except the gardening!)
              </p>
            </Link>
            <a href="https://www.youtube.com/watch?v=T2XTSZGAv5s" className="note flex-item text-center">
              <div className="note-icon flex-container">
                <img src={iconPopcorn} alt="popcorn"/>
              </div>
              <h2>We made a movie!</h2>
              <p>
                Okay . . . more of a video.
                A short video all about the Fresh Food Connect Project.
                Check it out!
              </p>
            </a>
            <Link to="/comingsoon" className="note flex-item text-center">
              <div className="note-icon flex-container">
                <img src={iconFoodWaste} alt="food waste"/>
              </div>
              <h2>It's such a waste!</h2>
              <p>
                Seriously, we Americans waste a huge amount of food every day.
                Learn more. Get involved. Help.
              </p>
            </Link>
          </div>
        </main>
        <footer className="text-center">
          <article>
            <p style={{'color': 'white'}}>Fresh Food Connect is a project of</p>
            <a href="http://dug.org/">
              <img src={dugLogo} alt="DUG" height="90" width="90"/>
            </a>
            <a href="http://groundworkcolorado.org/">
              <img src={gwLogo} alt="Ground Work" height="90" width="90"/>
            </a>
            <a href="http://www.denverfoodrescue.org/">
              <img src={denverFoodRescueLogo} alt="FFC" height="90" width="90"/>
            </a>
          </article>
        </footer>
      </div>
    );
  }
}
