const connect = require('react-redux').connect;
import Albums from '../components/Albums'
import reduxStuff, {store, receiveAlbums} from '../store';

const fetchAlbums =() => {
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
