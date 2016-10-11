import initialState from './initialState';
const redux = require('redux');


const LOAD_ALBUMS = 'LOAD ALBUMS'

function reducer (prevState, action) {
  prevState = prevState || initialState;
  action = action || {};
  let newState
  switch (action.type) {
    case LOAD_ALBUMS:
      newState = Object.assign({}, prevState,{
        albums: action.albums
      });
      break;
  }
  return newState
}

const store = redux.createStore(reducer)

module.exports = store;
