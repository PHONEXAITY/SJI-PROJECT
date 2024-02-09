const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createNews = async (req, res) => {
  try {
    const newNews = await Models.News.create(req.body);
    return statusResponse.sendCreated(res,"News Created  Successfully",newNews);
  } catch (error) {
   return statusResponse.sendServerError(res,error.message);
  }
};

// Only isDelete: false
exports.getAllNews = async (req, res) => {
  try {
    const allNews = await Models.News.find({ isDelete: false });
    return statusResponse.sendSuccess(res, "News fetched successfully", allNews);
  } catch (error) {
   return statusResponse.sendServerError(res,error.message);
  }
};
// All
exports.getsAllNews = async (req, res) => {
  try {
    const allNews = await Models.News.find();
    return statusResponse.sendSuccess(res, "News fetched successfully", allNews);
  } catch (error) {
   return statusResponse.sendServerError(res,error.message);
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await Models.News.findById(req.params.id);
    if (!news) {
      return statusResponse.sendNotFound(res,'News not found');
    }
   return statusResponse.sendSuccess(res,"News fetched success",news)
  } catch (error) {
    return statusResponse.sendServerError(res,error.message);
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
      return statusResponse.sendNotFound(res,'News not found');
    }
    return statusResponse.sendSuccess(res,"News Updated Success", updatedNews);
  } catch (error) {
    return statusResponse.sendServerError(res,error.message);
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
      return statusResponse.sendNotFound(res,"News not found");
    }
    if (deletedNews.isDelete) {
      return statusResponse.sendBadRequest(res, "News was already deleted");
    }
   return statusResponse.sendSuccess(res,"News deleted successfully");
  } catch (error) {
    return statusResponse.sendServerError(res,error.message);
  }
};
exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await Models.News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return statusResponse.sendNotFound(res, "News not found");
    }
    if (deletedNews.deletedCount === 0) {
      return statusResponse.sendFail(res, "News was already deleted");
    }

    return statusResponse.sendSuccess(res, "News deleted successfully");
  } catch (error) {
    return statusResponse.sendServerError(res, error.message);
  }
};


