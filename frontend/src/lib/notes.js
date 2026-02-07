import api from './api';

export const notesService = {
  async getNotes(params = {}) {
    const response = await api.get('/notes', { params });
    return response.data;
  },

  async getNote(id) {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  async createNote(noteData) {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  async updateNote(id, noteData) {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  async deleteNote(id) {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};