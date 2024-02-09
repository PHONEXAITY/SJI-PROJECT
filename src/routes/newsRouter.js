const express = require('express');
const router = express.Router();
const controllers = require('../controllers');


router.post('/', controllers.newsController.createNews);

router.get('/', controllers.newsController.getAllNews);

router.get('/:page?', controllers.newsController.getsAllNews);

router.get('/:id', controllers.newsController.getNewsById);

router.put('/:id', controllers.newsController.updateNews);

router.delete('/:id', controllers.newsController.isDeleteNews);

router.delete('/:id',controllers.newsController.deleteNews);

module.exports = router;
