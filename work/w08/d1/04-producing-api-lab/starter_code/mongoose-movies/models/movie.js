var mongoose = require('mongoose');
// shortcut to the mongoose.Schema function
var Schema = mongoose.Schema;

var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  rating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  cast: [String],
  nowShowing: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Movie', movieSchema);
