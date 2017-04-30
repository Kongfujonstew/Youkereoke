import React from 'react';
import {render} from 'react-dom';

export class Video extends React.Component {
  constructor(props) {
    super(props);


  } 

  render () {
    if (!this.props.videoQueue.length) {
      return (
        <div id="videoDisco">
        </div>
      )} 
      return (
        <div id="video">
          <iframe 
            src={"https://www.youtube.com/embed/" + this.props.videoQueue[0].id.videoId + "?autoplay=1"} 
            frameBorder="0" allowFullScreen
            onEnded={this.props.handleVideoEnd}
            ></iframe>
        </div>

      )
  }

}


