import React from 'react';

const ScoreButton = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.handleScoreClick}
      className="btn btn-default"
      style={{padding: '2px 6px'}}
    >
      ✔
    </button>
  );
}

export default ScoreButton;
