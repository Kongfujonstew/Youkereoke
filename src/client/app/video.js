import React from 'react';
import {render} from 'react-dom';

export class Video extends React.Component {
  constructor(props) {
    super(props);


  }

  // setInitialState 

  render () {
    if (!this.props.currentVideo.kind) {
      return (
        <div id="videoDisco">
        </div>
      )} 
      return (
        <div id="video">
          <iframe 
            src={"https://www.youtube.com/embed/" + this.props.currentVideo.id.videoId + "?autoplay=1"} 
            frameBorder="0" allowFullScreen
            onended={this.props.handleVideoEnd}
            ></iframe>
        </div>

      )
  }

}


