import { supabase } from "../config/supabase";

export const getArticles = async () => {
  const { data, error } = await supabase.from("articles").select("*");
  if (error) throw new Error(error.message);

  return data;
};

export const getArticleBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw new Error(error.message);

  return data;
};
