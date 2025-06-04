import { getAllArticlesHandler } from "../handlers/article.handlers";
import * as ArticleService from "../services/article.services"; // 👈 akan kita mock

describe("getAllArticlesHandler", () => {
  let mockCode: jest.Mock;
  let mockResponse: jest.Mock;
  let mockH: { response: jest.Mock };

  beforeEach(() => {
    mockCode = jest.fn().mockReturnValue("final response");
    mockResponse = jest.fn().mockReturnValue({ code: mockCode });
    mockH = { response: mockResponse };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return articles with status 200", async () => {
    const fakeArticles = [
      {
        id: "635e67be-4055-4bca-b503-51a47ec57ab8",
        title: "Mengelola Diabetes: Tips Penting untuk Gaya Hidup Sehat",
        content:
          "\u003Ch2\u003EApa itu Diabetes?\u003C/h2\u003E\u003Cp\u003EDiabetes adalah kondisi kronis yang mempengaruhi cara tubuh memproses gula darah (glukosa). Jika tidak dikelola dengan baik, diabetes dapat menyebabkan komplikasi serius.\u003C/p\u003E\u003Ch2\u003ETips Pola Makan\u003C/h2\u003E\u003Cul\u003E\u003Cli\u003EKonsumsi makanan tinggi serat\u003C/li\u003E\u003Cli\u003EBatasi gula tambahan\u003C/li\u003E\u003Cli\u003EKontrol porsi makan\u003C/li\u003E\u003C/ul\u003E\u003Ch2\u003EOlahraga Teratur\u003C/h2\u003E\u003Cp\u003EBerjalan kaki, bersepeda, dan yoga sangat dianjurkan.\u003C/p\u003E",
        author: "dr. Hana Fitriani",
        created_at: "2025-04-28T01:47:55.670279+00:00",
        updated_at: "2025-04-28T01:47:55.670279+00:00",
        thumbnail: "https://source.unsplash.com/featured/?health,diabetes",
      },
      {
        id: "0a052e33-1fd2-4a5e-8926-830fe2f281e3",
        title: "5 Makanan Terbaik untuk Penderita Diabetes",
        content:
          "\u003Ch2\u003EMakanan Sehat untuk Diabetes\u003C/h2\u003E\u003Cp\u003EBerikut adalah daftar makanan yang baik untuk penderita diabetes:\u003C/p\u003E\u003Cul\u003E\u003Cli\u003ESayuran Hijau\u003C/li\u003E\u003Cli\u003EIkan Berlemak\u003C/li\u003E\u003Cli\u003EBuah Berry\u003C/li\u003E\u003Cli\u003EKacang-kacangan\u003C/li\u003E\u003Cli\u003EOatmeal\u003C/li\u003E\u003C/ul\u003E\u003Cp\u003ESemua makanan ini membantu mengontrol kadar gula darah.\u003C/p\u003E",
        author: "dr. Ahmad Yusuf",
        created_at: "2025-04-28T01:47:55.670279+00:00",
        updated_at: "2025-04-28T01:47:55.670279+00:00",
        thumbnail:
          "https://source.unsplash.com/featured/?healthy-food,diabetes",
      },
    ];

    jest.spyOn(ArticleService, "getArticles").mockResolvedValue(fakeArticles);

    const response = await getAllArticlesHandler({} as any, mockH as any);

    expect(ArticleService.getArticles).toHaveBeenCalled();
    expect(mockResponse).toHaveBeenCalledWith({
      error: false,
      articles: fakeArticles,
      message: "Articles retrieved successfully",
    });
    expect(mockCode).toHaveBeenCalledWith(200);
  });

  it("should handle errors and return 400", async () => {
    jest
      .spyOn(ArticleService, "getArticles")
      .mockRejectedValue(new Error("DB error"));

    const response = await getAllArticlesHandler({} as any, mockH as any);

    expect(ArticleService.getArticles).toHaveBeenCalled();
    expect(mockResponse).toHaveBeenCalledWith({
      error: true,
      message: "DB error",
    });
    expect(mockCode).toHaveBeenCalledWith(400);
  });
});
