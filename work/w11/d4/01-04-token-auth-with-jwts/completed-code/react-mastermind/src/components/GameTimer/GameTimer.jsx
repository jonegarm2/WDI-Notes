import React, {Component} from 'react';
import './GameTimer.css';

class GameTimer extends Component {

  formatElapsedTime(seconds) {
    function pad(val, places) {
      var s = val.toString();
      return '0'.repeat(places - s.length) + s;
    } 
    return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
  }

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    this.timerId = setInterval(() => {
      if (this.props.isTiming) this.props.handleTick();
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className='GameTimer'>{this.formatElapsedTime(this.props.elapsedTime)}</div>
    );
  }

}

export default GameTimer;
