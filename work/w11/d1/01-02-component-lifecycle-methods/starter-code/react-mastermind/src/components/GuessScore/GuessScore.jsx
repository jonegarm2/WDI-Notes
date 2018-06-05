import React from 'react';
import './GuessScore.css';

const GuessScore = (props) => {
  let scores = ('P'.repeat(props.score.perfect) + 'A'.repeat(props.score.almost) +
    'I'.repeat(4 - props.score.perfect - props.score.almost)).split('');

  let baseStyle = {
    width: 10,
    height: 10,
    margin: 1,
    border: '2px solid',
    borderRadius: '50%'
  };

  let pegStyles = {
    'P': {
      borderColor: 'black',
      backgroundColor: 'black'
    },
    'A': {
      borderColor: 'black',
      backgroundColor: 'white'
    },
    'I': {
      borderColor: 'white',
      backgroundColor: 'lightgrey'
    }
  };

  return (
    <div className="GuessScore">
      {scores.map((score, idx) =>
        <div key={idx} 
             style={Object.assign({}, baseStyle, pegStyles[score])}
        />
      )}
    </div>
  );
}

export default GuessScore;
