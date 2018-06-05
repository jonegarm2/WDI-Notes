import React, {Component} from 'react';
import './TopScoresPage.css';
import topscoresAPI from '../../utils/topscoresAPI';
import ScoresTable from '../../components/ScoresTable/ScoresTable'
import {Link} from 'react-router-dom';

class TopScoresPage extends Component {
  constructor() {
    super();
    this.state = {
      scores: []
    }
  }
  componentDidMount() {
    topscoresAPI.index().then(scores =>
      this.setState({scores})
    );
  }
  render() {
    return (
      <div className='TopScoresPage'>
        <header className="header-footer">Top Scores</header>
        <Link to='/'>RETURN</Link><br />
        <ScoresTable scores={this.state.scores} />
      </div>
    );
  }
}

export default TopScoresPage;