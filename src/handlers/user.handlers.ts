import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { supabase } from "../config/supabase";

export const registerHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const { email, password } = request.payload as {
    email: string;
    password: string;
  };

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return h.response({ error: error.message }).code(400);
  }

  return h.response({ user: data.user }).code(200);
};
