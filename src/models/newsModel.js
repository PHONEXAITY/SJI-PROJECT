// models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
}, 
{ timestamps: true }
);

const NewsModel = mongoose.model('News', newsSchema);

module.exports = NewsModel;
