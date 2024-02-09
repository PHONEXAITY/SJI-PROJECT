const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/signup', controllers.adminAuth.adminSignup);

router.post('/login', controllers.adminAuth.adminLogin);

router.put('/changePassword', controllers.adminAuth.adminChangePassword);

router.get('/get-Customer', controllers.adminAuth.getUserCustomer);

router.get('/getAll', controllers.adminAuth.getAllUsers);

router.delete('/:id', controllers.adminAuth.deleteUserCustomer);

router.delete('/admin/:id',controllers.adminAuth.deleteUserAdmin);

module.exports = router ;