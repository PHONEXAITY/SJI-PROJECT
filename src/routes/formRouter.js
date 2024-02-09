const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, controllers.formController.createForm);

router.get('/', verifyToken, controllers.formController.getAllForms);

router.get('/:id', verifyToken, controllers.formController.getFormById);

router.put('/:id', verifyToken, controllers.formController.updateForm);

router.delete('/:id', verifyToken, controllers.formController.deleteForm);

router.put('/:id/confirm', verifyToken, verifyAdmin, controllers.formController.confirmForm);

router.put('/:id/cancel', verifyToken, verifyAdmin, controllers.formController.cancelForm);

module.exports = router;