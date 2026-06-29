import pool from "../config/db.js";

async function savePrompt({
    prompt,
    response,
    embedding,
    embeddingModel,
}) {

    const query = `
        INSERT INTO prompt_cache
        (
            prompt,
            response,
            embedding,
            embedding_model
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *;
    `;

    const values = [
        prompt,
        response,
        `[${embedding.join(",")}]`,   // pgvector format
        embeddingModel,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}
async function findSimilarPrompt(
    embedding,
    threshold = 0.10
) {

    const query = `
        SELECT
            *,
            embedding <=> $1 AS distance
        FROM prompt_cache
        WHERE embedding <=> $1 < $2
        ORDER BY distance
        LIMIT 1;
    `;

    const values = [
        `[${embedding.join(",")}]`,
        threshold,
    ];

    const result = await pool.query(query, values);

    return result.rows[0] || null;
}
export default {
    savePrompt,
    findSimilarPrompt,
};