import React from 'react';
import {render} from 'react-dom';
import YouTube from 'react-youtube';

// var YouTube = require('react-youtube');

export class Video extends React.Component {
  constructor(props) {
    super(props);


  } 

  render () {


/////////////////////////////////////

    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    };







    if (!this.props.videoQueue.length) {
      return (
        <div id="videoDisco">
        </div>
      )} 
      return (
        <div id="video">
          <YouTube 
            videoId={this.props.videoQueue[0].id.videoId} 
            opts = {opts}
            onEnd={this.props.handleVideoEnd}
            />
        </div>

      )
  }

}


