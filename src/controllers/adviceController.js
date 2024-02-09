const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createAdvice = async (req, res) => {
  try {
    const advice = await Models.Advice.create(req.body);
    return statusResponse.sendCreated(res, 'Advice created successfully', advice);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAllAdvices = async (req, res) => {
  try {
    const advices = await Models.Advice.find();
    return statusResponse.sendSuccess(res, 'Advices fetched successfully', advices);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAdviceById = async (req, res) => {
  try {
    const advice = await Models.Advice.findById(req.params.id);
    if (!advice) {
      return statusResponse.sendNotFound(res, 'Advice not found');
    }
    return statusResponse.sendSuccess(res, 'Advice fetched successfully', advice);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.updateAdvice = async (req, res) => {
  try {
    const updatedAdvice = await Models.Advice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdvice) {
      return statusResponse.sendNotFound(res, 'Advice not found');
    }
    return statusResponse.sendSuccess(res, 'Advice updated successfully', updatedAdvice);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.deleteAdvice = async (req, res) => {
  try {
    const deletedAdvice = await Models.Advice.findByIdAndDelete(req.params.id);
    if (!deletedAdvice) {
      return statusResponse.sendNotFound(res, 'Advice not found');
    }
    return statusResponse.sendSuccess(res, 'Advice deleted successfully');
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};
