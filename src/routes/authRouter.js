const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyToken,  verifyUser} = require('../middlewares/authMiddleware');

 router.post('/signup', controllers.authController.signup);

router.post('/login', controllers.authController.login);

router.post('/logout', controllers.authController.logout);

router.put('/update', controllers.authController.changePassword);

router.get('/getData',verifyToken, controllers.authController.getData);

router.post('/profile',verifyToken, controllers.authController.UploadProfile);

router.get('/get-profile',verifyToken, controllers.authController.fetchProfile);

router.put('/changeProfile', verifyToken, controllers.authController.changeProfile);

router.post('/postRegisterPackage',verifyToken,verifyUser, controllers.authController.postRegisterPackage); 

module.exports = router;