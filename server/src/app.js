import 'dotenv/config';

import express from 'express'
import cors from 'cors'

import geminiService from './services/geminiService.js';


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/*
==============================
 PostgreSQL Connection
==============================
*/
import pool from './config/db.js';

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

async function testEmbedding() {
    try {

        const embedding = await geminiService.generateEmbedding(
            "What is Artificial Intelligence?"
        );

        console.log("✅ Embedding Generated");
        console.log("Dimensions:", embedding.length);

    } catch (error) {

        console.error(error);

    }
}
/*
==============================
 Start Server
==============================
*/
const response = await geminiService.generateResponse(
    "What is Artificial Intelligence?"
);

console.log(response);
app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    await connectDB();
    await testEmbedding();
});