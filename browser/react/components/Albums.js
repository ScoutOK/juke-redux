'use strict';

import React from 'react';
import bigStore, {store} from '../store';
import initialState from '../initialState';


export default class Albums extends React.Component{
  constructor () {
    super();
    this.state = initialState;
  }
  componentDidMount () {
    // console.log('from conponentDidMount ',this.state)
    // fetch('/api/albums')
    //   .then(res => res.json())
    //   .then(albums => {
    //     console.log('albums ', albums)
    //     //need to add image url for EACH album
    //     albums = albums.map(album => {
    //       album.imageUrl = `/api/albums/${album.id}/image`;
    //       return album;
    //     })
    this.props.goToAlbums();
  }
  render () {
    return(
      <div>
        <h3>Albums</h3>
        <div className="row">
          {/*repreated album component starts here*/}
          {this.props.albums && this.props.albums.map(function (album) {
            return (
          <div className="col-xs-4" key={album.id}>
            <a className="thumbnail" href="#">
              <img src={album.imageUrl} className="img-thumbnail"/>
              <div className="caption">
                <h5>
                  <span>{album.name}</span>
                </h5>
                <small>{album.songs.length} songs</small>
              </div>
            </a>
          </div>)})}
        </div>
      </div>
      )
  }
};

module.exports = Albums;
