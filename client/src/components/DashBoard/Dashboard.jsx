import React, { useState, useEffect } from 'react';
import MetricCard from '../MetricCard/MetricCard.jsx';
import PromptBox from '../PromptBox/PromptBox.jsx';
import ResponseCard from '../ResponseCard/ResponseCard.jsx';
import { getCacheMetrics, sendChatPrompt } from '../../services/api.js';
import './Dashboard.css';

/**
 * Dashboard component managing chat playground state and cache analytics cards.
 */
function Dashboard() {
  const [metrics, setMetrics] = useState({
    total_requests: 0,
    cache_hits: 0,
    cache_misses: 0,
    api_calls_saved: 0,
    hit_rate: '0.00%',
  });
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch performance metrics from the API backend
  const loadMetrics = async () => {
    try {
      const data = await getCacheMetrics();
      if (data.success && data.metrics) {
        setMetrics(data.metrics);
      }
    } catch (err) {
      console.error('Error fetching cache metrics:', err);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  // Handle LLM Prompt Submission
  const handleSubmitPrompt = async (promptText) => {
    setLoading(true);
    setError('');
    try {
      const data = await sendChatPrompt(promptText);
      if (data.success) {
        setResponses((prev) => [
          {
            id: Date.now(),
            query: promptText,
            response: data.response,
            source: data.source,
            latency: data.latency,
          },
          ...prev,
        ]);
        await loadMetrics();
      } else {
        setError(data.message || 'API request returned an unsuccessful response.');
      }
    } catch (err) {
      console.error('Prompt request error:', err);
      // Detailed error parser showing the exact server/network message
      const serverMessage = err.response?.data?.message || err.message;
      setError(`Execution failed: ${serverMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout-container">
      {/* Ask a Question Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Ask a Question</h2>
        {error && <div className="dashboard-error-callout">{error}</div>}
        <PromptBox onSubmit={handleSubmitPrompt} loading={loading} />
      </section>

      {/* AI Response Section */}
      {responses.length > 0 && (
        <section className="dashboard-section">
          <h2 className="section-title">AI Response</h2>
          <div className="dashboard-responses-wrapper">
            {responses.map((resp) => (
              <ResponseCard
                key={resp.id}
                query={resp.query}
                response={resp.response}
                source={resp.source}
                latency={resp.latency}
              />
            ))}
          </div>
        </section>
      )}

      {/* Cache Statistics Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Cache Statistics</h2>
        <div className="dashboard-stats-grid">
          <MetricCard
            label="Total Requests"
            value={metrics.total_requests}
          />
          <MetricCard
            label="Cache Hits"
            value={metrics.cache_hits}
            variant="success"
          />
          <MetricCard
            label="Cache Misses"
            value={metrics.cache_misses}
            variant="warning"
          />
          <MetricCard
            label="Hit Rate"
            value={metrics.hit_rate}
            variant="primary"
          />
          <MetricCard
            label="Saved API Calls"
            value={metrics.api_calls_saved}
            variant="success"
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
