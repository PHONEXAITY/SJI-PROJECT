const Models = require('../models');
const { SuccessMessage, ErrorMessage } = require('../service/message');
const statusResponse = require('../service/responseHandler');

exports.createNews = async (req, res) => {
  try {
    const newNews = await Models.News.create(req.body);
    return statusResponse.sendCreated(res, SuccessMessage.create ,newNews);
  } catch (error) {
   return statusResponse.sendServerError(res,ErrorMessage.serverFaild);
  }
};

// Only isDelete: false
exports.getAllNews = async (req, res) => {
  try {
    const allNews = await Models.News.find({ isDelete: false });
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, allNews);
  } catch (error) {
   return statusResponse.sendServerError(res,ErrorMessage.serverFaild);
  }
};
// All
exports.getsAllNews = async (req, res) => {
  try {
    const allNews = await Models.News.find();
    return statusResponse.sendSuccess(res, SuccessMessage.getAll, allNews);
  } catch (error) {
   return statusResponse.sendServerError(res,ErrorMessage.serverFaild);
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await Models.News.findById(req.params.id);
    if (!news) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
   return statusResponse.sendSuccess(res,SuccessMessage.getOne,news)
  } catch (error) {
    return statusResponse.sendServerError(res,ErrorMessage.serverFaild);
  }
};


exports.updateNews = async (req, res) => {
  try {
    const updatedNews = await Models.News.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedNews) {
      return statusResponse.sendNotFound(res,ErrorMessage.notFound);
    }
    return statusResponse.sendSuccess(res,SuccessMessage.update, updatedNews);
  } catch (error) {
    return statusResponse.sendServerError(res,ErrorMessage.serverFaild);
  }
};


exports.isDeleteNews = async (req, res) => {
  try {
    const deletedNews = await Models.News.findByIdAndUpdate(
      req.params.id,
      { $set: { isDelete: true }, updatedAt: Date.now() },
      { new: true }
    );
    if (!deletedNews) {
      return statusResponse.sendNotFound(res,ErrorMessage.notFound);
    }
    if (deletedNews.isDelete) {
      return statusResponse.sendBadRequest(res, "News was already deleted");
    }
   return statusResponse.sendSuccess(res,SuccessMessage.delete);
  } catch (error) {
    return statusResponse.sendServerError(res,ErrorMessage.serverFaild);
  }
};
exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await Models.News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
    if (deletedNews.deletedCount === 0) {
      return statusResponse.sendFail(res, "News was already deleted");
    }

    return statusResponse.sendSuccess(res, SuccessMessage.delete);
  } catch (error) {
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};


