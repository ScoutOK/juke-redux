import initialState from './initialState';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import AUDIO from './audio';



const logger = createLogger();
const middleware = applyMiddleware(logger, thunkMiddleware);

//action types
const LOAD_ALBUMS = 'LOAD ALBUMS'
const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

//reducer components
const generateAlbums = (prevState, action) => {
  //prevState = prevState || [];
  action = action || {};
  switch (action.type) {
    case LOAD_ALBUMS:
       return action.albums
    default: return []
  }
}

const isPlaying = (prevState, action) => {
  //prevState = prevState || false;
  action = action || {};
  switch (action.type) {
    case START_PLAYING:
      return true
    case STOP_PLAYING:
      return false
    default: return false
  }
}

const currentSong = (prevState, action) => {
  action = action || {};
  switch (action.type) {
    case SET_CURRENT_SONG:
      return action.currentSong
    default: return {}
  }
}

const currentSongList = (prevState, action) => {
  action = action || {};
  switch (action.type) {
    case SET_CURRENT_SONG:
      return action.currentSongList
    default: return []
  }
}

//synchronous action creators
const startPlaying = () => ({ type: START_PLAYING });
const stopPlaying = () => ({ type: STOP_PLAYING });

const setCurrentSong = (currentSong, currentSongList) => ({
  type: SET_CURRENT_SONG,
  currentSong,
  currentSongList
});

export const play = () => dispatch => {
  AUDIO.play();
  // this.setState({ isPlaying: true });
  dispatch(startPlaying());
}

export const pause = () => dispatch => {
  AUDIO.pause();
  //this.setState({ isPlaying: false });
  dispatch(stopPlaying());
}

export const load = (currentSong, currentSongList) => dispatch => {
  AUDIO.src = currentSong.audioUrl;
  AUDIO.load();
  dispatch(setCurrentSong(currentSong, currentSongList))
  //this.setState({ currentSong, currentSongList });
}

export const startSong = (song, list) => dispatch =>{
  dispatch(pause());
  dispatch(load(song, list));
  dispatch(play());
}

//left toggles for later

// toggleOne (selectedSong, selectedSongList) {
//   if (selectedSong.id !== this.state.currentSong.id)
//     this.startSong(selectedSong, selectedSongList);
//   else this.toggle();
// }

export const toggle = () => (dispatch, getState) => {
  if (getState()) dispatch(pause());
  else dispatch(play());
}





//action creator for album view
export const receiveAlbums = function (albums) {
  return { type: LOAD_ALBUMS, albums }
};

//async action creator
export const fetchAlbums =() => {
  return dispatch => {
    fetch('/api/albums')
      .then(res => res.json())
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => {
        albums = albums.map(album => {
          album.imageUrl = `/api/albums/${album.id}/image`;
          return album;
        });
        dispatch(receiveAlbums(albums))})
  }
}

//define reducer
let reducer = combineReducers(
  {albums: generateAlbums,
    isPlaying,
    currentSong,
    currentSongList}
)

export const store = createStore(reducer, middleware);

