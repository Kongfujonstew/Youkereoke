import React from 'react';
import {render} from 'react-dom';

import {Video} from './video';
import {Queue} from './queue';
import {Search} from './search';


var data = require('./data.js');

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: 'testTerm',
      searchResults: data,
      currentVideo: {
        test: 'tst'
      },
      videoQueue: data //this will have to be primed correctly too
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
    var that = this;
    e.preventDefault();
    console.log('SYT called, this.state.term: ', this.state.term)
    var q = this.state.term +' karaoke';

    $.get('https://www.googleapis.com/youtube/v3/search', {
      url: 'https://www.googleapis.com/youtube/v3/search',
      key: 'AIzaSyDZQ48zhJFH1DPJBFJ-NQo5QKSWe4twumA',
      q: q,
      maxResults: 4,
      part: 'snippet',
      type: 'video',
      videoEmbeddable: true
    })
    .done(function(results) {
      that.setSearchResults(results);
      console.log(results);
    });
  }


  setSearchResults(results) {
    this.setState({
      searchResults: results.items
    });
  }


  handleTermChange (e) {
    console.log('HTC fired, e.target.value: ', e.target.value)
    this.setState({
      term: e.target.value
    })
  }

  handleVideoSearchResultsChange (results) {
    this.setState({
      searchResults: results
    })
  }

  handleSelectVideo (e) {
    console.log(e)
    // var newQueue = this.state.videoQueue.push(video);
    // this.setState({
    //   videoQueue: newQueue
    // })
  }

  handleVideoEnd () {

  }

  moveToNextVideo () {

  }


  render () {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <div>
          <Video 
            currentVideo={this.state.currentVideo}
            handleVideoEnd={this.handleVideoEnd.bind(this)}
          />

          <marquee id="marquee" behavior="scroll" direction="left">Live queue!!!    Add your own song to the queue real-time . . . Scroll down to search for your songs</marquee>

          <Queue 
            videoQueue={this.state.videoQueue} 
          />

          <Search 
            handleTermChange={this.handleTermChange.bind(this)}
            searchYouTube={this.searchYouTube.bind(this)}
            handleSelectVideo={this.handleSelectVideo.bind(this)}
            searchResults={this.state.searchResults}
          />
        </div>


      </div>
      )
  }

}

