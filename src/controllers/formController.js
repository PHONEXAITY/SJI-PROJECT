const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createForm = async (req, res) => {
  try {
    const form = await Models.Form.create(req.body);
    return statusResponse.sendCreated(res, 'Form created successfully', form);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Models.Form.find();
    return statusResponse.sendSuccess(res, 'Forms fetched successfully', forms);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Models.Form.findById(req.params.id);
    if (!form) {
      return statusResponse.sendNotFound(res, 'Form not found');
    }
    return statusResponse.sendSuccess(res, 'Form fetched successfully', form);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.updateForm = async (req, res) => {
  try {
    const updatedForm = await Models.Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedForm) {
      return statusResponse.sendNotFound(res, 'Form not found');
    }
    return statusResponse.sendSuccess(res, 'Form updated successfully', updatedForm);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const deletedForm = await Models.Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return statusResponse.sendNotFound(res, 'Form not found');
    }
    return statusResponse.sendSuccess(res, 'Form deleted successfully');
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};
exports.confirmForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedForm = await Models.Form.findByIdAndUpdate(formId, { status: 'confirmed' }, { new: true });
    if (!updatedForm) {
      return statusResponse.sendNotFound(res, 'Form not found');
    }
    return statusResponse.sendSuccess(res, 'Form confirmed successfully', updatedForm);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.cancelForm = async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedForm = await Models.Form.findByIdAndUpdate(formId, { status: 'cancelled' }, { new: true });
    if (!updatedForm) {
      return statusResponse.sendNotFound(res, 'Form not found');
    }
    return statusResponse.sendSuccess(res, 'Form cancelled successfully', updatedForm);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};