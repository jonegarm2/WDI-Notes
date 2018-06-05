require('dotenv').config();
require('./config/database');
var Score = require('./models/score');

Score.remove({}).then(() => {
  Score.create([
    {initials: 'ABC', numGuesses: 8, seconds: 6999},
    {initials: 'bac', numGuesses: 5, seconds: 3151},
    {initials: 'XYZ', numGuesses: 8, seconds: 5512},
    {initials: 'JD', numGuesses: 7, seconds: 4567}
  ]).then(() => {
    process.exit();
  });
})