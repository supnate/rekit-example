import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import './storage/leanInit';

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);

const root = document.createElement('div');
root.className = 'react-root';
document.body.appendChild(root);

render(
  <Provider store={store}>
    <Router history={history} routes={routeConfig} />
  </Provider>,
  root
);
