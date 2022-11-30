const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String
  },
  contents: {
    type: String
  }
}, {timestamps:true});

module.exports = mongoose.model("Post", postSchema);

