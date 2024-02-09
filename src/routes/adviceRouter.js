const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const { verifyToken, verifyUser, verifyAdmin } = require('../middlewares/authMiddleware');

router.post('/',verifyToken, verifyAdmin, controllers.adviceController.createAdvice);

router.get('/',verifyToken, controllers.adviceController.getAllAdvices);

router.get('/:id',verifyToken, controllers.adviceController.getAdviceById);

router.put('/:id',verifyToken, verifyAdmin, controllers.adviceController.updateAdvice);

router.delete('/:id',verifyToken, verifyAdmin, controllers.adviceController.deleteAdvice);

module.exports = router;
