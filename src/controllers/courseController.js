const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createCourse = async (req, res) => {
  try {
    const course = await Models.Course.create(req.body);
    return statusResponse.sendCreated(res, 'Course created successfully', course);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Models.Course.find();
    return statusResponse.sendSuccess(res, 'Courses fetched successfully', courses);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Models.Course.findById(req.params.id);
    if (!course) {
      return statusResponse.sendNotFound(res, 'Course not found');
    }
    return statusResponse.sendSuccess(res, 'Course fetched successfully', course);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Models.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return statusResponse.sendNotFound(res, 'Course not found');
    }
    return statusResponse.sendSuccess(res, 'Course updated successfully', updatedCourse);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Models.Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return statusResponse.sendNotFound(res, 'Course not found');
    }
    return statusResponse.sendSuccess(res, 'Course deleted successfully');
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};
