const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken,verifyAdmin, controllers.courseController.createCourse);

router.get('/',verifyToken, controllers.courseController.getAllCourses);

router.get('/:id',verifyToken, controllers.courseController.getCourseById);

router.put('/:id',verifyToken,verifyAdmin, controllers.courseController.updateCourse);

router.delete('/:id',verifyToken,verifyAdmin, controllers.courseController.deleteCourse);

module.exports = router;
