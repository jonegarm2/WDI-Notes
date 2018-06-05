import React from 'react';
import './GuessPeg.css';

const GuessPeg = (props) => {
  let style = {
    backgroundColor: props.color,
    border: props.color || '1px dashed grey',
    cursor: props.currentGuess && 'pointer'
  };

  return (
    <div className='GuessPeg'
      style={style}
      onClick={() => props.handlePegClick(props.pegIdx)} />
  );
}

export default GuessPeg;
