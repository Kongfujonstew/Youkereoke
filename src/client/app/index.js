import React from 'react';
import {render} from 'react-dom';
import {Main} from './main.js';

class App extends React.Component {
  render () {
    return (
    <div id="main">
      < Main />
    </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
