import React from 'react';
import {render} from 'react-dom';

import {Video} from './video';
import {Queue} from './queue';
import {Search} from './search';


var ajax = require('./ajax.js');

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: 'testTerm',
      currentVideo: {
        test: 'tst'
      },
      videoQueue: ['hi', 'goodbye']
    }

  }

  componentDidMount () {
    socket.on('queueUpdate', function(videoQueue) {
      this.setState({
        videoQueue: videoQueue 
      })
    })
  }

  searchYouTube (e) {
    e.preventDefault();
    ajax.searchYouTube(this.state.term)
  }

  handleTermChange (e) {
    console.log('HTC fired, e.target.value: ', e.target.value)
    this.setState({
      term: e.target.value
    })
  }


  render () {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <h1 id="goToSearch">I Want to Sing Something!</h1>
        <div>
          <Video 
            currentVideo={this.state.currentVideo}
          />

          <Queue 
            videoQueue={this.state.videoQueue} 
          />

          <Search 
            handleTermChange={this.handleTermChange.bind(this)}
            searchYouTube={this.searchYouTube.bind(this)}
          />
        </div>


      </div>
      )
  }

}

