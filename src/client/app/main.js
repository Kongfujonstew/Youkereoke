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
      currentVideo: {},
      videoQueue: [] 
    }

  }


//socket io listeners and init new client with currentQueue
  componentDidMount () {
    this.ajaxVideos('gnr karaoke');
    var that = this;
    socket.on('updateQueue', function(newQueue) {
      console.log('updateQueue received')
      that.setState({
        videoQueue: newQueue,
        currentVideo: newQueue[0]
      })
    })
    $.get('http://localhost:3000/videoqueue', function(currentQueue) { //CHANGE ME TO DEPLOY
      console.log('newQueue: ', currentQueue);
      that.setState({
        videoQueue: currentQueue,
        // currentVideo: currentQueue[0] //this breaks something . . 
      })
    })
  }

//Ajax calls
  searchYouTube (e) {
    var that = this;
    e.preventDefault();
    console.log('SYT called, this.state.term: ', this.state.term)
    var q = this.state.term +' karaoke';
    this.ajaxVideos(q);
  }


  ajaxVideos (query) {
    var that = this;
    $.get('https://www.googleapis.com/youtube/v3/search', {
      url: 'https://www.googleapis.com/youtube/v3/search',
      key: 'AIzaSyDZQ48zhJFH1DPJBFJ-NQo5QKSWe4twumA',
      q: query,
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
    console.log('test fired');
  }

  moveToNextVideo () {

  }

  dequeueVideo () {
    var newQueue = this.state.videoQueue.shift();
    socket.emit('addSongToQueue', newQueue);
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
    video.username = window.username
    var newQueue = this.state.videoQueue;
    newQueue.push(video);

    socket.emit('addSongToQueue', newQueue);

    if (!this.state.currentVideo.kind) {
      this.setState({
        currentVideo: this.state.videoQueue[0]
      })
    }
  }



//render
  render () {

    if (window.username === 'main') {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <div>
          <Video 
            currentVideo={this.state.currentVideo}
            handleVideoEnd={this.handleVideoEnd.bind(this)}
          />

          <marquee id="marquee" behavior="scroll" direction="left">Live queue . . . Add your songs at yko.herokuapps.com</marquee>

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

        <button onClick={this.dequeueVideo.bind(this)}>Next Song</button>
      </div>
      )

    }


    else if (window.username !== 'main') {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <h1 id="username"> Hi {window.username}!</h1>
        <div>Now singing: {this.state.currentVideo.username} </div>
        <div>

        <h1>Upcoming</h1>
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

}

