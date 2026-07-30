import apiClient from './index';

export const fetchArticles = () => apiClient.get('/articles');

export const fetchArticle = (id) => apiClient.get(`/article/${id}`);

export const createArticle = (data) => apiClient.post('/article', data);

export const updateArticle = (id, data) => apiClient.patch(`/article/${id}`, data);

export const deleteArticle = (id) => apiClient.delete(`/article/${id}`);