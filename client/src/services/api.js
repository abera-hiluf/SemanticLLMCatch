import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
  const response = await apiClient.post('/api/chat', { prompt });
  return response.data;
};

/**
 * Fetches semantic cache performance metrics from the backend.
 * @returns {Promise<object>} Response data
 */
export const getCacheMetrics = async () => {
  const response = await apiClient.get('/api/metrics');
  return response.data;
};

export default apiClient;
