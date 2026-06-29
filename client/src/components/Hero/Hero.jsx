import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-badge">⚡ Production-ready Semantic Caching</div>
      <h1 className="hero-title">
        Accelerate LLMs with <br />
        <span className="gradient-text">Semantic Caching</span>
      </h1>
      <p className="hero-description">
        Save API costs and reduce response latencies from seconds to milliseconds. 
        Our vector-similarity caching layer dynamically matches semantically identical requests.
      </p>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Vector Search</h3>
          <p>Uses Gemini Embeddings to convert queries into semantic vectors for comparison.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Sub-10ms Latency</h3>
          <p>Instant cache hits return saved responses, avoiding slow round-trips to the LLM API.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>90%+ Cost Savings</h3>
          <p>Saves money by bypassing LLM generation tokens for repeated or similar user intents.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
