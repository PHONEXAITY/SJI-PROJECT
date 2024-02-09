const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyToken,  verifyUser} = require('../middlewares/authMiddleware');

 router.post('/signup', controllers.authController.signup);

router.post('/login', controllers.authController.login);

router.put('/update', controllers.authController.changePassword);

router.get('/getData',verifyToken,verifyUser, controllers.authController.getData);

router.post('/uploadProfile',verifyToken,verifyUser, controllers.authController.postUploadProfile);

router.get('/getProfile',verifyToken,verifyUser, controllers.authController.getProfile);

router.put('/changeProfile', verifyToken,verifyUser, controllers.authController.changeProfile);

router.post('/postRegisterPackage',verifyToken,verifyUser, controllers.authController.postRegisterPackage); 

module.exports = router;