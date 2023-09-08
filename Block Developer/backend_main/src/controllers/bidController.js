const Bid = require('../models/Bid');
const Nft = require('../models/Nft');
const ErrorResponse = require("../utils/errorResponse");
const User = require('../models/User');

exports.getAllBids = async (req, res, next) => {
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
      const bids = await Bid.find(match)
          .sort(srt || '-price')
          .limit(Number(lim))
          .skip(Number(skp));
      if (!nfts) {
          return next(new ErrorResponse("Bids Not Found", 404));
      }
      res.send(bids);
  } catch (e) {
      next(e);
  }
};



exports.postBidCreated = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
      const nft=await Nft.findOne({
        assetId:parseInt(data.args[0].hex)
      });
      if (!nft) {
        return next(new ErrorResponse("Nft not found", 404));
    }
    const user=await User.findOne({
        address:data.args[2]
      });
      if (!user) {
        return next(new ErrorResponse("Profile not found", 404));
    }
      await Bid.create({
        assetOb:nft._id,
        assetId:nft.assetId,
        bidder_addr:user.address,
        bidder_name:user.username,
        bidder:user._id,
        price:parseInt(data.args[1].hex),
      });
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };



  exports.postBidEnd = async (req, res, next) => {
    const data  = req.body;
    if (!data) {
        return next(new ErrorResponse("Invalid Parameters", 400));
    }
    try {
        const nft=await Nft.findOne({
            assetId:parseInt(data.args[0].hex)
          });
          if (!nft) {
            return next(new ErrorResponse("Nft not found", 404));
        }
      const user0 = await User.findOne({
          address:data.args[2]
      });
      const user1 = await User.findOne({
        address:nft.owner_addr
    });
    if (!user1||!user0) {
          return next(new ErrorResponse("Users Not Found", 404));
      }
        nft.price=parseInt(data.args[1].hex);
        nft.owner=user0._id;
        nft.owner_name=user0.username;
          await user1.addToken(parseInt(data.args[1].hex));
          await user0.subToken(parseInt(data.args[1].hex));
          await user1.save();
          await user0.save();
          await nft.save();

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };
