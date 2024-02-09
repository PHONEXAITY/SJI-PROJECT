const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken,verifyAdmin, controllers.newsController.createNews);

router.get('/', verifyToken,verifyAdmin, controllers.newsController.getAllNews);

router.get('/:page?', verifyToken,verifyAdmin, controllers.newsController.getsAllNews);

router.get('/:id', verifyToken,verifyAdmin, controllers.newsController.getNewsById);

router.put('/:id', verifyToken,verifyAdmin, controllers.newsController.updateNews);

router.delete('/:id', verifyToken,verifyAdmin, controllers.newsController.isDeleteNews);

router.delete('/:id', verifyToken,verifyAdmin, controllers.newsController.deleteNews);

module.exports = router;
