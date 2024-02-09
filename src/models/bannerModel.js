const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({

  title: { 
    type: String, 
    required: true 
     },
  detail: {
     type: String,
      required: true
     },
  image_url: {
     type: String, 
     required: true
     },
  startTime: {
     type: Date, 
     required: true 
    },
  endTime: { 
    type: Date, 
    required: true 
     },
  isPublic: { 
    type: Boolean,
     default: false
     },
},
{
    timestamps: true
});

const BannerModel = mongoose.model('Banner', bannerSchema);

module.exports = BannerModel;
