const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Create a new episode
router.post('/', controllers.epController.createEp);

// Get all episodes
router.get('/', controllers.epController.getAllEps);

// Get episode by ID
router.get('/:id', controllers.epController.getEpById);

// Update an episode
router.put('/:id', controllers.epController.updateEp);

// Delete an episode
router.delete('/:id', controllers.epController.deleteEp);

module.exports = router;
