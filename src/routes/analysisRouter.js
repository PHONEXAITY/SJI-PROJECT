const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/', controllers.analysisController.createAnalysis);

router.get('/',  controllers.analysisController.getAllAnalyses);

router.get('/:id',  controllers.analysisController.getAnalysisById);

router.put('/:id', controllers.analysisController.updateAnalysisById);

router.put('/:id', controllers.analysisController.deleteAnalysisById);


module.exports = router;