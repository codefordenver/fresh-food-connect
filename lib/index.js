import '../assets/stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'
import { browserHistory, hashHistory } from 'react-router'
import Root from './Root';

// Use hash location for Github Pages
// but switch to HTML5 history locally.
const history = process.env.NODE_ENV === 'production' ? hashHistory : browserHistory

// Ensure that tap events work on mobile devices
injectTapEventPlugin()

ReactDOM.render(<Root history={history}/>, document.getElementById('app'));
