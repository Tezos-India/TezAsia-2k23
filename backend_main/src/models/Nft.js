const { model, Schema } = require('mongoose');
const Bid = require('./Bid');
const nft = new Schema({
  assetId: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  attributes: {
    rank:String,
    country:String,
    trait:String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  owner_name:{
    type: String,
  },
  owner_addr:{
    type: String,
  }

});
nft.virtual('bid', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'assetId'
});

const Nft = model('Nft', nft);

module.exports = Nft;
