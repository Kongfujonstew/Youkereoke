import React from 'react';
import {render} from 'react-dom';
import {Queue} from './queue';

export class Search extends React.Component {
  constructor(props) {
    super(props);
  }



  render () {
    return (
      <div>
        <h1>Add your songs here</h1>
        <form>
          <input 
            type="text" 
            //defaultValue="Search for karaoke versions of your favorite songs"
            onChange={this.props.handleTermChange}
          />
          <button 
            type="submit"
            onClick={this.props.searchYouTube}
          />
        </form>
          <div id="searchResults">
            <ul className="flexContainer"
            >

              {this.props.searchResults.map((video, index) =>
                <li className="video" key={index}
                  onClick={() => this.props.handleSelectVideo(video)}

                  >{video.snippet.title.slice(0,34)}
                  <img src={video.snippet.thumbnails.default.url}/>
                  <div>Name?</div>



                </li>
              )}
            </ul>

          </div>
      </div>
    )
  }



}