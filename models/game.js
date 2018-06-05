const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  year: String,
  image: String
}, {
  timestamps: true
});

module.exports = mongoose.model('game', gameSchema);
