import React from 'react';
import {Link} from 'react-router-dom';
import './HighScoresPage.css';

const HighScoresPage = (props) => {

  const scoreRows = props.scores.map((score, idx) => (
    <tr key={idx}>
      <td><span className="badge">{idx + 1}</span></td>
      <td>{score.initials}</td>
      <td>{score.numGuesses}</td>
      <td>{score.seconds}</td>
    </tr>
  ));

  return (
    <div className='HighScores'>
      <header className='header-footer'>High Scores</header>
      {props.scores.length ? 
        <table className="table HighScores-table text-info">
          <thead>
            <tr><th width={80}>#</th><th width={100}>Initials</th><th width={100}>Guesses</th><th>Seconds</th></tr>
          </thead>
          <tbody>
            {scoreRows}
          </tbody>
        </table>
        :
        <h4 className='text-info'>No High Scores Yet</h4>
      }
      <div>
        <Link className='HighScores-cancel btn btn-default btn-sm' to='/' style={{marginTop: 40}}>Back to Game</Link>
      </div>
    </div>
  );
};

export default HighScoresPage;
