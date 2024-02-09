const mongoose = require('mongoose');

const adviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['gold', 'stock'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  video_url: {
    type: String
  },
  ep_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ep'
  }],
}, { timestamps: true });

const Advice = mongoose.model('Advice', adviceSchema);

module.exports = Advice;
