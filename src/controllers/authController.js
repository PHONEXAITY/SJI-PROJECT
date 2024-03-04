const Models = require('../models');
const statusResponse = require('../service/responseHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/Golbalkey');
const service = require('../service/service');
const { ErrorMessage, SuccessMessage } = require('../service/message');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return statusResponse.sendBadRequest(res, ErrorMessage.pleaseInput);
        }

        const existingUser = await Models.User.findOne({ email });
        if (existingUser) {
            return statusResponse.sendBadRequest(res, ErrorMessage.existingUser);
        }

        const hashedPassword = await service.hashPassword(password);

        const newUser = new Models.User({ username, email, password: hashedPassword, member: null });
        await newUser.save();

        const userData = {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          member: newUser.member,
      };
      const newData = Object.assign(
        JSON.parse(JSON.stringify(userData)),
      );

        return statusResponse.sendCreated(res, SuccessMessage.register, newData);
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            return statusResponse.sendBadRequest(res, ErrorMessage.UserAlready);
        }
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return statusResponse.sendBadRequest(res, ErrorMessage.EmailandPasswordRequired);
        }

        const user = await Models.User.findOne({ email, role: 'customer' });

        if (!user) {
            return statusResponse.sendUnauthorized(res, ErrorMessage.invalidEmailandPs);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return statusResponse.sendUnauthorized(res, ErrorMessage.notMatchPassword);
        }

        const token = service.generateToken(user._id, user.role ,res);
        const userData = {
          _id: user._id,
          username: user.username,
          email: user.email,
          member: user.member,
          token
      };
      const newData = Object.assign(
        JSON.parse(JSON.stringify(userData)),
      );
        return statusResponse.sendSuccess(res, SuccessMessage.login,newData);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        const user = await Models.User.findOne({ email, role: 'customer' });

        if (!user) {
            return statusResponse.sendNotFound(res, ErrorMessage.notFound);
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return statusResponse.sendBadRequest(res, ErrorMessage.notMatchPassword);
        }

        const hashedNewPassword = await service.hashPassword(newPassword);
        user.password = hashedNewPassword;
        await user.save();

        return statusResponse.sendSuccess(res, SuccessMessage.changeSuccess, {});
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

  exports.getData = async (req, res) => {
    try {
      const userId = req.decoded.userId; 
      const user = await Models.User.findOne({ _id: userId, role: 'customer' }).select('-password -role -_id');
  
      if (!user) {
        return statusResponse.sendNotFound(res, 'User not found');
      }else{

          return statusResponse.sendSuccess(res, 'Fetched data Success', user);
      }
  
    } catch (error) {
      return statusResponse.sendServerError(res, error.message);
    }
  };
  
  exports.UploadProfile = async (req, res) => {
    try {
      const userId = req.decoded.userId;
      const { profile } = req.body;
  
      if (!profile) {
        return statusResponse.sendBadRequest(res, 'Profile data is required');
      }
  
      const user = await Models.User.findOne({ _id: userId, role: 'customer' });
  
      if (!user) {
        console.log('User not found in the database');
        return statusResponse.sendNotFound(res, ErrorMessage.notFound);
      }
  
      user.profile = profile;
      await user.save();
      console.log('Profile image uploaded successfully');
  
      return statusResponse.sendCreated(res, 'Profile image uploaded successfully');
    } catch (error) {
      console.error('Error uploading profile:', error);
      return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
  };

    exports.changeProfile = async (req, res) => {
      try {
        const userId = req.decoded.userId; 
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
  
    
   exports.fetchProfile = async (req, res) => {
      try {
        const userId = req.decoded.userId; 
    
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
        const userId = req.decoded.userId; 
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

  




exports.postUploadProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { profile } = req.body;

        const user = await Models.User.findOne({ _id: userId, role: 'customer' });

        if (!user) {
            return statusResponse.sendNotFound(res, ErrorMessage.notFound);
        }

        user.profile = profile;
        await user.save();

        return statusResponse.sendCreated(res, SuccessMessage.create, user);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.changeProfile = async (req, res) => {
    try {
      const userId = req.decoded.userId; 
        const { profile } = req.body;

        const user = await Models.User.findOneAndUpdate(
            { _id: userId, role: 'customer' },
            { profile },
            { new: true }
        );

        if (!user) {
            return statusResponse.sendNotFound(res, ErrorMessage.notFound);
        }

        return statusResponse.sendSuccess(res, SuccessMessage.update, user.profile);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.getProfile = async (req, res) => {
    try {
         const userId = req.decoded.userId; 

        const user = await Models.User.findOne({ _id: userId, role: 'customer' });

        if (!user) {
            return statusResponse.sendNotFound(res, ErrorMessage.notFound);
        }

        return statusResponse.sendSuccess(res, SuccessMessage.getAll, user.profile);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.postRegisterPackage = async (req, res) => {
    try {
      const userId = req.decoded.userId; 
        const { packageName, startTime, endTime, years } = req.body;
        const user = await Models.User.findOne({ _id: userId, role: 'customer' });

        if (!user) {
            return statusResponse.sendNotFound(res, ErrorMessage.notFound);
        }

        user.member = { packageName, startTime, endTime, years, isActive: true, isFree: false };
        await user.save();

        return statusResponse.sendCreated(res, SuccessMessage.registerPackage);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token'); 
    return statusResponse.sendSuccess(res, SuccessMessage.logout, {}); 
  } catch (err) {
    console.error(err.message);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild); 
  }
};





