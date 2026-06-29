import pool from "../config/db.js";

async function recordCacheHit() {

    const query = `
        UPDATE cache_metrics
        SET
            total_requests = total_requests + 1,
            cache_hits = cache_hits + 1,
            api_calls_saved = api_calls_saved + 1,
            updated_at = NOW()
        WHERE id = 1;
    `;

    await pool.query(query);

}

async function recordCacheMiss() {

    const query = `
        UPDATE cache_metrics
        SET
            total_requests = total_requests + 1,
            cache_misses = cache_misses + 1,
            updated_at = NOW()
        WHERE id = 1;
    `;

    await pool.query(query);

}

async function getMetrics() {

    const result = await pool.query(
        "SELECT * FROM cache_metrics WHERE id = 1"
    );

    return result.rows[0];

}

export default {

    recordCacheHit,

    recordCacheMiss,

    getMetrics,

};