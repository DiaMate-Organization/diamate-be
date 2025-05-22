import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { detectRiskFactors, predictDiabetes } from "../services/ml.services";
import { DiabetesFeatures } from "../types/ml";
import {
  createAssessment,
  deleteAssessment,
  getAllAssessments,
  getAssesment,
} from "../services/assessment.services";
import { authMiddleware } from "../middlewares/auth";
import { request } from "http";

export const createAssessmentHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const features = request.payload as DiabetesFeatures;

    const authenticatedUser = (request as any).auth;

    const { model } = request.server.app;

    if (!model) {
      throw new Error("Model belum diload.");
    }

    const resultPredict = await predictDiabetes(model, features);

    const riskFactor = detectRiskFactors(features);

    const assessment = {
      user_id: authenticatedUser.id as string,
      input_features: features,
      risk_factors: riskFactor,
      risk_level: resultPredict.risk,
    };

    const data = await createAssessment(assessment);

    return h
      .response({
        data,
        error: false,
        message: "Assessment created successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};

export const getAllAssessmentsHandler = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const authenticatedUser = (request as any).auth;

    const data = await getAllAssessments(authenticatedUser.id);

    return h
      .response({
        data,
        error: false,
        message: "Assessments retrieved successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};

export const getAssessmentHandler = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    const data = await getAssesment(id);

    if (!data) {
      return h
        .response({
          error: true,
          message: "Assessment not found",
        })
        .code(404);
    }

    return h
      .response({
        data,
        error: false,
        message: "Assessments retrieved successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};

export const deleteAssessmentHandler = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { id } = request.params;

    const data = await deleteAssessment(id);

    return h
      .response({
        data,
        error: false,
        message: "Assessments deleted successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};
