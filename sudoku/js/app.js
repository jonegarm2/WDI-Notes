//constants

let state ={};


//Initialization


let table = document.querySelector('table');

table.innerHTML = `<tr>${'<td><input type="text"></input></td>'.repeat(9)}</tr>`.repeat(9); 
let cellClassNames = cross(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], ['1', '2', '3', '4', '5', '6', '7', '8', '9']);

// given the rules of sudoku
cellClassNames.forEach(function(cell) {
    state[cell] = {value: null, possibleValues: [1,2,3,4,5,6,7,8,9] }
})

//A
function randomlyPopulateRow(rowName) {
    let shuffled = [1,2,3,4,5,6,7,8,9].shuffle();
    let index = 0;

    for (let key in state) {
        if (key[0] === rowName) {
            state[key].value = shuffled[index];
            state[key].possibleValues = state[key].possibleValues.splice(index)
            index++
        }
    }

}

randomlyPopulateRow("A")

//B remove value from possibleValues
//1. the numbers 1 through 9  must appear in each row/column at most once
//2. the numbers 1 through 9 must appear in each matrix at most once

//document.querySelectorAll('td').forEach(function(td,index) {
  //  td.className = cellClassNames[index];
//})
//console.log()


