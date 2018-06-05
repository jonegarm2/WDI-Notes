import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';
// CSS stylesheets don't export anything, so just import the file:
import './GuessRow.css';

const GuessRow = (props) => {
  return (
    <div className="GuessRow">
      <div
        className="GuessRow-Num"
        style={{color: props.currentGuess ? 'black' : 'lightgrey'}}
      >
        {props.rowIdx + 1}
      </div>
      <GuessPegs code={props.guess.code} colors={props.colors} />
      {
        props.currentGuess ?
          <ScoreButton /> :
          <GuessScore score={props.guess.score} />
      }
    </div>
  );
}

export default GuessRow;
