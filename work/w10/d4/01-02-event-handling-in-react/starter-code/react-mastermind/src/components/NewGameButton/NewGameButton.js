import React from 'react';

const NewGameButton = (props) => {
  return (
    <button  onClick={props.handleNewGame} 
    className="btn btn-default"
    style={{margin: 10}}
    >
      New Game
    </button>
  );
}

export default NewGameButton;
