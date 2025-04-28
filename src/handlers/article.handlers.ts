import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { getArticles } from "../services/article.services";

export const getAllArticlesHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const articles = await getArticles();
    console.log(articles);
    return h.response({ articles }).code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: message }).code(400);
  }
};
