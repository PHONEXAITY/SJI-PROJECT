const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  advice_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Advice'
  }],
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
