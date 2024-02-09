const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
},
  email: {
     type: String, 
     required: true, 
     unique: true 
    },
  password: {
    type: String, 
    required: true 
},
  role: { 
    type: String,
     enum: ['customer', 'admin'],
     default: 'customer',
    },
  member: {
    packageName: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    isActive: { 
        type: Boolean,
        default: false,    
    },
    years: { type: Number },
    isFree: { 
        type: Boolean,
        default: true,    
    }
  },
  profile: { type: String }
},
  { timestamps: true}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
