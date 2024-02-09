const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true
     },
  detail: {
     type: String 
    },
  image_url: {
     type: String 
    },
  price: {
     type: Number, 
     required: true 
    },
  video_url: {
     type: String 
    },
  ispublic: {
     type: Boolean,
      default: true 
    },
}, { 
    timestamps: true 
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
