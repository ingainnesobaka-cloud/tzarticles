import apiClient from './index';

export const fetchCommentsByArticle = (articleId) =>
  apiClient.get(`/article/${articleId}/comments`);

export const fetchComment = (articleId, commentId) =>
  apiClient.get(`/article/${articleId}/comment/${commentId}`);

export const createComment = (articleId, data) =>
  apiClient.post(`/article/${articleId}/comment`, data);

export const updateComment = (articleId, commentId, data) =>
  apiClient.patch(`/article/${articleId}/comment/${commentId}`, data);

export const deleteComment = (articleId, commentId) =>
  apiClient.delete(`/article/${articleId}/comment/${commentId}`);

export const fetchAnalytics = (dateFrom, dateTo) =>
  apiClient.get('/analytic/comments', { params: { dateFrom, dateTo } });