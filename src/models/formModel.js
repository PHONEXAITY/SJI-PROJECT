const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  course_id: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Course', required: true ,
    },
  student_id: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', required: true
     },
  totalPrice: {
     type: Number, required: true 
    },
  phoneNumber: {
     type: Number 
    },
  image_url: {
     type: String 
    },
  status: {
     type: String,
      enum: ['pending', 'success', 'cancel'],
       default: 'pending' 
    },
}, {
     timestamps: true 
    });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
