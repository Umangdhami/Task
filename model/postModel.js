const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  admin: String,
  title: String,
  body: String,
  createdBy: String,
  active: String,
  latitude: String,
  longitude: String
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
