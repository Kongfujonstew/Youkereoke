import React from 'react';
import {render} from 'react-dom';


export class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (!this.props.videoQueue.length) {
      return (
        <div id="queue">
          <h1>Please add a video to the queue</h1>
        </div>
      )
    }
    return (
      <div id="queue">
        <div className="flexContainer">
            <ul className="flexContainer">
              {this.props.videoQueue.map((video, index) =>
                <li className="video" key={index}>{video.snippet.title.slice(0,34)}
                  <img src={video.snippet.thumbnails.default.url}/>
                  <div>Name?</div>



                </li>
              )}
            </ul>
          )}
        </div>


      </div>



    )
  }

}