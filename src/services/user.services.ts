import { supabase } from "../config/supabase";
import User from "../types/user";
import { generateToken } from "../utils/jwt";
import { comparePassword } from "../utils/password";

export const registerUser = async (
  user: Omit<User, "id" | "created_at" | "updated_at">
) => {
  const { data, error } = await supabase
    .from("users")
    .insert({
      ...user,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw new Error(error.message);

  const isPasswordValid = comparePassword(password, data.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(data);

  return token;
};
