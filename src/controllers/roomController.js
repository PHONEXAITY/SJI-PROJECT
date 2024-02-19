const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createRoom = async (req, res) => {
  try {
    const room = await Models.Room.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create, room);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Models.Room.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, rooms);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Models.Room.findById(req.params.id).populate('students');
    if (!room) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.getOne , room);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Models.Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.update, updatedRoom);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Models.Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    console.error(error);
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
