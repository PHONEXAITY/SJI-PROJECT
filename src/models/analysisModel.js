const mongoose = require('mongoose');
const analysisSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['free', 'realtime'],
    required: true,
  },
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
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true}
);

const AnalysisModel = mongoose.model('Analysis', analysisSchema);

module.exports = AnalysisModel;
