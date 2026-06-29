import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import './Home.css';

/**
 * Home page wrapping the unified developer dashboard layout.
 */
function Home() {
  return (
    <div className="home-page-root">
      <main className="container">
        <header className="app-branding-header">
          <h1 className="app-title-text">Semantic LLM Cache</h1>
          <p className="app-subtitle-description">
            Reduce AI response latency using semantic similarity search powered by Gemini embeddings and PostgreSQL pgvector.
          </p>
        </header>
        <Dashboard />
      </main>
    </div>
  );
}

export default Home;
