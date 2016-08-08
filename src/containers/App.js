import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="app">
        <div className="main-container">
          <div className="side-bar">
            <h2><a href="https://github.com/supnate/rekit-example">Rekit Example</a></h2>
            <ul>
              <li><Link to="/">Topic List</Link></li>
              <li><Link to="/topic/add">New Topic</Link></li>
            </ul>
          </div>
          <div className="page-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
