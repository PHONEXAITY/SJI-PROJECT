const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createCourse = async (req, res) => {
  try {
    const course = await Models.Course.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create, course);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Models.Course.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, courses);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Models.Course.findById(req.params.id);
    if (!course) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.getOne, course);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Models.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.update, updatedCourse);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Models.Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
