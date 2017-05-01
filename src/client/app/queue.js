import React from 'react';
import {render} from 'react-dom';


export class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (this.props.videoQueue.length <= 1) {
      return (
        <div id="queue">
          <div className="flexContainer">
            <div>Queue empty.  Please add a video</div>
          </div>
        </div>
      )} 
    return (
      <div id="queue">
        <div className="flexContainer">
            <div className="flexContainer">
              {this.props.videoQueue.slice(1,5).map((video, index) =>
                <div className="video" key={index}>
                  <div>{index+1}) {video.snippet.title.slice(0,35)}</div>
                  <img src={video.snippet.thumbnails.default.url}/>
                  <div>{video.username}</div>



                </div>
              )}
            </div>
        </div>


      </div>



    );
  }

}