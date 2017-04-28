import React from 'react';
import {render} from 'react-dom';

export class Video extends React.Component {
  constructor(props) {
    super(props);


  }

  render () {
    return (
    <div>
      <iframe src="https://www.youtube.com/embed/e-OPwNVFkq4?ecver=2" frameBorder="0" allowFullScreen></iframe>
    </div>
    // <div id="video">{this.props.currentVideo.test}</div>
    )
  }




}