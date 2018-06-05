var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/thirsty-mongoose');

var con = mongoose.connection;

con.once('open', () => console.log(`Connected to MongoDB on ${con.host}:${con.port}`));