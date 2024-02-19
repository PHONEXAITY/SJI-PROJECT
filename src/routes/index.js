const express = require('express');
const bannerRouter = require('./bannerRouter');
const newsRouter = require('./newsRouter');
const analysisRouter = require('./analysisRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const serviceRouter = require('./serviceRouter');
const adviceRouter = require('./adviceRouter');
const EpRouter = require('./EpisodeRouter');
const courseRouter = require('./courseRouter');
const formRouter = require('./formRouter');
const roomRouter = require('./roomRouter');


const router = express.Router();

router.use('/banners', bannerRouter);
router.use('/news', newsRouter);
router.use('/analysis', analysisRouter);
router.use('/user', authRouter);
router.use('/auth',adminRouter);
router.use('/services', serviceRouter);
router.use('/advices', adviceRouter);
router.use('/EP', EpRouter);
router.use('/courses', courseRouter);
router.use('/form', formRouter);
router.use('/room', roomRouter);

module.exports = router;