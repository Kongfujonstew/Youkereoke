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
      currentVideo: data[0],
      videoQueue: [] 
    }

  }


//socket io listeners and init new client with currentQueue
  componentWillMount () {
    var that = this;
    socket.on('updateQueue', function(newQueue) {
      console.log('updateQueue received')
      that.setState({
        videoQueue: newQueue 
      })
    })
    $.get('http://localhost:3000/videoqueue', function(currentQueue) { //CHANGE ME TO DEPLOY
      console.log('newQueue: ', currentQueue)
      that.setState({
        videoQueue: currentQueue
      })
    })
  }

//Ajax calls
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


  //currentVideo
  handleVideoEnd () {

  }

  moveToNextVideo () {

  }

//Search and update queue
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

  handleSelectVideo (video) {
    var newQueue = this.state.videoQueue;
    newQueue.push(video)

    socket.emit('addSongToQueue', newQueue)
    // this.setState({
    //   videoQueue: newQueue
    // })
  }

//render
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

