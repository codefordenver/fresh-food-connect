import React, {Component} from 'react';
import DocumentMeta from 'react-document-meta';


export default class About extends Component {
  render() {
    return (
      <div>
        <DocumentMeta title="Fresh Food Connect | About"/>
        <div className="container">
          <h1>About Fresh Food Connect</h1>
          <h2>A project of <a href="http://www.codefordenver.org/" target="_blank">Code for Denver</a></h2>

          <p> Based on <a
              href="https://github.com/erikras/react-redux-universal-hot-example"
              target="_blank">react-redux-univeral-hot-example</a>.
          </p>

        </div>
      </div>
    );
  }
}
