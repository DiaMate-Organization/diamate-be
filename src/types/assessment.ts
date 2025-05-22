import { DiabetesFeatures } from "./ml";

export default interface Assessment {
  id: string;
  user_id: string;
  risk_level: string;
  input_features: DiabetesFeatures;
  risk_factors: string[];
  created_at: string;
  updated_at: string;
}
