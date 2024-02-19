const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createEp = async (req, res) => {
  try {
    const ep = await Models.Episode.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create, ep);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllEps = async (req, res) => {
  try {
    const eps = await  Models.Episode.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, eps);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getEpById = async (req, res) => {
  try {
    const ep = await  Models.Episode.findById(req.params.id);
    if (!ep) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.getOne, ep);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateEp = async (req, res) => {
  try {
    const updatedEp = await  Models.Episode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEp) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.update, updatedEp);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteEp = async (req, res) => {
  try {
    const deletedEp = await  Models.Episode.findByIdAndDelete(req.params.id);
    if (!deletedEp) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
