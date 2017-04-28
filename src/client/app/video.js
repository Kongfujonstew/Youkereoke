import React from 'react';
import {render} from 'react-dom';

export class Video extends React.Component {
  constructor(props) {
    super(props);


  }

  render () {
    return (
    <div id="video">{this.props.currentVideo.test}</div>
    )
  }




}