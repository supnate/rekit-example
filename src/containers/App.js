import React, { Component, PropTypes } from 'react';
import routeConfig from '../common/routeConfig';
import SimpleNav from '../components/SimpleNav';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="app">
        <div className="main-container">
          <div className="side-bar">
            <SimpleNav routes={routeConfig} />
          </div>
          <div className="page-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
