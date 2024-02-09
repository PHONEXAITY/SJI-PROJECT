const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const {verifyAdmin, verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken,verifyAdmin, controllers.courseController.createCourse);

router.get('/',verifyToken,verifyAdmin, controllers.courseController.getAllCourses);

router.get('/:id',verifyToken,verifyAdmin, controllers.courseController.getCourseById);

router.put('/:id',verifyToken,verifyAdmin, controllers.courseController.updateCourse);

router.delete('/:id',verifyToken,verifyAdmin, controllers.courseController.deleteCourse);

module.exports = router;
