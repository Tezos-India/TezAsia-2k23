const mongoose = require("mongoose");
const Nft = require("./Nft");
const Game = require('./Game');
const Bid = require('./Bid');
const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: [true, "Please provide id"],
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide username"],
    trim: true
  },
  rank: {
    type: Number,
    default: 0
  },
  token: {
    type: Number,
    default: 0
  }
});

UserSchema.virtual('nfts', {
  ref: 'Nft',
  localField: '_id',
  foreignField: 'owner'
});

UserSchema.virtual('win', {
  ref: 'Game',
  localField: '_id',
  foreignField: 'winner'
});
UserSchema.virtual('loose', {
  ref: 'Game',
  localField: '_id',
  foreignField: 'loser'
});
UserSchema.virtual('bid', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'bidder'
});

UserSchema.methods.addToken = async function (tkn) {
  this.token += tkn;
};

UserSchema.methods.subToken = async function (tkn) {
  this.token -= tkn;
};

UserSchema.methods.won = async function () {
  this.rank += 2;
};


UserSchema.methods.lost = async function () {
  this.rank += 1;
};


UserSchema.methods.draw = async function () {
  this.rank += 1.5;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;