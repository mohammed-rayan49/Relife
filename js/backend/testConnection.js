
import {
    supabase,
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
} from "./supabaseClient.js";

export async function testSupabaseConnection() {
    console.log("Starting ReLife connection test...");

    try {
        // Test 1: Check Supabase Auth API health
        const response = await fetch(
            `${SUPABASE_URL}/auth/v1/health`,
            {
                method: "GET",
                headers: {
                    apikey: SUPABASE_PUBLISHABLE_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error(
                `Supabase API error: HTTP ${response.status}`
            );
        }

        console.log("Test 1 PASSED: Supabase API is reachable.");

        // Test 2: Check JavaScript client
        const { data, error } =
            await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        console.log("Test 2 PASSED: Supabase client initialized.");
        console.log(
            "Current session:",
            data.session ? "User logged in" : "No active session"
        );

        return {
            success: true,
            message: "ReLife connected to Supabase successfully!"
        };

    } catch (error) {
        console.error("Connection test failed:", error);

        return {
            success: false,
            message: error.message
        };
    }
}
