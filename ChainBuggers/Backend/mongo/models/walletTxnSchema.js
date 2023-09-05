const mongoose = require("mongoose");
const User = require("./userSchema");

require("../db");

const walletTxnSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"User"
  },
  balance:{
    type: Number
    // required: true
  },
  amount:{
    type: Number
  },
  txnType:{
    type:String //credit or debit
  },
  mode:{
    type:String //credit
  },
  txnId:{
    type: mongoose.Schema.Types.ObjectId, //debit
    // ref:"Transaction"
  }
});


const WalletTxn = mongoose.model("WalletTxn", walletTxnSchema);
module.exports = WalletTxn;
