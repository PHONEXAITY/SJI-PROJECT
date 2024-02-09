const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyToken,  verifyUser} = require('../utils/verifyToken');

 router.post('/signup', controllers.authController.signup);

router.post('/login', controllers.authController.login);

router.put('/update', controllers.authController.changePassword);

router.get('/getData',verifyToken, controllers.authController.getData);

router.post('/uploadProfile',verifyToken, controllers.authController.postUploadProfile);

router.get('/getProfile',verifyToken, controllers.authController.getProfile);

router.put('/changeProfile', verifyToken, controllers.authController.changeProfile);

router.post('/postRegisterPackage',verifyToken, controllers.authController.postRegisterPackage); 

module.exports = router;