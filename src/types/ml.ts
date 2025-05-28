export type DiabetesFeatures = Record<
  | "HighBP"
  | "HighChol"
  | "BMI"
  | "Stroke"
  | "HeartDiseaseorAttack"
  | "PhysActivity"
  | "HvyAlcoholConsump"
  | "AnyHealthcare"
  | "GenHlth"
  | "PhysHlth"
  | "DiffWalk"
  | "Sex"
  | "Age"
  | "Education"
  | "Income",
  number
>;

export interface DiabetesPrediction {
  risk: "Rendah" | "Sedang" | "Tinggi";
  probability: number;
}
