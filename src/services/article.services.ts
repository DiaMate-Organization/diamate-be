import { supabase } from "../config/supabase";

export const getArticles = async () => {
  const { data, error } = await supabase.from("articles").select("*");
  if (error) throw new Error(error.message);

  return data;
};
