import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const gameService = {
  getAll: () => api.get('/games'),
  getById: (id) => api.get(`/games/${id}`),
  create: (gameData) => api.post('/games', gameData),
  update: (id, gameData) => api.put(`/games/${id}`, gameData),
  delete: (id) => api.delete(`/games/${id}`),
};

export const reviewService = {
  getAll: () => api.get('/reviews'),
  getByGame: (gameId) => api.get(`/reviews/game/${gameId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export default api;