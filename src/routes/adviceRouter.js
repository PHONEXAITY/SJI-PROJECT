const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Create a new advice
router.post('/', controllers.adviceController.createAdvice);

// Get all advices
router.get('/', controllers.adviceController.getAllAdvices);

// Get advice by ID
router.get('/:id', controllers.adviceController.getAdviceById);

// Update an advice
router.put('/:id', controllers.adviceController.updateAdvice);

// Delete an advice
router.delete('/:id', controllers.adviceController.deleteAdvice);

module.exports = router;
