import { Request, ResponseToolkit, ServerRoute } from "@hapi/hapi";
import { authMiddleware } from "../middlewares/auth";
import { diabetesFeaturesSchema } from "../validations";
import {
  createAssessmentHandler,
  deleteAssessmentHandler,
  getAllAssessmentsHandler,
  getAssessmentHandler,
} from "../handlers/assessment.handlers";

export const assessmentRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/assessment",
    options: {
      pre: [{ method: authMiddleware }],
      validate: {
        payload: diabetesFeaturesSchema,
        failAction: (req: Request, h: ResponseToolkit, err) => {
          const message =
            err instanceof Error ? err.message : JSON.stringify(err);

          return h.response({ error: true, message }).code(400).takeover();
        },
      },
    },
    handler: createAssessmentHandler,
  },
  {
    method: "GET",
    path: "/assessment",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: getAllAssessmentsHandler,
  },
  {
    method: "GET",
    path: "/assessment/{id}",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: getAssessmentHandler,
  },
  {
    method: "DELETE",
    path: "/assessment/{id}",
    options: {
      pre: [{ method: authMiddleware }],
    },
    handler: deleteAssessmentHandler,
  },
];
