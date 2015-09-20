import React, {Component} from 'react';
//import {Link} from 'react-router';

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
        <header role="banner">
          <h1 className="flex-container hero text-center">
            <div>
              <div id="h1part1">Donate Your</div>
              <div id="h1part2">Extra Garden Veggies</div>
            </div>
          </h1>
        </header>
        <main role="main">
          <article className="flex-item flex-container">
            <div className="explanation">
              <strong>It's so simple. </strong>
              <span id="if">If you are harvesting more from your garden than you can eat,</span>
              <span id="let">let us pick up your extra veg, and we'll share it with people in your area who can really use it!</span>
            </div>
            <img src={iconPlan}/>
          </article>
          <div id="cards" className="flex-container row-flow">
            <a href="#" id="card1" className="card flex-item text-center">
              <img src={mainVeggies} alt="veggies"/>
              <div className="overlay">
                <p id="ihave">I have veggies!</p>
                <p id="iwant">I want to share the extra food I don't need!</p>
                <p id="your">Donations are tax deductible.</p>
              </div>
            </a>
            <a href="/signup" id="card2" className="card flex-item text-center">
              <img src={mainGardeners} alt="gardeners"/>
                <div className="overlay">
                  <p id="im">I'm a gardener.</p>
                  <p id="sign">Sign me up!</p>
                </div>
            </a>
          </div>
          <div id="notes" className="flex-container">
            <a href="#" className="note flex-item text-center">
              <div className="note-icon flex-container">
                <img src={iconCyclist} alt="cyclist"/>
              </div>
              <h2>We'll pick it up</h2>
              <p>
                Sign up for Fresh Food Connect.
                It's easy, and we'll do all the work (except the gardening!)
              </p>
            </a>
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
            <a href="#" className="note flex-item text-center">
              <div className="note-icon flex-container">
                <img src={iconFoodWaste} alt="food waste"/>
              </div>
              <h2>It's such a waste!</h2>
              <p>
                Seriously, we Americans waste a huge amount of food every day.
                Learn more. Get involved. Help.
              </p>
            </a>
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
