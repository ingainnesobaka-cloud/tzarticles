import * as commentsApi from '@/api/comments';

const state = {
  comments: [], 
};

const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  ADD_COMMENT(state, comment) {
    state.comments.push(comment);
  },
  UPDATE_COMMENT(state, updatedComment) {
    const index = state.comments.findIndex(c => c.id === updatedComment.id);
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment);
    }
  },
  REMOVE_COMMENT(state, id) {
    state.comments = state.comments.filter(c => c.id !== id);
  },
};

const actions = {
  async fetchCommentsByArticle({ commit }, articleId) {
    const response = await commentsApi.fetchCommentsByArticle(articleId);
    commit('SET_COMMENTS', response.data);
  },
  async createComment({ commit }, { articleId, text }) {
    const response = await commentsApi.createComment(articleId, { text });
    commit('ADD_COMMENT', response.data);
    return response.data;
  },
  async updateComment({ commit }, { articleId, commentId, text }) {
  const { data } = await commentsApi.updateComment({
    articleId,
    commentId,
    data: { text }
  });
  commit('UPDATE_COMMENT', data);
},
  async deleteComment({ commit }, { articleId, commentId }) {
    await commentsApi.deleteComment(articleId, commentId);
    commit('REMOVE_COMMENT', commentId);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};