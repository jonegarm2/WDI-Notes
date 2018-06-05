/*

Cross: compute the cross product of two arrays

*/

function cross(arr1, arr2) {
    let cross = [];
    arr1.forEach(function(elem1) {
        arr2.forEach(function(elem2) {
            cross.push(`${elem1}${elem2}`)
        })
    })
    return cross;
}

//shuffle function on Array Prototype

Array.prototype.shuffle = function() {
    for (let index = this.length-1; index>0, index--) {
        let j = Math.floor(Math.random() * index+1)
        let tmp = this[j];
        this[j] = this[index];
        this[index] = this[j];
    }
}

let x = [1,2,3,4,5,6,7,8,9];

console.log(x.shuffle());
