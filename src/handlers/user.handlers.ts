import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { supabase } from "../config/supabase";
import { getUser, loginUser, registerUser } from "../services/user.services";

export const registerHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const data = request.payload as {
    fullname: string;
    email: string;
    password: string;
    age: number;
    gender: "Laki Laki" | "Perempuan";
  };

  try {
    const newUser = await registerUser(data);

    return h
      .response({
        error: false,
        user: newUser,
        message: "User registered successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
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
    const token = await loginUser(email, password);
    return h
      .response({ error: false, token, message: "User sign-in successfully" })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};

export const profileHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const authenticatedUser = (request as any).auth;
  try {
    const user = await getUser(authenticatedUser.id);
    return h.response({
      error: false,
      message: "User retrieved successfully",
      user,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};
