import * as tf from "@tensorflow/tfjs-node";
import { DiabetesFeatures, DiabetesPrediction } from "../types/ml";

export async function loadModel(): Promise<tf.LayersModel> {
  try {
    const model = await tf.loadLayersModel("file://ml_model/model.json");
    console.log("\nModel loaded successfully!");
    return model;
  } catch (error) {
    console.error("Error loading or using the model:", error);
    throw error;
  }
}

const featureOrder = [
  "HighBP",
  "HighChol",
  "BMI",
  "HeartDiseaseorAttack",
  "GenHlth",
  "PhysHlth",
  "DiffWalk",
  "Age",
  "Education",
  "Income",
];

const meanValues = {
  BMI: 28.0,
  PhysHlth: 10.0,
};

const stdValues = {
  BMI: 5.0,
  PhysHlth: 8.0,
};

function standardScale(value: number, mean: number, std: number): number {
  return (value - mean) / std;
}

function scaler(features: Record<string, number>): number[] {
  return featureOrder.map((key) => {
    const val = features[key];
    if (val === undefined) throw new Error(`Missing feature ${key}`);

    if (key === "BMI") return standardScale(val, meanValues.BMI, stdValues.BMI);
    if (key === "PhysHlth")
      return standardScale(val, meanValues.PhysHlth, stdValues.PhysHlth);

    return val;
  });
}

export async function predictDiabetes(
  model: tf.LayersModel,
  features: Record<string, number>
): Promise<DiabetesPrediction> {
  const scaledFeatures = scaler(features);
  const inputTensor = tf.tensor2d([scaledFeatures], [1, scaledFeatures.length]);
  const predictionTensor = model.predict(inputTensor) as tf.Tensor;
  const probability = (await predictionTensor.data())[0];

  const risk =
    probability < 0.3 ? "Rendah" : probability < 0.6 ? "Sedang" : "Tinggi";

  return {
    risk,
    probability,
  };
}

export function detectRiskFactors(input: DiabetesFeatures): string[] {
  const risks: string[] = [];

  if (input.HighBP === 1) risks.push("High Blood Pressure");
  if (input.HighChol === 1) risks.push("High Cholesterol");
  if (input.BMI >= 30) risks.push("Obesity");
  if (input.HeartDiseaseorAttack === 1) risks.push("Heart Disease or Attack");
  if (input.GenHlth >= 4) risks.push("Poor General Health");
  if (input.PhysHlth >= 15) risks.push("Frequent Physical Health Problems");
  if (input.DiffWalk === 1) risks.push("Difficulty Walking");
  if (input.Age >= 10) risks.push("Older Age");
  if (input.Education <= 1) risks.push("Low Education Level");

  return risks;
}
