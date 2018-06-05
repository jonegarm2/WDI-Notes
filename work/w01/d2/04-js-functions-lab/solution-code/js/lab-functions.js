// 1.
function maxOfTwoNumbers(x, y) {
  if (x >= y) {
    return x;
  } else {
    return y;
  }
}

// using ternary operator instead of if-else
// function maxOfTwoNumbers(x, y) {
//   return (x >= y) ? x : y;
// }

console.log(maxOfTwoNumbers(3, 9));



// 2.
var maxOfThree = function(x, y, z) {
  if (x >= y && x >= z) {
    return x;
  } else if (y >= x && y >= z) {
    return y;
  } else {
    return z;
  }
};

console.log(maxOfThree(5, 10, 1));

// 3.
function isCharAVowel(s) {
  s = s.toLowerCase();
  return ('aeiouy'.indexOf(s) > -1);
  // or use ES2015's string.includes
  // return 'aeiouy'.includes(s);
}

console.log(isCharAVowel('b'));

// 4.
var sumArray = function(arr) {
  var sum = 0;
  // the forEach method rocks!
  arr.forEach(function(e) {
    sum += e;
  });
  return sum;
  // later, you will learn this is a good use case for the reduce method
};

console.log(sumArray([5, 10, 1]));

// 5.
function multiplyArray(arr) {
  var product = 1;
  // feel free to use a for loop like this if you're not cool
  for (var i = 0; i < arr.length; i++) {
    product *= arr[i];
  }
  return product;
}

console.log(multiplyArray([5, 10, 2]));

// 6.
var numArgs = function() {
  return arguments.length;
};

console.log(numArgs('test', true, 5));

// 7.
function reverseString(s) {
  var arr = s.split('');
  // arr = Array.from(s);  <-- another way to create an array
  return arr.reverse().join('');
}

console.log(reverseString('rockstar'));

// 8.
var longestWordLength = function(arr) {
  var longest = 0;
  // using forEach this time!
  arr.forEach(function(s) {
    if (s.length > longest) longest = s.length;
  });
  return longest;
};

console.log(longestWordLength(['touch', 'me', 'in', 'the', 'morning']));

// 9.
var stringsLongerThan = function(arr, len) {
  // now we're talking!
  return arr.filter(function(s) {
    return (s.length > len);
  });
};

console.log(stringsLongerThan(['touch', 'me', 'in', 'the', 'morning'], 2));
