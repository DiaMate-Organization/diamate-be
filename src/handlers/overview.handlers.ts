import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { getAllAssessments } from "../services/assessment.services";
import Assessment from "../types/assessment";
import {
  countRiskPerMonth,
  generateTopRiskFactorRecommendations,
  getAverageRisk,
  getCurrentAsessments,
  getTopRiskFactorsWithCount,
  simplifyAssessments,
} from "../utils/summary";

export const getOverviewHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const user = (request as any).auth;
    const assessments: Assessment[] = await getAllAssessments(user.id);

    const totalAssessments = assessments.length;
    const avgRisk = getAverageRisk(assessments);
    const currentAssessments = getCurrentAsessments(assessments);
    const chart = countRiskPerMonth(assessments);

    const overview = {
      average_risk: avgRisk,
      total_assessments: totalAssessments,
      current_assessments: currentAssessments,
      chart,
    };

    return h.response({
      error: false,
      overview,
      message: "User retrieved successfully",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};

export const getReportHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const user = (request as any).auth;
    const assessments: Assessment[] = await getAllAssessments(user.id);

    const totalAssessments = assessments.length;

    const avgRisk = getAverageRisk(assessments);

    const currentAssessments = getCurrentAsessments(assessments);

    const chart = countRiskPerMonth(assessments);

    const topRiskFactor = getTopRiskFactorsWithCount(assessments);

    const recommendations = generateTopRiskFactorRecommendations(topRiskFactor);

    const report = {
      summary: {
        total_assessments: totalAssessments,
        average_risk: avgRisk,
        most_common_risk_factors: topRiskFactor,
      },
      current_assessments: simplifyAssessments(currentAssessments),
      chart,
      notes: recommendations,
    };

    return h.response({
      error: false,
      report,
      message: "User retrieved successfully",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};
