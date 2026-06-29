import React from 'react';
import './ResponseCard.css';

/**
 * ResponseCard component displaying query prompt, AI response text, source badges, and latency metrics.
 * @param {object} props
 * @param {string} props.query - Original query input by user
 * @param {string} props.response - Generated or cached output text
 * @param {string} props.source - Source string ('cache' | 'gemini')
 * @param {number} props.latency - Response round-trip time in milliseconds
 */
function ResponseCard({ query, response, source, latency }) {
  const isCache = source?.toLowerCase() === 'cache';

  return (
    <div className="response-container-card">
      <div className="query-header-row">
        <span className="query-meta-tag">Prompt</span>
        <p className="query-text-content">{query}</p>
      </div>

      <div className="response-body-block">
        <pre className="response-code-output">{response}</pre>
      </div>

      <div className="response-meta-footer">
        <div className="meta-badge-group">
          <span className="meta-badge-label">Source</span>
          {isCache ? (
            <span className="badge-pill cache-hit">CACHE HIT</span>
          ) : (
            <span className="badge-pill gemini">GEMINI</span>
          )}
        </div>

        <div className="meta-badge-group">
          <span className="meta-badge-label">Latency</span>
          <span className="badge-pill latency">
            {latency}ms
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResponseCard;
