const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const { verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, verifyAdmin, controllers.roomController.createRoom);

router.get('/', verifyToken, verifyAdmin, controllers.roomController.getAllRooms);

router.get('/:id', verifyToken, verifyAdmin, controllers.roomController.getRoomById);

router.put('/:id', verifyToken, verifyAdmin, controllers.roomController.updateRoom);

router.delete('/:id', verifyToken, verifyAdmin, controllers.roomController.deleteRoom);


module.exports = router;