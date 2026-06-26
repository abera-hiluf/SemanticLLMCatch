require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/*
==============================
 PostgreSQL Connection
==============================
*/
const pool = require("./config/db");

/*
==============================
 Test Database Connection
==============================
*/

async function connectDB() {
    try {
        await pool.query("SELECT NOW()");
        console.log("✅ Connected to Supabase PostgreSQL");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
    }
}

/*
==============================
 Routes
==============================
*/

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Semantic LLM Cache API Running 🚀",
    });
});

/*
==============================
 Start Server
==============================
*/

app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    await connectDB();
});