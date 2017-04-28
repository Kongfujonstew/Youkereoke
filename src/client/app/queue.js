import React from 'react';
import {render} from 'react-dom';


export class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="queue">
        <ul className="flexContainer">Videos
          {this.props.videoQueue.map((video, index) =>
            <li className="video" key={index}>{video}</li>
          )}
        </ul>


      </div>



    )
  }

}