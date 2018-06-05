import React from 'react';
import {Link} from 'react-router-dom';
import './GamePage.css';
import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import GameTimer from '../../components/GameTimer/GameTimer';

const GamePage = (props) => {

  // if winner, return num guesses, otherwise 0 (no winner)
  let lastGuess = props.guesses.length - 1;
  let winTries = props.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;

  return (
    <div className="GamePage">
      <div className="GamePage-game">
        <GameBoard
          guesses={props.guesses}
          colors={props.colors}
          handlePegClick={props.handlePegClick}
          handleScoreClick={props.handleScoreClick}
        />
        <div className="GamePage-controls">
          <ColorPicker
            handleColorSelection={props.handleColorSelection}
            colors={props.colors}
            selColorIdx={props.selColorIdx}
          />
          <GameTimer
            elapsedTime={props.elapsedTime}
            interval={1000}
            handleTick={props.handleTick}
            isTiming={props.isTiming}
          />
          <Link className='btn btn-default GamePage-button' to='/high-scores'>High Scores</Link>
          <Link className='btn btn-default GamePage-button' to='/settings'>Difficulty</Link>
          <NewGameButton handleNewGameClick={props.handleNewGameClick}/>
        </div>
      </div>
      <footer className='header-footer'>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
    </div>
  );

}

export default GamePage;