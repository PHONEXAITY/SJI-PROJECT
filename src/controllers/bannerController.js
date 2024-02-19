const Models = require('../models');
const statusResponse = require('../service/responseHandler');
const { ErrorMessage,SuccessMessage } = require('../service/message');


exports.createBanner = async (req, res) => {
try {
      const banner = new Models.Banner(req.body);
      await banner.save();
     return statusResponse.sendCreated(res, SuccessMessage.create ,banner);
    } catch (error) {
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
};
  
 exports.getBanners = async (req, res) => {
    try {
      const banners = await Models.Banner.find();
      return statusResponse.sendSuccess(res, SuccessMessage.getAll, banners);
    } catch (error) {
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
  };
  
  exports.getBannerById = async (req, res) => {
    try {
      const banner = await Models.Banner.findById(req.params.id);
      if (!banner) {
        return statusResponse.sendNotFound(res, ErrorMessage.notFound);
      }
      return statusResponse.sendSuccess(res, SuccessMessage.getOne, banner);
    } catch (error) {
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
  };
  
exports.updateBanner = async (req, res) => {
    try {
      const banner = await Models.Banner.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!banner) {
        return statusResponse.sendNotFound(res, ErrorMessage.notFound);
      }
      return statusResponse.sendSuccess(res, SuccessMessage.update, banner);
    } catch (error) {
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
  };
  
  exports.deleteBanner = async (req, res) => {
    try {
      const banner = await Models.Banner.findByIdAndDelete(req.params.id);
      if (!banner) {
        return statusResponse.sendNotFound(res, ErrorMessage.notFound);
      }
      return statusResponse.sendSuccess(res, SuccessMessage.delete);
    } catch (error) {
        return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
    }
  };