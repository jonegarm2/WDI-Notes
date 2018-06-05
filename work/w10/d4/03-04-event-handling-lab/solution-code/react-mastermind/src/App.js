import React, { Component } from 'react';
import './App.css';
// Must import components used in the JSX
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import NewGameButton from './components/NewGameButton/NewGameButton';

let headFootStyle = {
  height: 50,
  padding: 10,
  margin: '15px 0',
  color: 'grey',
  fontSize: 18,
  textAlign: 'center'
};

let colors = ['#155765', '#57652A', '#AB9353', '#4D2C3D'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      colors,
      code: this.genCode(colors.length),
      selColorIdx: 0,
      guesses: [this.getNewGuess()]
    };
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode(size) {
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * size));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }

  /*---------- Callback Methods ----------*/

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx});
  }

  handleNewGameClick = () => {
    this.setState(this.getInitialState());
  }

  handlePegClick = (pegIdx) => {
    let currentGuessIdx = this.state.guesses.length - 1;

    // Always replace objects/arrays with NEW versions
    let guessesCopy = [...this.state.guesses];
    let codeArrCopy = [...guessesCopy[currentGuessIdx].code];

    // Update the NEW array
    codeArrCopy[pegIdx] = this.state.selColorIdx;

    // Update the NEW guesses array
    guessesCopy[currentGuessIdx].code = codeArrCopy;

    // Update state with the NEW guesses array
    this.setState({
      guesses: guessesCopy
    });
  }

  handleScoreClick = () => {
    let currentGuessIdx = this.state.guesses.length - 1;

    // Computing the score will modify the guessed code and the
    // secret code, therefore create copies of the originals
    let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code];
    let secretCodeCopy = [...this.state.code];

    let perfect = 0, almost = 0;

    // First pass computes number of "perfect"
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        // ensure does not match again
        guessCodeCopy[idx] = secretCodeCopy[idx] = null;
      }
    });

    // Second pass computes number of "almost"
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        secretCodeCopy[foundIdx] = null;
      }
    });

    // State must only be updated with NEW objects/arrays
    let guessesCopy = [...this.state.guesses];

    // Set scores
    guessesCopy[currentGuessIdx].score.perfect = perfect;
    guessesCopy[currentGuessIdx].score.almost = almost;

    // Add a new guess if not a winner
    if (perfect !== 4) guessesCopy.push(this.getNewGuess());

    // Finally, update the state with the NEW guesses array
    this.setState({
      guesses: guessesCopy
    });
  }

  render() {
    let winTries = this.getWinTries();
    return (
      <div className="App">
        <header style={headFootStyle}>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
        <div className="App-game">
          <GameBoard
            guesses={this.state.guesses}
            colors={this.state.colors}
            handlePegClick={this.handlePegClick}
            handleScoreClick={this.handleScoreClick}
          />
          <div className="App-controls">
            <ColorPicker
              handleColorSelection={this.handleColorSelection}
              colors={this.state.colors}
              selColorIdx={this.state.selColorIdx}
            />
            <NewGameButton handleNewGameClick={this.handleNewGameClick}/>
          </div>
        </div>
        <footer style={headFootStyle}>{(winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!')}</footer>
      </div>
    );
  }
}

export default App;
