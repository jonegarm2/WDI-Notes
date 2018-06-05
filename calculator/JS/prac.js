/*----- constants -----*/
const ops = {
    '÷': function(a,b) {return a / b;},
    '×': function(a,b) {return a * b;},
    '-': function(a,b) {return a - b;},
    '+': function(a,b) {return a + b;}
};


/*----- app's state (variables) -----*/

var firstNum, operator, input, result;




/*----- cached element references -----*/
var displayEl = document.querySelector('.display');



/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleClick);





/*----- functions -----*/
init();
render();

function handleClick(e) {
    if (e.target.className === 'display') return;
    var cont = e.target.textContent;
    switch (cont) {
        case 'AC':
            init();
            render();
            break;
        case '=':
            if (!input) return;
            result = operator(parseFloat(firstNum), parseFloat(input));
            break;
        case '÷':
        case '×':
        case '-':
        case '+':
            if(!input) return;
            firstNum = input;
            input = '';
            operator = ops[cont]; 

            break;
        
        case '.':
            input += input.includes('.') ? '' : '.';
            break;
        default:
            input += cont;
    }
   render();
   if (result) init();
}

function init() {
    firstNum = operator = result = null;
    input = '';
};

function render() {
    var text;
    if (result) {
        text = result;
    } else {
      text = input || '0';
    }
    displayEl.textContent = text;
}

