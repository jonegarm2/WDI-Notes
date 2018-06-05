import React from 'react';

const ScoresTable = (props) => {

  function formatElapsedTime(seconds) {
    function pad(val, places) {
      var s = val.toString();
      return '0'.repeat(places - s.length) + s;
    } 
    return `${pad(Math.floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
  }

  return (
    <table className='table table-striped table-bordered'>
      <thead>
        <tr>
          <th>Player</th>
          <th className='text-center'># Guesses</th>
          <th className='text-center'>Time</th>
        </tr>
      </thead>
      <tbody>
        {props.scores.map(score => 
          <tr key={score.player}>
            <td>{score.player}</td>
            <td className='text-center'>{score.guesses}</td>
            <td className='text-center'>{formatElapsedTime(score.seconds)}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ScoresTable;