import dotenv from "dotenv";
dotenv.config();

export const getConfig = () => ({
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_ANON_KEY!,
});
