const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createEp = async (req, res) => {
  try {
    const ep = await Models.Episode.create(req.body);
    return statusResponse.sendCreated(res, 'Episode created successfully', ep);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAllEps = async (req, res) => {
  try {
    const eps = await  Models.Episode.find();
    return statusResponse.sendSuccess(res, 'Episodes fetched successfully', eps);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getEpById = async (req, res) => {
  try {
    const ep = await  Models.Episode.findById(req.params.id);
    if (!ep) {
      return statusResponse.sendNotFound(res, 'Episode not found');
    }
    return statusResponse.sendSuccess(res, 'Episode fetched successfully', ep);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.updateEp = async (req, res) => {
  try {
    const updatedEp = await  Models.Episode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEp) {
      return statusResponse.sendNotFound(res, 'Episode not found');
    }
    return statusResponse.sendSuccess(res, 'Episode updated successfully', updatedEp);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.deleteEp = async (req, res) => {
  try {
    const deletedEp = await  Models.Episode.findByIdAndDelete(req.params.id);
    if (!deletedEp) {
      return statusResponse.sendNotFound(res, 'Episode not found');
    }
    return statusResponse.sendSuccess(res, 'Episode deleted successfully');
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};
