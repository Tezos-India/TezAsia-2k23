const ErrorResponse = require("../utils/errorResponse");
const fetch = require('cross-fetch');
const User = require('../models/User');
const Bid =require('../models/Bid');
const Nft = require('../models/Nft');
const BASE_URI = process.env.BASE_URI;


exports.getAllUsers = async (req, res, next) => {
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
      const users = await User.find(match)
          .sort(srt || '-rank')
          .limit(Number(lim))
          .skip(Number(skp));
      if (!users) {
          return next(new ErrorResponse("Users Not Found", 404));
      }
      res.send(users);
  } catch (e) {
      next(e);
  }
};


exports.register = async (req, res, next) => {
    const {address, username } = req.body;
    try {
      const user = await User.create({
        address,
        username
      });
      res.send(user);
    } catch (err) {
      next(err);
    }
};


exports.search=async (req, res, next) => {
  const { address } = req.body;
  try {
    const user = await User.findOne({
      address
    });
    if(!user){
      res.send({exist:"false"});
    }else{
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};





  exports.login = async (req, res, next) => {
    const { address, username } = req.body;
    if (!address) {
      return next(new ErrorResponse("Please provide valid login credentials", 400));
    }
    try {
      const user = await User.findOne({ address })
      .populate({
        path:'nfts',
    })
    .populate({
      path:'win',
      })
  .populate({
    path:'loose',
    })
    .populate({
      path:'bid'
    })
    .exec();
      const nfts=user.nfts;
      const win=user.win;
      const loose=user.loose;
      const bid=user.bid;
      if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
      res.status(200).json({ success: true,user,nfts,win,loose,bid});
    } catch (err) {
      next(err);
    }
  };


exports.postHessBought = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
    const user = await User.findOne({
        address:data.args[1]
    });
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }

        await user.addToken(parseInt(data.args[0].hex));
        await user.save();
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};



exports.postHessMint = async (req, res, next) => {
  const data  = req.body;
  if (!data) {
      return next(new ErrorResponse("Invalid Parameters", 400));
  }
  try {
  const user = await User.findOne({
      address:data.args[1]
  });
  if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

      await user.addToken(parseInt(data.args[0].hex));
      await user.save();
      res.sendStatus(200);
  } catch (e) {
      next(e);
  }
};




exports.postHessDestroyed = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
    const user =await  User.findOne({
        address:data.args[1]
    });
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
      }
        await user.subToken(parseInt(data.args[0].hex));
        await user.save();
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
};


