import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { supabase } from "../config/supabase";
import { loginUser, registerUser } from "../services/user.services";

export const registerHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const { email, password } = request.payload as {
    email: string;
    password: string;
  };

  try {
    const newUser = await registerUser(email, password);
    return h.response({ user: newUser.user }).code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: message }).code(400);
  }
};

export const loginHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const { email, password } = request.payload as {
    email: string;
    password: string;
  };

  try {
    const user = await loginUser(email, password);
    return h.response({ user }).code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: message }).code(400);
  }
};
