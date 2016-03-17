import '../assets/stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, hashHistory } from 'react-router'
import Root from './Root';

// Use hash location for Github Pages
// but switch to HTML5 history locally.
const history = process.env.NODE_ENV === 'production' ? hashHistory : browserHistory

ReactDOM.render(<Root history={history}/>, document.getElementById('app'));
