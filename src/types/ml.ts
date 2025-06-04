export type DiabetesFeatures = Record<
  | "HighBP"
  | "HighChol"
  | "BMI"
  | "HeartDiseaseorAttack"
  | "GenHlth"
  | "PhysHlth"
  | "DiffWalk"
  | "Age"
  | "Education"
  | "Income",
  number
>;

export interface DiabetesPrediction {
  risk: "Rendah" | "Sedang" | "Tinggi";
  probability: number;
}
