const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Create a new banner
router.post('/', controllers.bannerController.createBanner);

// Get all banners
router.get('/',  controllers.bannerController.getBanners);

// Get a specific banner by ID
router.get('/:id',  controllers.bannerController.getBannerById);

// Update a banner by ID
router.put('/:id',  controllers.bannerController.updateBanner);

// Delete a banner by ID
router.delete('/:id',  controllers.bannerController.deleteBanner);


module.exports = router;