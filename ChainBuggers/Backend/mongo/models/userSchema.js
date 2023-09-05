const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const WalletTxn = require("./walletTxnSchema");
require("../db");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email");
      }
    },
  },
  walletAdd:{
    type: String
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // minLength: 6,
  },
  balance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WalletTxn"
    }
  ],
  token: {
    type: String,
    // required: true,
  },
});

// userSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 8);
//   next();
// });


userSchema.methods.generateAuthToken = async function () {
    // console.log("pehle",this.token)
    if (!this.token) {
        const token = jwt.sign({ _id: this._id.toString() }, "secretcode", { expiresIn: '1h' })
        this.token = token
        return token
    }

    jwt.verify(this.token, "secretcode", (err) => {
        if (err) {
            console.log("expire", err)
            const token = jwt.sign({ _id: this._id.toString() }, "secretcode", { expiresIn: '1h' })
            this.token = token
            return token
        }
    })
}

const User = mongoose.model("User", userSchema);
module.exports = User;