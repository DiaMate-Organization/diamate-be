import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

export const registerHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  return h.response({ msg: "CONSOLE LOG" });
};
