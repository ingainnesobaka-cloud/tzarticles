import * as articlesApi from '@/api/articles';

const state = {
  articles: [],
  currentArticle: null,
};

const mutations = {
  SET_ARTICLES(state, articles) {
    state.articles = articles;
  },
  SET_CURRENT_ARTICLE(state, article) {
    state.currentArticle = article;
  },
  ADD_ARTICLE(state, article) {
    state.articles.push(article);
  },
  UPDATE_ARTICLE(state, updatedArticle) {
    const index = state.articles.findIndex(a => a.id === updatedArticle.id);
    if (index !== -1) {
      state.articles.splice(index, 1, updatedArticle);
    }
    if (state.currentArticle && state.currentArticle.id === updatedArticle.id) {
      state.currentArticle = updatedArticle;
    }
  },
  REMOVE_ARTICLE(state, id) {
    state.articles = state.articles.filter(a => a.id !== id);
    if (state.currentArticle && state.currentArticle.id === id) {
      state.currentArticle = null;
    }
  },
};

const actions = {
  async fetchArticles({ commit }) {
    const response = await articlesApi.fetchArticles();
    commit('SET_ARTICLES', response.data);
  },
  async fetchArticle({ commit }, id) {
    const response = await articlesApi.fetchArticle(id);
    commit('SET_CURRENT_ARTICLE', response.data);
  },
  async createArticle({ commit }, data) {
    const response = await articlesApi.createArticle(data);
    commit('ADD_ARTICLE', response.data);
    return response.data;
  },
  async updateArticle({ commit }, { id, data }) {
    const response = await articlesApi.updateArticle(id, data);
    commit('UPDATE_ARTICLE', response.data);
    return response.data;
  },
  async deleteArticle({ commit }, id) {
    await articlesApi.deleteArticle(id);
    commit('REMOVE_ARTICLE', id);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};