
import axios from 'axios';

const API_KEY = '3238d2f72b6a475694c1890e995c3c95';

const apiClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: API_KEY,
  },
});

export const getPopularGames = () => {
  return apiClient.get('/games');
};

export const getGameDetails = (gameId) => {
  return apiClient.get(`/games/${gameId}`);
};

export const searchGames = (query) => {
  return apiClient.get('/games', { params: { search: query } });
};

export default apiClient;