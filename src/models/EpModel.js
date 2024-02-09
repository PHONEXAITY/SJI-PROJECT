const mongoose = require('mongoose');

const epSchema = new mongoose.Schema({
  ep_name: {
    type: String,
    required: true
  },
  ep_content: {
    type: String,
    required: true
  },
  ep_url: {
    type: String
  }
}, { timestamps: true });

const Ep = mongoose.model('Ep', epSchema);

module.exports = Ep;
