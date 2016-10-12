const connect = require('react-redux').connect;
import AppContainer from './AppContainer';

import {store, play, pause, load, startSong} from '../store';

export const AppConnect = connect(
  function mapStateToProps (state) {
    return  {
      state: state
    };
  },
  function mapDispatchToProps (dispatch, existingProps) {
    return {
      playSong () {
        dispatch(play());
      }
    }
  })(AppContainer)
