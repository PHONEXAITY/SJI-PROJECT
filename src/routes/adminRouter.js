const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const { verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/signup', controllers.adminAuth.adminSignup);

router.post('/login', controllers.adminAuth.adminLogin);

router.put('/changePassword', verifyToken,verifyAdmin, controllers.adminAuth.adminChangePassword);

router.get('/get-Customer',verifyToken,verifyAdmin,  controllers.adminAuth.getUserCustomer);

router.get('/getAll', verifyToken, verifyAdmin, controllers.adminAuth.getAllUsers);

router.delete('/:id', verifyToken, verifyAdmin, controllers.adminAuth.deleteUserCustomer);

router.delete('/admin/:id', verifyToken, verifyAdmin, controllers.adminAuth.deleteUserAdmin);


module.exports = router;
