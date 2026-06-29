<p align="center">
  <img src="assets/logo/logo.png" width="120">
</p>

<h1 align="center">SemanticCache</h1>

<p align="center">
AI Infrastructure Tool for Intelligent Semantic Response Caching
</p>

<p align="center">
Reduce AI response latency and API costs using semantic similarity search powered by Gemini Embeddings and PostgreSQL pgvector.
</p>
<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)

![Express](https://img.shields.io/badge/Express.js-000000?logo=express)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql)

![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4)

![pgvector](https://img.shields.io/badge/pgvector-Vector_Search-success)

![License](https://img.shields.io/badge/License-MIT-green)

</p>

## 📸 Screenshots
<h3>Home</h3>

<p align="center">
<img src="assets/screenshots/home.jpg" width="900">
</p>

<h3>Performance Overview</h3>

<p align="center">
<img src="assets/screenshots/metrics.jpg" width="900">
</p>

## 🚀 Live Demo

Frontend: https://semantic-llm-catch.vercel.app/

## 🚨 Problem

Large Language Models receive many repeated or semantically similar prompts. Traditional caching only matches identical text, causing unnecessary API calls, higher response latency, and increased operational costs.

As AI applications scale, these repeated requests become expensive and inefficient.
Backend API: https://semantic-cache-api.onrender.com
## 💡 Why SemanticCache?

SemanticCache solves this problem by using Gemini Embeddings and PostgreSQL pgvector to compare the semantic meaning of prompts instead of exact text.

If a similar prompt already exists, the cached response is returned instantly, reducing response time and avoiding unnecessary LLM requests.

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/abera-hiluf/SemanticLLMCatch.git

# Navigate into the project
cd SemanticLLMCatch

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start the backend
cd ../server
npm run dev

# Start the frontend
cd ../client
npm run dev
```
