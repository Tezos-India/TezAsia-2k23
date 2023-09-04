const mongoose = require("mongoose");
const Theatre = require("./theatreSchema");

require("../db");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  release:{
    type: Date,
    required: true
    // yyyy-mm-dd
  },
  image:{
    type:String,
    required: true
  },
  poster:{
    type:String
  },
  likes:{
    type: Number,
    default: 0
  },
  theatreId:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre"
  }]
});


const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
