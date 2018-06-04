const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameName: String,
  price: Number,
  description: String,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('game', gameSchema);
