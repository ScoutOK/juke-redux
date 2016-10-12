const connect = require('react-redux').connect;
import Albums from '../components/Albums'
import {store, fetchAlbums} from '../store';


const AlbumContainer = connect(
  function mapStateToProps (state, ownProps) {
    return  {
      albums: state.albums
    };
  },
  function mapDispatchToProps (dispatch, existingProps) {
    return {
      goToAlbums () {
        dispatch(fetchAlbums())
      }
    }
  }
)(Albums)

module.exports = AlbumContainer
