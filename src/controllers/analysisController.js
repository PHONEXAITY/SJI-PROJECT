const Models = require('../models');
const statusResponse = require('../service/responseHandler');
const { SuccessMessage, ErrorMessage } = require('../service/message');

exports.createAnalysis = async (req, res) => {
  try {
    const newAnalysis = new Models.Analysis(req.body);
    const savedAnalysis = await newAnalysis.save();
    return statusResponse.sendCreated(res,SuccessMessage.create, savedAnalysis);
  } catch (error) {
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Models.Analysis.find();
    if(!analyses) {
      return statusResponse.sendNotFound(res, ErrorMessage.notFound)
    }
   return  statusResponse.sendSuccess(res,SuccessMessage.getAll,analyses);
  } catch (error) {
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};


exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Models.Analysis.findById(req.params.id);
    if (!analysis) {
        return statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
   return  statusResponse.sendSuccess(res,SuccessMessage.getOne,analysis)
  } catch (error) {
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.updateAnalysisById = async (req, res) => {
  try {
    const updatedAnalysis = await Models.Analysis.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnalysis) {
         statusResponse.sendNotFound(res, ErrorMessage.notFound);
    }
     statusResponse.sendSuccess(res, SuccessMessage.update,updatedAnalysis)
  } catch (error) {
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};

exports.deleteAnalysisById = async (req, res) => {
  try {
    const deletedAnalysis = await Models.Analysis.findByIdAndDelete(req.params.id);
    if (!deletedAnalysis) {
        return statusResponse.sendNotFound(res, ErrorMessage.notFound);
      }
   return statusResponse.sendSuccess(res,SuccessMessage.delete);
  } catch (error) {
    return statusResponse.sendServerError(res, ErrorMessage.serverFaild);
  }
};
