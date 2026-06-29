import axios from 'axios';

let rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Strip trailing slash if present
if (rawBaseUrl.endsWith('/')) {
  rawBaseUrl = rawBaseUrl.slice(0, -1);
}

// Strip '/api' from the raw base URL if it's already included to avoid double-ups
if (rawBaseUrl.endsWith('/api')) {
  rawBaseUrl = rawBaseUrl.slice(0, -4);
}

// Standardize base URL to always end in '/api'
const API_BASE_URL = `${rawBaseUrl}/api`;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a prompt to the semantic cache backend.
 * @param {string} prompt The prompt string
 * @returns {Promise<object>} Response data
 */
export const sendChatPrompt = async (prompt) => {
  const response = await apiClient.post('chat', { prompt });
  return response.data;
};

/**
 * Fetches semantic cache performance metrics from the backend.
 * @returns {Promise<object>} Response data
 */
export const getCacheMetrics = async () => {
  const response = await apiClient.get('metrics');
  return response.data;
};

export default apiClient;
