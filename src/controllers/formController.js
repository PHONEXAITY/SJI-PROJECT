const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createForm = async (req, res) => {
  try {
    const form = await Models.Form.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create, form);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Models.Form.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, forms);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Models.Form.findById(req.params.id);
    if (!form) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.getOne, form);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateForm = async (req, res) => {
  try {
    const updatedForm = await Models.Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedForm) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.update, updatedForm);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const deletedForm = await Models.Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
exports.confirmForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedForm = await Models.Form.findByIdAndUpdate(formId, { status: 'confirmed' }, { new: true });
    if (!updatedForm) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, 'Form confirmed successfully', updatedForm);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.cancelForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedForm = await Models.Form.findByIdAndUpdate(formId, { status: 'cancelled' }, { new: true });
    if (!updatedForm) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, 'Form cancelled successfully', updatedForm);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};