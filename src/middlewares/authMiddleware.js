const jwt = require('jsonwebtoken');
const statusResponse = require('../service/responseHandler');
const { SECRET_KEY } = require('../config/Golbalkey');
const service = require('../service/service');


exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('Token not found');
    return statusResponse.sendForbidden(res, 'A token is required for authentication');
  }

  try {
 /*    const decoded = jwt.verify(token, SECRET_KEY);
    req.decoded = decoded; */
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const decryptedData = service.decryptUserData(decodedToken.data);
    req.decoded = decryptedData;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return statusResponse.sendUnauthorized(res, 'Invalid token');
  }
};

exports.verifyAdmin = (req, res, next) => {
  const decoded = req.decoded;
  if (!decoded || decoded.role !== 'admin') { 
    return statusResponse.sendForbidden(res, 'Not User Role');
  }
  next();
};

exports.verifyUser = (req, res, next) => {
  const decoded = req.decoded;

  if (!decoded || decoded.role !== 'customer') {
    return statusResponse.sendForbidden(res, 'You are not Customer Role');
  }
  next();
};

