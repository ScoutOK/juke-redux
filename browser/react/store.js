import initialState from './initialState';
import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';



const logger = createLogger();
const middleware = applyMiddleware(logger, thunkMiddleware);


const LOAD_ALBUMS = 'LOAD ALBUMS'

function reducer (prevState, action) {
  prevState = prevState || initialState;
  action = action || {};
  console.log('action ', action)
  let newState = {};
  switch (action.type) {
    case LOAD_ALBUMS:
      newState = Object.assign({}, prevState,{
        albums: action.albums
      });
      break;
  }
  console.log('new state ', newState)
  return newState
}

const receiveAlbums = function (albums) {
  return { type: LOAD_ALBUMS, albums }
};



const store = createStore(reducer, middleware)

const fetchAlbumsFromServer =() => {
  return dispatch => {
    fetch('/api/albums')
      .then(res => res.json())
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => dispatch(receiveAlbums(albums)))
  }
}

module.exports = {
  store: store,
  receiveAlbums: receiveAlbums
};
