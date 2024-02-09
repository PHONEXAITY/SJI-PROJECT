const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const { verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, verifyAdmin, controllers.serviceController.createService);

router.get('/', verifyToken, verifyAdmin, controllers.serviceController.getAllServices);

router.get('/:id', verifyToken, verifyAdmin, controllers.serviceController.getServiceById);

router.put('/:id', verifyToken, verifyAdmin, controllers.serviceController.updateService);

router.delete('/:id', verifyToken, verifyAdmin, controllers.serviceController.deleteService);

module.exports = router;
