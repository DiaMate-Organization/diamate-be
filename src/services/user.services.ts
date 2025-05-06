import { supabase } from "../config/supabase";
import User from "../types/user";
import { generateToken } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";

export const registerUser = async (
  user: Omit<User, "id" | "created_at" | "updated_at">
) => {
  const { data, error } = await supabase
    .from("users")
    .insert({
      ...user,
      password: await hashPassword(user.password),
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

  const isPasswordValid = await comparePassword(password, data.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken(data);

  return token;
};

export const getUser = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
