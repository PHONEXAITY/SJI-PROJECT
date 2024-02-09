const Models = require('../models');
const statusResponse = require('../service/responseHandler');

exports.createAnalysis = async (req, res) => {
  try {
    const newAnalysis = new Models.Analysis(req.body);
    const savedAnalysis = await newAnalysis.save();
    return statusResponse.sendCreated(res,"Analysis Created Successfully", savedAnalysis);
  } catch (error) {
    return statusResponse.sendServerError(res, error.message);
  }
};

exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Models.Analysis.find();
    if(!analyses) {
      return statusResponse.sendNotFound(res,'Analyses Not Found !')
    }
   return  statusResponse.sendSuccess(res,"Analyses fetched sucessfully",analyses);
  } catch (error) {
    return statusResponse.sendServerError(res, error.message);
  }
};


exports.getAnalysisById = async (req, res) => {
  try {
    const analysis = await Models.Analysis.findById(req.params.id);
    if (!analysis) {
        return statusResponse.sendNotFound(res, 'Analysis not found');
    }
   return  statusResponse.sendSuccess(res,"Analysis Fetched Success",analysis)
  } catch (error) {
    return statusResponse.sendServerError(res, error.message);
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
         statusResponse.sendNotFound(res, 'Analysis not found');
    }
     statusResponse.sendSuccess(res, "Analysis Updated Successfully",updatedAnalysis)
  } catch (error) {
    return statusResponse.sendServerError(res, error.message);
  }
};

exports.deleteAnalysisById = async (req, res) => {
  try {
    const deletedAnalysis = await Models.Analysis.findByIdAndDelete(req.params.id);
    if (!deletedAnalysis) {
        return statusResponse.sendNotFound(res, 'Analysis not found');
      }
   return statusResponse.sendSuccess(res,'Analysis deleted successfully');
  } catch (error) {
    return statusResponse.sendServerError(res, error.message);
  }
};
