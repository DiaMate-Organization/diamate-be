import { createClient } from "@supabase/supabase-js";
import { getConfig } from ".";

const config = getConfig();

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);
