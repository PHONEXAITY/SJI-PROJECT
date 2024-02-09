const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  course_id: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Course',
      required: true 
    },
  form_id: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Form' ,
      require: true
    }],
  students: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User' ,
      require: true
    }],
  ep_id: [{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Ep' 
    }],
  ispublic: {
     type: Boolean,
      default: true 
    },
}, { 
    timestamps: true
 });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
