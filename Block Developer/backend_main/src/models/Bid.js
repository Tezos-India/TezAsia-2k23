const { model, Schema } = require('mongoose');

const bid = new Schema({
  assetOb: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Nft'
  },
  assetId: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  bidder: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bidder_name:{
    type: String,
  },
  bidder_addr:{
    type: String,
  }
});

const Bid = model('Bid', bid);
module.exports = Bid;
