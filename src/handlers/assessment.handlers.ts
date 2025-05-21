import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { predictDiabetes } from "../services/ml.services";
import { DiabetesFeatures } from "../types/ml";

export const createAssessmentHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const features = request.payload as DiabetesFeatures;

    const { model } = request.server.app;

    if (!model) {
      throw new Error("Model belum diload.");
    }

    const result = await predictDiabetes(model, features);

    return h
      .response({
        result,
        error: false,
        message: "Assessment created successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};
