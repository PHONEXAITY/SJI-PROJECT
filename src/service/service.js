const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/Golbalkey');

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

exports.generateToken = (userId,role, res) => {
    const token = jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true});
    return token;
};

