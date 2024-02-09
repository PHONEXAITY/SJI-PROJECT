const Models = require('../models');
const statusResponse = require('../service/responseHandler');


exports.createBanner = async (req, res) => {
try {
      const banner = new Models.Banner(req.body);
      await banner.save();
     return statusResponse.sendCreated(res, "Banner Created successfully !",banner);
    } catch (error) {
        return statusResponse.sendServerError(res, error.message);
    }
};
  
 exports.getBanners = async (req, res) => {
    try {
      const banners = await Models.Banner.find();
      return statusResponse.sendSuccess(res, 'Banners fetched successfully', banners);
    } catch (error) {
        return statusResponse.sendServerError(res, error.message);
    }
  };
  
  exports.getBannerById = async (req, res) => {
    try {
      const banner = await Models.Banner.findById(req.params.id);
      if (!banner) {
        return statusResponse.sendNotFound(res, 'Banner not found');
      }
      return statusResponse.sendSuccess(res, 'Banner fetched successfully', banner);
    } catch (error) {
        return statusResponse.sendServerError(res, error.message);
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
        return statusResponse.sendNotFound(res, 'Banner not found');
      }
      return statusResponse.sendSuccess(res, 'Banner updated successfully', banner);
    } catch (error) {
        return statusResponse.sendServerError(res, error.message);
    }
  };
  
  exports.deleteBanner = async (req, res) => {
    try {
      const banner = await Models.Banner.findByIdAndDelete(req.params.id);
      if (!banner) {
        return statusResponse.sendNotFound(res, 'Banner not found');
      }
      return statusResponse.sendSuccess(res, 'Banner deleted successfully');
    } catch (error) {
        return statusResponse.sendServerError(res, error.message);
    }
  };