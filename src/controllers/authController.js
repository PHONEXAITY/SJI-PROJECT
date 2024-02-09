const Models = require('../models');
const statusResponse = require('../service/responseHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const existingUser = await Models.User.findOne({ email });
      if (existingUser) {
        return statusResponse.sendBadRequest (res,'User with this email already exists');
      }
  
      const user = new Models.User({ username, email, password: hashedPassword , member: null});
      await user.save();
  
      return statusResponse.sendCreated(res,'User registered successfully',{});
    } catch (error) {
      console.error(error);
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        return statusResponse.sendBadRequest(res, 'Username already exists. Please choose a different username.');
}
    return statusResponse.sendServerError(res, error.message);
}
  };
  
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Models.User.findOne({ email, role: 'customer' });
  
      if (!user) {
        return statusResponse.sendUnauthorized(res,'Invalid email or password');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return statusResponse.sendUnauthorized(res,'Invalid password');
      }
  
      const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY, { expiresIn: "1h" });
      res.cookie('token', token, {
         httpOnly: true 
        });
  
      return statusResponse.sendSuccess(res,'Login successful',token);
    } catch (error) {
      console.error(error);
      return statusResponse.sendServerError(res, error.message);
    }
  };
  
  exports.changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        const user = await Models.User.findOne({ email, role: 'customer' });

        if (!user) {
            return statusResponse.sendNotFound(res, 'User not found');
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return statusResponse.sendBadRequest(res, 'Current password is incorrect');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return statusResponse.sendSuccess(res, 'Password changed successfully', {});
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, error.message);
    }
};
  
exports.getData = async (req, res) => {
  try {
      const userId = req.userId;

      const user = await Models.User.findOne({ _id: userId, role: 'customer' }).select('-password -role -_id');

      if (!user) {
          return statusResponse.sendNotFound(res, 'User not found');
      }

     return  statusResponse.sendSuccess(res, 'Fetched data Success', user);
  } catch (error) {
      return statusResponse.sendServerError(res, error.message);
  }
};
  
 exports.postUploadProfile = async (req, res) => {
    try {
      const userId = req.userId; 
      const { profile } = req.body;
  
      const user = await Models.User.findOne({ _id: userId, role: 'customer' });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.profile = profile;
      await user.save();
  
     return statusResponse.sendCreated(res,'Profile image uploaded successfully',user);
    } catch (error) {
      console.error(error);
      return statusResponse.sendServerError(res, error.message);
    }
  };

  exports.changeProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { profile } = req.body;

        const user = await Models.User.findOneAndUpdate(
            { _id: userId, role: 'customer' }, 
            { profile }, 
            { new: true }
        );

        if (!user) {
            return statusResponse.sendNotFound(res, 'User not found');
        }

        return statusResponse.sendSuccess(res, 'Profile updated successfully',user.profile);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, error.message);
    }
};

  
 exports.getProfile = async (req, res) => {
    try {
      const userId = req.userId; 
  
      const user = await Models.User.findOne({ _id: userId, role: 'customer' });
  
      if (!user) {
        return statusResponse.sendNotFound(res,'User not found');
      }
  
     return statusResponse.sendSuccess(res,"fetched profile success",user.profile);
    } catch (error) {
      console.error(error);
      return statusResponse.sendServerError(res, error.message);
    }
  };
  
exports.postRegisterPackage = async (req, res) => {
    try {
      const userId = req.userId; 
      const { packageName, startTime, endTime, years } = req.body;
      const user = await Models.User.findOne({ _id: userId, role: 'customer' });
     
  
      if (!user) {
        return statusResponse.sendNotFound(res,'User not found');
      }
  
      user.member = {packageName, startTime, endTime, years, isActive: true, isFree: false };
      await user.save();
  
     return statusResponse.sendCreated(res,'Member package registered successfully');
    } catch (error) {
      console.error(error);
      return statusResponse.sendServerError(res, error.message);
    }
  };
  
  