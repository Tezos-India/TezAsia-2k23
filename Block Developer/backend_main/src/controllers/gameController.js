const Nft = require('../models/Nft');
const Game = require('../models/Game');
const ErrorResponse = require("../utils/errorResponse");
const User = require('../models/User');
const Bid =require('../models/Bid');

exports.getAllGames = async (req, res, next) => {
  var srt = 0;
  var lim = 0;
  var skp = 0;
  const match = {};
  let params = new URLSearchParams(req.query);
  if (req.query.sort) {
    srt = req.query.sort;
    params.delete('sort');
  }
  if (req.query.limit) {
    lim = req.query.limit;
    params.delete('limit');
  }
  if (req.query.skip) {
    skp = req.query.skip;
    params.delete('skip');
}
  for (const [key, value] of (params)) {
    match[key] = value;
  }
  try {
    const games = await Game.find(match)
      .sort(srt || 'gameId')
      .limit(Number(lim))
      .skip(Number(skp));
    if (!games) {
      return next(new ErrorResponse("Games Not Found", 404));
    }
    res.send(games);
  } catch (e) {
    next(e);
  }
};





exports.postHessStaking = async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return next(new ErrorResponse("Invalid Parameters", 400));
  }
  try {
    await Game.create({
      initialPlayer: data.args[0],
      finalPlayer: data.args[1],
      amount: parseInt(data.args[2].hex),
      gameId: parseInt(data.args[3].hex),
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};



exports.postNftStaking = async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return next(new ErrorResponse("Invalid Parameters", 400));
  }
  try {
    await Game.create({
      initialPlayer: data.args[0],
      finalPlayer: data.args[1],
      initialNftId: parseInt(data.args[2].hex),
      finalNftId: parseInt(data.args[3].hex),
      gameId: parseInt(data.args[4].hex),
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};


exports.postHessWin = async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return next(new ErrorResponse("Invalid Parameters", 400));
  }
  try {
    const game =await Game.findOne({
      gameId:parseInt(data.args[3].hex)
    });
    if (!game) {
      return next(new ErrorResponse("Game Not Found", 404));
    }
    
    if (data.args[0] === data.args[1]) {
      const user0 = await User.findOne({
        address: game.initialPlayer
      });
      const user1 = await User.findOne({
        address: game.finalPlayer
      });
      const user2 = await User.findOne({
        address: data.args[0]
      });
      if (!user1 || !user0||!user2) {
        return next(new ErrorResponse("Users Not Found", 404));
      }
      game.winner=user2._id;
      game.winner_name=user2.username;
      game.winner_addr=user2.address;
      game.loser=user2._id;
      game.loser_name=user2.username;
      game.loser_addr=user2.address;
      await game.save();
      await user0.draw();
      await user1.draw();
      await user0.save();
      await user1.save();
      res.sendStatus(200);
    } else {
      const user0 = await User.findOne({
        address: data.args[0]
      });
      const user1 = await User.findOne({
        address: data.args[1]
      });
      if (!user1 || !user0) {
        return next(new ErrorResponse("Users Not Found", 404));
      }
      game.winner=user0._id;
      game.winner_name=user0.username;
      game.winner_addr=user0.address;
      game.loser=user1._id;
      game.loser_name=user1.username;
      game.loser_addr=user1.address;
      await user0.addToken(parseInt(data.args[2].hex));
      await user1.subToken(parseInt(data.args[2].hex));
      await user0.won();
      await user1.lost();
      await game.save();
      await user0.save();
      await user1.save();
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};




exports.postNftWin = async (req, res, next) => {
  const data = req.body;
  if (!data) {
    return next(new ErrorResponse("Invalid Parameters", 400));
  }
  try {
    const game =await Game.findOne({
      gameId:parseInt(data.args[4].hex)
    });
    if (!game) {
      return next(new ErrorResponse("Game Not Found", 404));
    }
    if (data.args[0] === data.args[1]) {
      const user0 = await User.findOne({
        address: game.initialPlayer
      });
      const user1 = await User.findOne({
        address: game.finalPlayer
      });
      const user2 = await User.findOne({
        address: data.args[0]
      });
      if (!user1 || !user0||!user2) {
        return next(new ErrorResponse("Users Not Found", 404));
      }
      game.winner=user2._id;
      game.winner_name=user2.username;
      game.winner_addr=user2.address;
      game.loser=user2._id;
      game.loser_name=user2.username;
      game.loser_addr=user2.address;
      await game.save();
      await user0.draw();
      await user1.draw();
      await user0.save();
      await user1.save();
      res.sendStatus(200);
    } else {
      const user0 = await User.findOne({
        address: data.args[0]
      });
      const user1 = await User.findOne({
        address: data.args[1]
      });
      if (!user1 || !user0) {
        return next(new ErrorResponse("Users Not Found", 404));
      }
      game.winner=user0._id;
      game.winner_name=user0.username;
      game.winner_addr=user0.address;
      game.loser=user1._id;
      game.loser_name=user1.username;
      game.loser_addr=user1.address;
      await Nft.findOneAndUpdate({ assetId: parseInt(data.args[3].hex) }, { owner: user0._id });
      await user0.won();
      await user1.lost();
      await game.save();
      await user0.save();
      await user1.save();
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};
