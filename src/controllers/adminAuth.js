const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Models = require('../models');
const statusResponse = require('../service/responseHandler');



exports.adminSignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return statusResponse.sendBadRequest(res, 'Username, email, and password are required');
        }


        const existingUser = await Models.User.findOne({ email });
        if (existingUser) {
            return statusResponse.sendBadRequest(res, 'User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Models.User({ username, email, password: hashedPassword, role: 'admin' ,member:{isActive: true, isFree: false}});
        await newUser.save();

        return statusResponse.sendCreated(res, 'Admin registered successfully',newUser);
    } catch (error) {
        console.error(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            return statusResponse.sendBadRequest(res, 'Username already exists. Please choose a different username.');
    }
    return statusResponse.sendServerError(res, 'Internal Server Error');
}
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return statusResponse.sendBadRequest(res, 'Email and password are required');
        }

        const user = await Models.User.findOne({ email, role: 'admin' });

        if (!user) {
            return statusResponse.sendUnauthorized(res, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return statusResponse.sendUnauthorized(res, 'Invalid password');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie('token', token, { httpOnly: true });

        return statusResponse.sendSuccess(res, 'Login successful', token);
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, 'Internal Server Error');
    }
};

exports.adminChangePassword = async (req, res) => {
    try {
        const { email,currentPassword, newPassword } = req.body;

        const user = await Models.User.findOne({ email, role: 'admin' });

        if (!user) {
            return statusResponse.sendNotFound(res, 'Admin user not found');
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return statusResponse.sendBadRequest(res, 'Current password is incorrect');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return statusResponse.sendSuccess(res, 'Admin password changed successfully');
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, 'Internal Server Error');
    }
};

exports.getUserCustomer = async (req, res) => {
    try {
        const user = await Models.User.find({role: 'customer' });

        if (!user) {
            return statusResponse.sendNotFound(res, 'Customer not found');
        }

        return statusResponse.sendSuccess(res, 'User found', { user });
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, 'Internal Server Error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Models.User.find({});

        return statusResponse.sendSuccess(res, 'Users fetched successfully', { users });
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, 'Internal Server Error');
    }
};

exports.deleteUserCustomer = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await Models.User.findOneAndDelete({ _id: userId, role: 'customer' });

        if (!deletedUser) {
            return statusResponse.sendNotFound(res, 'Customer not found');
        }

        return statusResponse.sendSuccess(res, 'Customer deleted successfully');
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, 'Internal Server Error');
    }
};

exports.deleteUserAdmin = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await Models.User.findOneAndDelete({ _id: userId, role: 'admin' });
        if (!deletedUser) {
            return statusResponse.sendNotFound(res, 'Admin user not found');
        }
        return statusResponse.sendSuccess(res, 'Admin user deleted successfully');
    } catch (error) {
        console.error(error);
        return statusResponse.sendServerError(res, 'Internal Server Error');
    }
};