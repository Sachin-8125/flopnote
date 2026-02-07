import api from './api';

export const bookmarksService = {
  async getBookmarks(params = {}) {
    const response = await api.get('/bookmarks', { params });
    return response.data;
  },

  async getBookmark(id) {
    const response = await api.get(`/bookmarks/${id}`);
    return response.data;
  },

  async createBookmark(bookmarkData) {
    const response = await api.post('/bookmarks', bookmarkData);
    return response.data;
  },

  async updateBookmark(id, bookmarkData) {
    const response = await api.put(`/bookmarks/${id}`, bookmarkData);
    return response.data;
  },

  async deleteBookmark(id) {
    const response = await api.delete(`/bookmarks/${id}`);
    return response.data;
  },

  async fetchTitle(url) {
    const response = await api.post('/bookmarks/fetch-title', { url });
    return response.data;
  },
};