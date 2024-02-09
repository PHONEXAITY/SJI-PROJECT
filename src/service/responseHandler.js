exports.sendSuccess = (res, msg, data) => {
    res.status(200).json({
      success: true,
      message: msg || 'Request successful',
      data: data || null,
    });
  };
  
  exports.sendCreated = (res, msg, data) => {
    res.status(201).json({
      success: true,
      message: msg || 'Resource created successfully',
      data: data || null,
    });
  };
  
  exports.sendBadRequest = (res, msg) => {
    res.status(400).json({
      success: false,
      message: msg || 'Bad request',
    });
  };
  
  exports.sendUnauthorized = (res, msg) => {
    res.status(401).json({
      success: false,
      message: msg || 'Unauthorized',
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
      message: msg || 'Not found',
    });
  };
  
  exports.sendServerError = (res, msg) => {
    res.status(500).json({
      success: false,
      message: msg || 'Internal server error',
    });
  };
  