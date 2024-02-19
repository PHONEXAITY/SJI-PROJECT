const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createService = async (req, res) => {
  try {
    const service = await Models.Service.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create, service);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Models.Service.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, services);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Models.Service.findById(req.params.id);
    if (!service) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.getOne, service);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await Models.Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.update, updatedService);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Models.Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
