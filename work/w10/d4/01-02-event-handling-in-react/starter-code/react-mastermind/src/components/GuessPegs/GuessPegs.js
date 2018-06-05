import React from 'react';
import GuessPeg from '../GuessPeg/GuessPeg';
import './GuessPegs.css';

const GuessPegs = (props) => {
  return (
    <div className="GuessPegs">
      <GuessPeg color={props.colors[props.code[0]]}
      currentGuess={props.currentGuess}
      pegIdx={0}
      handlePegClick={props.handlePegClick}
      />
      <GuessPeg color={props.colors[props.code[1]]}
      currentGuess={props.currentGuess}
      pegIdx={1}
      handlePegClick={props.handlePegClick}
      />
      <GuessPeg color={props.colors[props.code[2]]}
      currentGuess={props.currentGuess}
      pegIdx={2}
      handlePegClick={props.handlePegClick}
      />
      <GuessPeg color={props.colors[props.code[3]]}
      currentGuess={props.currentGuess}
      pegIdx={3}
      handlePegClick={props.handlePegClick}
      />
    </div>
  );
}

export default GuessPegs;
