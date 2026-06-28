import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Generate AI Response
async function generateResponse(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}

// Generate Embedding
async function generateEmbedding(prompt) {
    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: prompt,
        config: {
            outputDimensionality: 768,
        },
    });

    return response.embeddings[0].values;
}

export default {
    generateResponse,
    generateEmbedding,
};