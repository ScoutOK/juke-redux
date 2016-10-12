'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import AlbumContainer from './containers/AlbumContainer';
import bigStore, {store} from './store';
import { Provider } from 'react-redux';




ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
)
