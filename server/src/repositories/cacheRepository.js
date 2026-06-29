import pool from "../config/db.js";

// Helper to format embedding array to PostgreSQL vector string format: [0.1,0.2,...]
function formatVector(embedding) {
  if (!Array.isArray(embedding)) {
    throw new Error("Embedding must be an array of numbers");
  }
  return `[${embedding.join(",")}]`;
}

// Find similar prompt in cache using Cosine distance
async function findSimilarCache(embeddingVector, threshold = 0.90) {
  const vectorStr = formatVector(embeddingVector);
  const query = `
    SELECT id, prompt, response, 1 - (embedding <=> $1::vector) AS similarity 
    FROM prompt_cache 
    WHERE 1 - (embedding <=> $1::vector) >= $2
    ORDER BY similarity DESC 
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [vectorStr, threshold]);
  return rows[0] || null;
}

// Save a prompt response to cache
async function saveCache(prompt, response, embeddingVector, modelName = "gemini-embedding-001") {
  const vectorStr = formatVector(embeddingVector);
  const query = `
    INSERT INTO prompt_cache (prompt, response, embedding, embedding_model, created_at)
    VALUES ($1, $2, $3::vector, $4, NOW())
    RETURNING id
  `;
  const { rows } = await pool.query(query, [prompt, response, vectorStr, modelName]);
  return rows[0];
}

// Update cache usage metrics (Upsert single row at id = 1)
async function incrementMetrics(isHit) {
  const hits = isHit ? 1 : 0;
  const misses = isHit ? 0 : 1;
  const saved = isHit ? 1 : 0;

  const query = `
    INSERT INTO cache_metrics (id, total_requests, cache_hits, cache_misses, api_calls_saved, updated_at)
    VALUES (1, 1, $1, $2, $3, NOW())
    ON CONFLICT (id) DO UPDATE SET
      total_requests = cache_metrics.total_requests + 1,
      cache_hits = cache_metrics.cache_hits + $1,
      cache_misses = cache_metrics.cache_misses + $2,
      api_calls_saved = cache_metrics.api_calls_saved + $3,
      updated_at = NOW()
  `;
  await pool.query(query, [hits, misses, saved]);
}

// Get cache usage metrics
async function getMetrics() {
  const query = `
    SELECT total_requests, cache_hits, cache_misses, api_calls_saved, updated_at
    FROM cache_metrics
    WHERE id = 1
  `;
  const { rows } = await pool.query(query);
  return rows[0] || null;
}

// Find similar prompt in cache using Cosine similarity
async function findSimilarPrompt(embeddingVector, threshold = 0.82) {
  const vectorStr = formatVector(embeddingVector);
  const query = `
    SELECT id, prompt, response, 1 - (embedding <=> $1::vector) AS similarity 
    FROM prompt_cache 
    WHERE 1 - (embedding <=> $1::vector) >= $2
    ORDER BY similarity DESC 
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [vectorStr, threshold]);
  return rows[0] || null;
}

// Save a prompt response to cache
async function savePrompt({ prompt, response, embedding, embeddingModel = "gemini-embedding-001" }) {
  const vectorStr = formatVector(embedding);
  const query = `
    INSERT INTO prompt_cache (prompt, response, embedding, embedding_model, created_at)
    VALUES ($1, $2, $3::vector, $4, NOW())
    RETURNING *
  `;
  const { rows } = await pool.query(query, [prompt, response, vectorStr, embeddingModel]);
  return rows[0];
}

export default {
  findSimilarCache,
  saveCache,
  incrementMetrics,
  getMetrics,
  findSimilarPrompt,
  savePrompt,
};

