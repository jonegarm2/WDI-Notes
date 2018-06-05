import React, { PureComponent } from "react";
import "./App.css";
// Must import components used in the JSX
import GameBoard from "./components/GameBoard/GameBoard";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import NewGameButton from "./components/NewGameButton/NewGameButton";

let headFootStyle = {
 height: 50,
 padding: 10,
 margin: "15px 0",
 color: "grey",
 fontSize: 18,
 textAlign: "center"
};

let colors = ["#ABE4FF", "#DDFFAB", "#FFDAAB", "#FFABAB"];

class App extends PureComponent {
 constructor(props) {
   super(props);
   this.state = this.getInitialState()
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
   let lastGuess = this.state.guesses.length - 1;
   if (this.state.guesses[lastGuess].score.perfect !== 4) return 0; 
   return this.state.code.join() === this.state.guesses[lastGuess].code.join() ? lastGuess + 1 : 0;
 }

 /* Event Handlers */

 handleColorSelection = (colorIdx) => {
   this.setState({selColorIdx: colorIdx});
 }

 handleNewGame = () => {
   this.setState(this.getInitialState())
 }

 handlePegClick = (pegIdx) => {
   let guessIdx = this.state.guesses.length - 1;
   let code = [...this.state.guesses[guessIdx].code];
   code[pegIdx] = this.state.selColorIdx;
   let guess = {...this.state.guesses[guessIdx], code: code};
   let guesses = [...this.state.guesses];
   guesses[guessIdx] = guess;
   this.setState({guesses: guesses});
 }

 handleScoreButton = () => {
   let perfect = 0;
   let almost = 0;
   let guessIdx = this.state.guesses.length - 1;
   let guessCode = [...this.state.guesses[guessIdx].code];
   let secCode = [...this.state.code];

   guessCode.forEach((code, i) => {
     if (secCode[i] === code) {
       perfect++;
       guessCode[i] = secCode[i] = null;
     }
   });
   
   if (perfect !== 4) {
     guessCode.forEach((code) => {
       if (code === null) return;
       let idx = secCode.indexOf(code);
       if (idx >= 0) {
         almost++;
         secCode[idx] = null;
       }
     });
     this.setState({
       guesses: [...this.state.guesses, this.getNewGuess()]
     })
   }
   this.setState(prevState => {
     let guesses = [...prevState.guesses];
     let score = {...guesses[guessIdx].score};
     score.perfect = perfect;
     score.almost = almost;
     guesses[guessIdx].score = score;
     return {guesses: guesses};
   })
 }

 /* Lifecycle Methods */

 render() {
   let winTries = this.getWinTries();
   return (
     <div className='App'>
       <header style={headFootStyle}>R E A C T &nbsp;&nbsp; M A S T E R M I N D</header>
       <div className='App-game'>
         <GameBoard
           guesses={this.state.guesses}
           colors={this.state.colors}
           handlePegClick={this.handlePegClick}
           handleScoreButton={this.handleScoreButton}
         />
         <div className='App-controls'>
           <ColorPicker
             selColorIdx={this.state.selColorIdx}
             colors={this.state.colors}
             handleColorSelection={this.handleColorSelection}
           />
           <NewGameButton handleNewGame={this.handleNewGame} />
         </div>
       </div>
       <footer style={headFootStyle}>{(winTries ? `You Won in ${winTries} Guesses!` : "Good Luck!")}</footer>
     </div>
   );
 }
}

export default App;
 