const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken,verifyAdmin, controllers.newsController.createNews);

router.get('/', verifyToken, controllers.newsController.getAllNews);

router.get('/:page?', verifyToken, controllers.newsController.getsAllNews);

router.get('/:id', verifyToken, controllers.newsController.getNewsById);

router.put('/:id', verifyToken,verifyAdmin, controllers.newsController.updateNews);

router.delete('/:id', verifyToken,verifyAdmin, controllers.newsController.isDeleteNews);

router.delete('/:id', verifyToken,verifyAdmin, controllers.newsController.deleteNews);

module.exports = router;
