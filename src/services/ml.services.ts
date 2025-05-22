import * as tf from "@tensorflow/tfjs-node";
import { DiabetesFeatures, DiabetesPrediction } from "../types/ml";

export async function loadModel() {
  try {
    const model = await tf.loadLayersModel("file://ml_model/model.json");
    console.log("\nModel loaded successfully!");
    return model;
  } catch (error) {
    console.error("Error loading or using the model:", error);
    throw error;
  }
}

function scaler(features: number[]): number[] {
  const maxValues = [1, 1, 50, 1, 1, 1, 1, 1, 5, 30, 1, 1, 13, 6, 8];
  return features.map((f, i) => f / maxValues[i]);
}

function padFeatures(x: number[], targetDim: number): tf.Tensor4D {
  const targetLength = targetDim * targetDim;
  if (x.length > targetLength)
    throw new Error("Target dimension terlalu kecil");

  const padded = new Array(targetLength).fill(0);
  for (let i = 0; i < x.length; i++) {
    padded[i] = x[i];
  }

  return tf.tensor4d(padded, [1, targetDim, targetDim, 1]);
}

export async function predictDiabetes(
  model: tf.LayersModel,
  features: Record<string, number>
): Promise<DiabetesPrediction> {
  const featureOrder = [
    "HighBP",
    "HighChol",
    "BMI",
    "Stroke",
    "HeartDiseaseorAttack",
    "PhysActivity",
    "HvyAlcoholConsump",
    "AnyHealthcare",
    "GenHlth",
    "PhysHlth",
    "DiffWalk",
    "Sex",
    "Age",
    "Education",
    "Income",
  ];

  const featureArray = featureOrder.map((key) => {
    if (!(key in features)) throw new Error(`Missing feature: ${key}`);
    return features[key];
  });

  const scaled = scaler(featureArray);

  const inputTensor = padFeatures(scaled, 4);

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
  if (input.Stroke === 1) risks.push("History of Stroke");
  if (input.HeartDiseaseorAttack === 1) risks.push("Heart Disease or Attack");
  if (input.PhysActivity === 0) risks.push("Physical Inactivity");
  if (input.HvyAlcoholConsump === 1) risks.push("Heavy Alcohol Consumption");
  if (input.AnyHealthcare === 0) risks.push("No Healthcare Access");
  if (input.GenHlth >= 4) risks.push("Poor General Health");
  if (input.PhysHlth >= 15) risks.push("Frequent Physical Health Problems");
  if (input.DiffWalk === 1) risks.push("Difficulty Walking");
  if (input.Sex === 1) risks.push("Male");
  if (input.Age >= 10) risks.push("Older Age");
  if (input.Education <= 2) risks.push("Low Education Level");
  if (input.Income <= 2) risks.push("Low Income");

  return risks;
}
