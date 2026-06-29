import geminiService from "./geminiService.js";
import cacheRepository from "../repositories/cacheRepository.js";
import metricsRepository from "../repositories/metricsRepository.js";
import { logger } from "../utils/logger.js";

async function chat(prompt) {

    // Start measuring request time
    const startTime = Date.now();

    // Step 1: Generate embedding for the user's prompt
    const embedding = await geminiService.generateEmbedding(prompt);

    // Step 2: Search for a semantically similar prompt
    const cached = await cacheRepository.findSimilarPrompt(embedding);

    // ==========================
    // CACHE HIT
    // ==========================
    if (cached) {

        logger.info("✅ CACHE HIT");

        // Update cache statistics
        await metricsRepository.recordCacheHit();

        // Calculate response latency
        const latency = Date.now() - startTime;

        return {
            source: "cache",
            response: cached.response,
            latency,
        };
    }

    // ==========================
    // CACHE MISS
    // ==========================
    logger.info("❌ CACHE MISS");

    // Step 3: Generate a new response from Gemini
    const response = await geminiService.generateResponse(prompt);

    // Step 4: Save prompt, response, and embedding
    await cacheRepository.savePrompt({
        prompt,
        response,
        embedding,
        embeddingModel: "gemini-embedding-001",
    });

    // Step 5: Update cache statistics
    await metricsRepository.recordCacheMiss();

    // Calculate response latency
    const latency = Date.now() - startTime;

    return {
        source: "gemini",
        response,
        latency,
    };
}

export default {
    chat,
};