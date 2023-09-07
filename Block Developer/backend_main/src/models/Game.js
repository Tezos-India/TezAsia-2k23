const { model, Schema } = require('mongoose');

const game = new Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },
  initialPlayer: {
    type: String,
    required: true,
  },
  finalPlayer: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0
  },
  initialNftId: {
    type: String,
  },
  finalNftId: {
    type: String,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  winner_name:{
    type: String,
  },
  loser_name:{
    type: String,
  },
  winner_addr:{
    type: String,
  },
  loser_addr:{
    type: String,
  }

});

const Game = model('Game', game);

module.exports = Game;
