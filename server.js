import "dotenv/config";
import { supabase } from "./js/backend/supabaseServerClient.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic API route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ReLife API",
        status: "Running successfully"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        project: "ReLife",
        backend: "Connected",
        status: "Healthy"
    });
});

app.get("/api/supabase-status", (req, res) => {
    res.json({
        project: "ReLife",
        supabaseClient: supabase ? "Initialized" : "Not initialized"
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`ReLife backend running at http://localhost:${PORT}`);
});
