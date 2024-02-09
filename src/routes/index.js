const express = require('express');
const bannerRouter = require('./bannerRouter');
const newsRouter = require('./newsRouter');
const analysisRouter = require('./analysisRouter');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const serviceRouter = require('./serviceRouter');
const adviceRouter = require('./adviceRouter');
const EpRouter = require('./EpisodeRouter');


const router = express.Router();

router.use('/banners', bannerRouter);
router.use('/news', newsRouter);
router.use('/analysis', analysisRouter);
router.use('/user', authRouter);
router.use('/auth',adminRouter);
router.use('/services', serviceRouter);
router.use('/advices', adviceRouter);
router.use('/EP', EpRouter);

module.exports = router;