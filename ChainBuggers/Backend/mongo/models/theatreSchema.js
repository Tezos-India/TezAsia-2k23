const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
require("../db");

const theatreSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  gst_no: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
  },
});


theatreSchema.methods.generateAuthToken = async function () {
  if (!this.token) {
    const token = jwt.sign({ _id: this._id.toString() }, "secretcode");
    this.token = token;
    return token;
  }

  jwt.verify(this.token, "secretcode", (err) => {
    if (err) {
      console.log("expire", err);
      const token = jwt.sign({ _id: this._id.toString() }, "secretcode");
      this.token = token;
      return token;
    }
  });
};

const Theatre = mongoose.model("Theatre", theatreSchema);
module.exports = Theatre;
