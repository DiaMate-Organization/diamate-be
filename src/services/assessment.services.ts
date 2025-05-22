import { supabase } from "../config/supabase";
import Assessment from "../types/assessment";

export const getAssesment = async (id: string) => {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const createAssessment = async (
  assessment: Omit<Assessment, "id" | "created_at" | "updated_at">
): Promise<Assessment> => {
  const { data, error } = await supabase
    .from("assessments")
    .insert({
      ...assessment,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllAssessments = async (
  userId: string
): Promise<Assessment[]> => {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return data;
};
