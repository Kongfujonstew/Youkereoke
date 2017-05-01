import React from 'react';
import {render} from 'react-dom';

import {Video} from './video';
import {Queue} from './queue';
import {Search} from './search';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: 'testTerm',
      messageText: '',
      message: '',
      searchResults: [],
      currentVideo: {},
      videoQueue: [],
    }

  }

  componentWillMount () {
    this.ajaxVideos('karaoke michael jackson');
    var that = this;
    socket.on('updateQueue', function(newQueue) {
      console.log('updateQueue received: ', newQueue)
      that.setState({
        videoQueue: newQueue,
      })
    })

    socket.on('ioDeliverNewMessage', function(message) {
      var messageText = message.username + ': ' + message.message;
      that.setState({
        message: messageText
      })

      setTimeout(function() {
        that.setState({
          message: ''
        })
      }, 11000)
    })

    socket.emit('socketRequestUpdate', function() {
      console.log('client connect db sync: ', currentQueue);
    })
  }

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

  handleVideoEnd () {
    ('HVE called')
    this.nextVideo();
  }

  nextVideo () {
    if (this.state.videoQueue.length === 1) {
      var newQueue = [];
      console.log('newQueue.length: ', newQueue.length)
      socket.emit('socketUpdateQueue', newQueue);
    }  if (this.state.videoQueue.length > 1) {
      var newQueue = Array.prototype.slice.call(this.state.videoQueue).slice(1);
      console.log('newQueue.length: ', newQueue.length)
      socket.emit('socketUpdateQueue', newQueue);
    }
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
  }

  handleMessageTextChange (e) {
    e.preventDefault();
    this.setState({
      messageText: e.target.value
    })
    console.log('HMTC fired, tm: ', this.state.messageText)
  }

  sendMessage (e) {
    e.preventDefault();
    var message = {
      username: window.username,
      message: this.state.messageText
    }
    console.log('sendMessage: ', message)
    socket.emit('socketSendMessage', message);
  }



  render () {

    if (window.username === 'main') {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <div>
          <Video 
            videoQueue={this.state.videoQueue}
            isPlayingNow={this.state.isPlayingNow}
            currentVideo={this.state.currentVideo}
            handleVideoEnd={this.handleVideoEnd.bind(this)}
          />

          <marquee id="marquee" behavior="scroll" direction="left">Live queue . . . Add songs at yko.herokuapp.com</marquee>

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

        <button
          onClick={this.nextVideo.bind(this)}
          >NextVideo
        </button>

        <h1 id="message">{this.state.message}</h1>

      </div>
      )

    }


    else if (window.username !== 'main') {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <div>Hi {window.username}!</div>
        <div>{this.state.videoQueue[0] ? 'Now singing: ' + this.state.videoQueue[0].username : 'Add a song and sing right now!'} </div>
        <div>Total songs ahead of you: {this.state.videoQueue.length}</div>
        <div>
          <Queue 
            videoQueue={this.state.videoQueue} 
          />
          <form id="messageForm">
            <div>Send {this.state.videoQueue[0] ? this.state.videoQueue[0].username : ''} an onscreen message:</div>
            <input 
              type="text" 
              onChange={this.handleMessageTextChange.bind(this)}
            />
            <button 
              type="submit"
              onClick={this.sendMessage.bind(this)}
            >Send Message</button>
            <div id="messageBlack">Current onscreen message: {this.state.message.length ? this.state.message : 'none'}</div>
          </form>

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
