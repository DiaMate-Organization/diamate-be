import Joi from "joi";

export const diabetesFeaturesSchema = Joi.object({
  HighBP: Joi.number().valid(0, 1).required(),
  HighChol: Joi.number().valid(0, 1).required(),
  BMI: Joi.number().min(10).max(50).required(),
  Stroke: Joi.number().valid(0, 1).required(),
  HeartDiseaseorAttack: Joi.number().valid(0, 1).required(),
  PhysActivity: Joi.number().valid(0, 1).required(),
  HvyAlcoholConsump: Joi.number().valid(0, 1).required(),
  AnyHealthcare: Joi.number().valid(0, 1).required(),
  GenHlth: Joi.number().min(1).max(5).required(),
  PhysHlth: Joi.number().min(0).max(30).required(),
  DiffWalk: Joi.number().valid(0, 1).required(),
  Sex: Joi.number().valid(0, 1).required(),
  Age: Joi.number().min(1).max(13).required(),
  Education: Joi.number().min(1).max(6).required(),
  Income: Joi.number().min(1).max(8).required(),
});

export const chatRequestSchema = Joi.object({
  content: Joi.string().min(3).max(500).required().messages({
    "string.base": "Pesan harus berupa teks.",
    "string.empty": "Pesan tidak boleh kosong.",
    "string.min": "Pesan terlalu pendek, minimal 3 karakter.",
    "string.max": "Pesan terlalu panjang, maksimal 500 karakter.",
    "any.required": "Pesan wajib diisi.",
  }),
  role: Joi.string().valid("user", "assistant", "system").required().messages({
    "any.only":
      "Role harus salah satu dari 'user', 'assistant', atau 'system'.",
    "any.required": "Role wajib diisi.",
  }),
});
