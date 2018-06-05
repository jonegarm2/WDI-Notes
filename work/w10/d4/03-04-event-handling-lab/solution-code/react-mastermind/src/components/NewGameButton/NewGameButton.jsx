import React from 'react';

const NewGameButton = (props) => {
  return (
    <button 
      className="btn btn-default"
      style={{margin: 10}}
      onClick={props.handleNewGameClick}
    >
      New Game
    </button>
  );
}

export default NewGameButton;
