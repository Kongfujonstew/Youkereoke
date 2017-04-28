import React from 'react';
import {render} from 'react-dom';

import {Video} from './video';
import {Queue} from './queue';


var ajax = require('./ajax.js');

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: {
        test: 'tst'
      },
      videoQueue: ['hi', 'goodbye']
    }

  }

  render () {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <div>
          <Video currentVideo={this.state.currentVideo}/>
          <Queue videoQueue={this.state.videoQueue} />

        </div>


      </div>
      )
  }

}

