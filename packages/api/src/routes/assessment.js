/* eslint-disable no-console */
const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);
const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;

      console.log(assessment);
      const val = await AssessmentService.submit(assessment);

      console.log(val);

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters

      ResponseHandler(
        res,
        `Assessment Submitted Successfully`,
        { assessment },
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/list`,

  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const { assessments } = req.body;
      console.log(assessments);
      const data = await AssessmentService.getList();
      ResponseHandler(
        res,
        `Assessment Fetched Successfully`,
        data,
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.delete(
  `/assessment/delete/:id`,
  async (req, res, next) => {
    try {
      console.log(req.params);
      // eslint-disable-next-line no-unused-vars
      const result = await AssessmentService.deleteAssessment(req.params);
      ResponseHandler(
        res,
        `Assessment Deleted Successfully`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);
module.exports = { assessmentRouter };
