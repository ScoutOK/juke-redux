const connect = require('react-redux').connect;
// import Albums from '../components/Albums'

const AlbumContainer = connect(
  function mapStateToProps (state, ownProps) {
    return  {
      albums: state.albums
    };
  };,
  function mapDispatchToProps (dispatch, existingProps) {
    return {
      goToAlbums: function (albums) {
        dispatch({
          type: 'LOAD ALBUMS',
          albums: albums
        })
      }
    }
  }
)(Albums)

module.exports = AlbumContainer
