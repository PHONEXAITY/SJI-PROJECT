const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createAdvice = async (req, res) => {
  try {
    const advice = await Models.Advice.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create, advice);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllAdvices = async (req, res) => {
  try {
    const advices = await Models.Advice.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, advices);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAdviceById = async (req, res) => {
  try {
    const advice = await Models.Advice.findById(req.params.id);
    if (!advice) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.getOne, advice);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateAdvice = async (req, res) => {
  try {
    const updatedAdvice = await Models.Advice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdvice) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.update, updatedAdvice);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteAdvice = async (req, res) => {
  try {
    const deletedAdvice = await Models.Advice.findByIdAndDelete(req.params.id);
    if (!deletedAdvice) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
