import geminiService from "./geminiService.js";
import cacheRepository from "../repositories/cacheRepository.js";

// Similarity threshold for cache hits (defaults to 0.82)
const SIMILARITY_THRESHOLD = parseFloat(process.env.SIMILARITY_THRESHOLD) || 0.82;

async function chat(prompt) {
  // 1. Generate embedding for the input prompt
  const embedding = await geminiService.generateEmbedding(prompt);

  // 2. Query cache for a semantically similar prompt
  const cachedHit = await cacheRepository.findSimilarCache(embedding, SIMILARITY_THRESHOLD);

  if (cachedHit) {
    // 3. Cache Hit: Increment hits metric and return cached response
    await cacheRepository.incrementMetrics(true);
    return {
      source: "cache",
      response: cachedHit.response,
    };
  }

  // 4. Cache Miss: Query Gemini to generate a new response
  const generatedResponse = await geminiService.generateResponse(prompt);

  // 5. Store new prompt, response, and embedding in cache
  await cacheRepository.saveCache(prompt, generatedResponse, embedding);

  // 6. Increment misses metric
  await cacheRepository.incrementMetrics(false);

  return {
    source: "api",
    response: generatedResponse,
  };
}

export default {
  chat,
};
