const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { SECRET_KEY } = require('../config/Golbalkey');
const IV_LENGTH = 16;
const ENCRYPTION_KEY = crypto.randomBytes(32);


function encryptUserData(userId, role) {
    const data = JSON.stringify({ userId, role });
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return iv.toString('hex') + '.' + encryptedData;
}

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

/* exports.generateToken = (userId,role, res) => {
    const token = jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true});
    return token;
};
 */
exports.generateToken = (userId, role, res) => {
    const encryptedData = encryptUserData(userId, role);

    const token = jwt.sign({ data: encryptedData }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie('token', token, { httpOnly: true });

    return token;
};
exports.decryptUserData = (encryptedData) => {
    const [ivHex, encryptedPayload] = encryptedData.split('.');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc',  ENCRYPTION_KEY, iv);

    let decryptedPayload = decipher.update(encryptedPayload, 'hex', 'utf-8');
    decryptedPayload += decipher.final('utf-8');

    return JSON.parse(decryptedPayload);
};
