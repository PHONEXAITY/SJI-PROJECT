const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Create a new service
router.post('/', controllers.serviceController.createService);

// Get all services
router.get('/', controllers.serviceController.getAllServices);

// Get service by ID
router.get('/:id', controllers.serviceController.getServiceById);

// Update a service
router.put('/:id', controllers.serviceController.updateService);

// Delete a service
router.delete('/:id', controllers.serviceController.deleteService);

module.exports = router;
