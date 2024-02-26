const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/',verifyToken,verifyAdmin, controllers.bannerController.createBanner);

router.get('/',verifyToken,  controllers.bannerController.getBanners);

router.get('/:id',verifyToken,  controllers.bannerController.getBannerById);

router.put('/:id', verifyToken,verifyAdmin, controllers.bannerController.updateBanner);

router.delete('/:id', verifyToken,verifyAdmin, controllers.bannerController.deleteBanner);


module.exports = router;