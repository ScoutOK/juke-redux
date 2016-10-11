'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import AlbumContainer from './containers/AlbumContainer';
import store from './store';
import { Provider } from 'react-redux';




ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
    <AlbumContainer />
  </Provider>,
  document.getElementById('app')
)
