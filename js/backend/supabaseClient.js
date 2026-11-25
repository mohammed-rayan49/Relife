
import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ReLife Supabase credentials
export const SUPABASE_URL =
    "https://rpngwomoiukakcqofzcn.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_RA_Nec5X8nnb_vdlPd1gnA_tPI4JvLk";

// Validate credentials
if (
    SUPABASE_URL.includes("YOUR_") ||
    SUPABASE_PUBLISHABLE_KEY.includes("YOUR_")
) {
    throw new Error("Supabase credentials are missing.");
}

// Initialize Supabase client
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

console.log("ReLife Supabase client initialized!");
