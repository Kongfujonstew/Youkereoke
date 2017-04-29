import React from 'react';
import {render} from 'react-dom';

export class Video extends React.Component {
  constructor(props) {
    super(props);


  }

  render () {
    // if (typeof this.props.currentVideo !== 'object') {
    //   return (
    //     <div>
    //       <h1>Please select a video</h1>
    //     </div>
    //   )

    // } else {

      return (
        <div id="video">
          <iframe src={"https://www.youtube.com/embed/" + this.props.currentVideo.id.videoId + "?autoplay=1"} frameBorder="0" allowFullScreen></iframe>
        </div>

      )
    
  }




}


