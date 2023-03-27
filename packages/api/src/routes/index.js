const express = require(`express`);
const { pingRouter } = require(`./ping`);
const { assessmentRouter } = require(`./assessment`);
const { userRouter } = require(`./user`);

const router = express.Router();

router.use(`/ping`, pingRouter);
router.post(`/assessment/submit`, assessmentRouter);
router.get(`/assessment/list`, assessmentRouter);
router.use(`/assessment`, assessmentRouter);
router.use(`/user`, userRouter);
router.delete(`/assessment/delete/:id`, assessmentRouter);

module.exports = { router };
