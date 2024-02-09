const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createService = async (req, res) => {
  try {
    const service = await Models.Service.create(req.body);
    return statusResponse.sendCreated(res, 'Service created successfully', service);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Models.Service.find();
    return statusResponse.sendSuccess(res, 'Services fetched successfully', services);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Models.Service.findById(req.params.id);
    if (!service) {
      return statusResponse.sendNotFound(res, 'Service not found');
    }
    return statusResponse.sendSuccess(res, 'Service fetched successfully', service);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await Models.Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return statusResponse.sendNotFound(res, 'Service not found');
    }
    return statusResponse.sendSuccess(res, 'Service updated successfully', updatedService);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Models.Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return statusResponse.sendNotFound(res, 'Service not found');
    }
    return statusResponse.sendSuccess(res, 'Service deleted successfully');
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};
