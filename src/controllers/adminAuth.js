const bcrypt = require('bcryptjs');
const Models = require('../models');
const statusResponse = require('../service/responseHandler');
const { ErrorMessage, SuccessMessage } = require('../service/message');
const service = require('../service/service');

exports.adminSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return statusResponse.sendBadRequest(res, ErrorMessage.pleaseInput);
        }

        const existingUser = await Models.User.findOne({ email });
        if (existingUser) {
            return statusResponse.sendBadRequest(res, ErrorMessage.existingUser);
        }

        const hashedPassword = await service.hashPassword(password);
        const newUser = new Models.User({ username, email, password: hashedPassword, role: 'admin', member: { isActive: true, isFree: false } });
        await newUser.save();
        
        const userData = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            member: newUser.member
        };

        return statusResponse.sendCreated(res, SuccessMessage.register, userData);
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            return statusResponse.sendBadRequest(res, ErrorMessage.UserAlready);
        }
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return statusResponse.sendBadRequest(res, ErrorMessage.EmailandPasswordRequired);
        }

        const user = await Models.User.findOne({ email, role: 'admin' });

        if (!user) {
            return statusResponse.sendUnauthorized(res, ErrorMessage.invalidEmailandPs);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return statusResponse.sendUnauthorized(res, ErrorMessage.notMatchPassword);
        }

        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            member: user.member
        };

        const token = service.generateToken(user._id, user.role, res);
        return statusResponse.sendSuccess(res, SuccessMessage.login, {userData, token});

    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.adminChangePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        const user = await Models.User.findOne({ email, role: 'admin' });

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

        return statusResponse.sendSuccess(res, SuccessMessage.changeSuccess);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.getUserCustomer = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.role !== 'admin') {
            return statusResponse.sendForbidden(res, 'Only admins can access this resource');
        }

        const customers = await Models.User.find({ role: 'customer' });
        if (!customers || customers.length === 0) {
            return statusResponse.sendNotFound(res, ErrorMessage.notFound);
        }
        return statusResponse.sendSuccess(res, "Fetched data successfully", customers);
    } catch (err) {
        console.error(err);
        return statusResponse.sendServerError(res, "Internal server Error");
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.role !== 'admin') {
            console.log('User is not an admin or not authenticated:', req.decoded);
            return statusResponse.sendForbidden(res, 'Only admins can access this resource');
        }
        const users = await Models.User.find();
        return statusResponse.sendSuccess(res, SuccessMessage.getAll, users);
    } catch (err) {
        console.error('Error fetching users:', err);
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};

exports.deleteUserCustomer = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.role !== 'admin') {
            return statusResponse.sendForbidden(res, 'Only admins can access this resource');
        }
        const userId = req.params.id;
        const deletedCustomer = await Models.User.findOneAndDelete({ _id: userId, role: 'customer' });
        if (!deletedCustomer) {
            return statusResponse.sendNotFound(res, 'Customer user not found');
        }
        return statusResponse.sendSuccess(res, SuccessMessage.delete, deletedCustomer);
    } catch (err) {
        if (!res.headersSent) {
            console.error('Error deleting customer user:', err);
            return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
        }
    }
};


exports.deleteUserAdmin = async (req, res) => {
    try {
        if (!req.decoded || req.decoded.role !== 'admin') {
            return statusResponse.sendForbidden(res, 'Only admins can access this resource');
        }
        await Models.User.findOneAndDelete({ _id: req.params.id, role: 'admin' });

        return statusResponse.sendSuccess(res, SuccessMessage.delete);
    } catch (err) {
        console.error('Error deleting admin user:', err);
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
