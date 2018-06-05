/*

    Global variables defined below

*/

const board = document.querySelector('.board');
const resetButton = document.querySelector('.reset');
let state = new Array(9).fill(null);
let xsTurn = true;


/*

    Click event listener and event handler

*/

function handleClick(event) {
    if (computeWinner(state) || state[event.target.id]) {
        return;
    }
    state[event.target.id] = xsTurn ? 'X' : 'O';
    xsTurn = !xsTurn;
    render(state);
};

board.addEventListener('click', handleClick);


/*

    Render function called at each turn

*/

function render(state) {
    let cells = document.querySelectorAll('td'),
        winner = computeWinner(state),
        statusNode = document.getElementsByClassName("status")[0];
    
    if (winner) {
         statusNode.innerHTML = `Winner is ${winner}`;
    } else {
        statusNode.innerHTML = `Next player: ${(xsTurn ? 'X' : 'O')}`;
    }


    state.forEach(function(elem, index) {
        cells[index].innerHTML = state[index];
    });

    if (!state.includes(null)) {
        setTimeout(() => alert("Cat's game. Click the Reset Game button to start over."), 1000);
    }  
};


/*

    computeWinner returns "X", "O" or null if there is no winner

*/

function computeWinner(state) {
  let winner;
  const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ];

  for (var index=0; index<lines.length; index++) {
      let line = lines[index],
          [first, second, third] = line;
    if (state[first] && (state[first] === state[second]) && (state[first] === state[third])) {
        return state[first];
    }      
  }

  return null;
};

/*

    Reset game re-initializes state and calls the render method.

*/

function resetGame(event) {
    if (event.target.className === "reset") {
        state = new Array(9).fill(null);
        xsTurn = true;
        render(state);
    }
};

resetButton.addEventListener('click', resetGame);