const jwt = require('jsonwebtoken');
const statusResponse = require('../service/responseHandler');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(statusResponse.sendUnauthorized(res, "You are not authorized!"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(statusResponse.sendForbidden(res, "Token is not valid!"));
    }
    req.user = decoded;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  exports.verifyToken(req, res, () => {
    if (req.user.role === "customer") {
      return next();
    } else {
      return next(statusResponse.sendForbidden(res, "Token is not valid!"));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  exports.verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      return next();
    } else {
      return next(statusResponse.sendForbidden(res, "Admin privileges required!"));
    }
  });
};
