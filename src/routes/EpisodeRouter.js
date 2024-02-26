const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/',verifyToken,verifyAdmin, controllers.epController.createEp);

router.get('/',verifyToken, controllers.epController.getAllEps);

router.get('/:id',verifyToken, controllers.epController.getEpById);

router.put('/:id',verifyToken,verifyAdmin, controllers.epController.updateEp);

router.delete('/:id',verifyToken,verifyAdmin, controllers.epController.deleteEp);

module.exports = router;
