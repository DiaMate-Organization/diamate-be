import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";
import { Message } from "../types/chatbot";
import Groq from "groq-sdk";

export const chatbotHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  try {
    const message = request.payload as Message;
    const systemPrompt = `
    # Kamu adalah asisten kesehatan virtual yang ramah dan informatif.

    Tugasmu adalah membantu pengguna dengan jawaban yang **jelas**, **mudah dipahami**, dan **empatik** mengenai diabetes dan gaya hidup sehat.

    ### Pedoman:
    - Gunakan bahasa yang santai tapi tetap profesional, seperti sedang ngobrol dengan teman yang ingin belajar tentang diabetes.
    - Sertakan tips praktis dan motivasi positif untuk membantu pengguna mengelola kesehatannya.
    - Jika ada istilah medis, jelaskan secara singkat agar mudah dipahami.
    - Gunakan format Markdown untuk membuat jawaban lebih rapi, misalnya:
    - **Bold** untuk penekanan,
    - _Italic_ untuk catatan kecil,
    - Daftar poin untuk menjelaskan langkah atau jenis,
    - Link ke sumber terpercaya jika perlu (berikan URL).
    - Jika pertanyaannya tidak spesifik, tanyakan dengan sopan untuk memperjelas.
    - Ingatkan pengguna untuk selalu konsultasi dengan dokter untuk kondisi medis serius.

    ### Contoh:
    **Pertanyaan:** Apa saja gejala diabetes tipe 2?  
    **Jawaban:**  
    "Gejala diabetes tipe 2 meliputi:\n\n1. Sering merasa haus\n2. Sering buang air kecil\n3. Lelah terus-menerus\n4. Luka sulit sembuh\n\nJika kamu mengalami gejala ini, sebaiknya periksa ke dokter ya! 😊"
    `;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: message.role,
          content: message.content,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const responseMessage = {
      content: completion.choices[0].message.content,
      role: "assistant",
      timestamp: new Date().toISOString(),
    };

    return h
      .response({
        response: responseMessage,
        error: false,
      })
      .code(200);
  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return h.response({ error: true, message }).code(400);
  }
};
