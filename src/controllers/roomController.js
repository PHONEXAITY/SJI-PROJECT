const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createRoom = async (req, res) => {
  try {
    const room = await Models.Room.create(req.body);
    return statusResponse.sendCreated(res, 'Room created successfully', room);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Models.Room.find();
    return statusResponse.sendSuccess(res, 'Rooms fetched successfully', rooms);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Models.Room.findById(req.params.id).populate('students');
    if (!room) {
      return statusResponse.sendNotFound(res, 'Room not found');
    }
    return statusResponse.sendSuccess(res, 'Room fetched successfully', room);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Models.Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return statusResponse.sendNotFound(res, 'Room not found');
    }
    return statusResponse.sendSuccess(res, 'Room updated successfully', updatedRoom);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Models.Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return statusResponse.sendNotFound(res, 'Room not found');
    }
    return statusResponse.sendSuccess(res, 'Room deleted successfully');
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, 'Internal Server Error');
  }
};
