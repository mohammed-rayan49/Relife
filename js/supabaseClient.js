
import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL =
  "https://rpngwomoiukakcqofzcn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_RA_Nec5X8nnb_vdlPd1gnA_tPI4JvLk";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);
