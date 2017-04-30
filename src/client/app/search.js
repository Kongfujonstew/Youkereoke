import React from 'react';
import {render} from 'react-dom';
import {Queue} from './queue';

export class Search extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {
    return (
      <div id="search">
        <form>
          <div>Search and add your song:</div>
          <input 
            type="text" 
            //defaultValue="Search for karaoke versions of your favorite songs"
            onChange={this.props.handleTermChange}
          />
          <button 
            type="submit"
            onClick={this.props.searchYouTube}
          >Search now</button>
        </form>
          <div id="searchResults">
            <div className="flexContainer"
            >

              {this.props.searchResults.slice(0,4).map((video, index) =>
                <div className="video" key={index}
                  onClick={() => this.props.handleSelectVideo(video)}

                  >
                  <div>{video.snippet.title.slice(0,45)}</div>
                  <img src={video.snippet.thumbnails.default.url}/>



                </div>
              )}
            </div>

          </div>
      </div>
    )
  }



}