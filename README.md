<p align="center">
  <img src="assets/logo/logo.png" width="130">
</p>

<h1 align="center">SemanticCacheAI</h1>

<p align="center">
AI Infrastructure Tool for Intelligent Semantic Response Caching
</p>

<p align="center">
Reduce AI response latency and API costs using semantic similarity search powered by Gemini Embeddings and PostgreSQL pgvector.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white">
  <img src="https://img.shields.io/badge/pgvector-Vector_Search-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
</p>

---

##  Live Demo

**Frontend**

https://semantic-llm-catch.vercel.app/

**Backend API**

https://semantic-cache-api.onrender.com

---

## Problem

Large Language Models (LLMs) frequently receive repeated or semantically similar prompts. Traditional caching techniques only match identical text, meaning similar requests still trigger expensive API calls.

As AI applications scale, this results in:

* Higher API costs
* Increased response latency
* Unnecessary repeated computation
* Poor resource utilization

---

## Why SemanticCache?

SemanticCache addresses this challenge by comparing the **meaning** of prompts instead of their exact wording.

Using **Gemini Embeddings** together with **PostgreSQL pgvector**, the application converts prompts into vector embeddings and performs semantic similarity search.

If a similar prompt already exists, the cached response is returned instantly instead of calling the LLM again.

This approach significantly reduces latency, lowers API usage, and improves the overall efficiency of AI-powered applications.

---

## ✨ Features

| Feature               | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| Semantic Search       | Finds semantically similar prompts using vector embeddings |
| Intelligent Caching   | Returns cached responses for similar requests              |
| Gemini Flash          | Generates responses only on cache misses                   |
| Gemini Embeddings     | Converts prompts into vector representations               |
| PostgreSQL + pgvector | Stores and searches embeddings efficiently                 |
| Cache Metrics         | Tracks hits, misses and API calls saved                    |
| React Dashboard       | Modern interface for interacting with the cache            |
| REST API              | Express backend exposing chat and metrics endpoints        |

---

## 📸 Screenshots

### Home

<p align="center">
  <img src="assets/screenshots/home.jpg" width="900">
</p>

### Performance Overview

<p align="center">
  <img src="assets/screenshots/metrics.jpg" width="900">
</p>

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/abera-hiluf/SemanticLLMCatch.git

# Navigate to the project
cd SemanticLLMCatch

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start backend
cd ../server
npm run dev

# Start frontend
cd ../client
npm run dev
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abera Hiluf Teshale**

AI & Machine Learning Student

GitHub: https://github.com/abera-hiluf
