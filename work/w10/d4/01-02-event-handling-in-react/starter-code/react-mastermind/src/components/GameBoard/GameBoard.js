import React from 'react';
import GuessRow from '../GuessRow/GuessRow';
import './GameBoard.css';

const GameBoard = (props) => {
  return (
    <div className="GameBoard">
      {props.guesses.map((guess, idx) => 
        <GuessRow
          guess={guess}
          colors={props.colors}
          rowIdx={idx}
          currentGuess={idx === (props.guesses.length - 1)}
          key={idx}
          handlePegClick={props.handlePegClick}
          handleScoreButton={props.handleScoreButton}
        />
      )}
    </div>
  );
}

export default GameBoard;
