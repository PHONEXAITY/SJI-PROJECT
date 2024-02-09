const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/',verifyToken,verifyAdmin, controllers.analysisController.createAnalysis);

router.get('/',verifyToken,  controllers.analysisController.getAllAnalyses);

router.get('/:id',verifyToken,  controllers.analysisController.getAnalysisById);

router.put('/:id',verifyToken,verifyAdmin, controllers.analysisController.updateAnalysisById);

router.delete('/:id',verifyToken,verifyAdmin, controllers.analysisController.deleteAnalysisById);


module.exports = router;