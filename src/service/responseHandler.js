exports.sendSuccess = (res, msg, data) => {
  res.status(200).json({
      success: true,
      message: msg,
      data: data || null,
  });
};

exports.sendCreated = (res, msg, data) => {
  res.status(201).json({
      success: true,
      message: msg,
      data: data,
  });
};

exports.sendBadRequest = (res, msg) => {
  res.status(400).json({
      success: false,
      message: msg,
  });
};

exports.sendUnauthorized = (res, msg) => {
  res.status(401).json({
      success: false,
      message: msg,
  });
};

exports.sendForbidden = (res, msg) => {
  res.status(403).json({
      success: false,
      message: msg || 'Forbidden',
  });
};

exports.sendNotFound = (res, msg) => {
  res.status(404).json({
      success: false,
      message: msg,
  });
};

exports.sendServerError = (res, msg) => {
  res.status(500).json({
      success: false,
      message: msg,
  });
};
