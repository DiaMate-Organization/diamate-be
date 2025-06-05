import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { getArticleBySlug, getArticles } from "../services/article.services";

export const getAllArticlesHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const articles = await getArticles();
    return h
      .response({
        error: false,
        articles,
        message: "Articles retrieved successfully",
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};

export const getArticleHandler = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    const { slug } = request.params;

    const article = await getArticleBySlug(slug);

    return h.response({
      error: false,
      article,
      message: "Article retrieved successfully",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};
