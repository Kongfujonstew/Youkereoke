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
      messageText: '',
      searchResults: [],
      currentVideo: {},
      videoQueue: [],
      isPlayingNow: false,
      messages: {username: 'jon',
        message: 'hey there'} 
    }

  }


//socket io listeners and init new client with currentQueue
  componentWillMount () {
    this.ajaxVideos('gnr karaoke');
    var that = this;
    socket.on('updateQueue', function(newQueue) {
      console.log('updateQueue received, newQueue length: ', newQueue.length)
      that.setState({
        videoQueue: newQueue,
      })
    })

    socket.on('ioDeliverNewMessage', function(message) {
      var messageText = message.username + ': ' + message.message;
      that.setState({
        messageText: messageText
      })

      setTimeout(function() {
        that.setState({
          messageText: ''
        })
      }, 15000)
    })

    socket.emit('socketRequestUpdate', function(currentQueue) {
      that.setState({
        videoQueue: currentQueue,
      })   
    })

    window.addEventListener('ended', function() {
      console.log('end fired yea bio')
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
    this.nextVideo();
  }

  nextVideo () {
    if (this.state.videoQueue.length >=2) {
      console.log('nextVideo thriggered')
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



//render
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

          <marquee id="marquee" behavior="scroll" direction="left">Live queue . . . Add your songs at yko.herokuapp.com</marquee>

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

        <div id="message">{this.state.messageText}</div>

      </div>
      )

    }


    else if (window.username !== 'main') {
    return (
      <div id="main">
        <h1 id="title">Youkeoroke</h1>
        <div>Hi {window.username}!</div>
        <div>Now singing: {this.state.videoQueue[0] ? this.state.videoQueue[0].username : ''} </div>
        <div>Total songs ahead in line: {this.state.videoQueue.length}</div>
        <div>

        <div>Upcoming</div>
          <Queue 
            videoQueue={this.state.videoQueue} 
          />
          <form>
            <input 
              type="text" 
              onChange={this.handleMessageTextChange.bind(this)}
            />
            <button 
              type="submit"
              onClick={this.sendMessage.bind(this)}
            >Send Message</button>
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

