import dotenv from "dotenv";
dotenv.config();

export const getConfig = () => ({
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_ANON_KEY!,
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
});
