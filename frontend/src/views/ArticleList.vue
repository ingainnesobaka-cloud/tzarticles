<template>
  <v-container>
    <h1 class="mb-4">Статьи</h1>
    <v-btn color="primary" @click="$router.push('/article/new')">Добавить статью</v-btn>
    <v-table class="mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Дата создания</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id" @click="goToArticle(article.id)" style="cursor: pointer;">
          <td>{{ article.id }}</td>
          <td>{{ article.title }}</td>
          <td>{{ new Date(article.createdAt).toLocaleString() }}</td>
          <td>
            <v-btn size="small" @click.stop="$router.push(`/article/${article.id}/edit`)">Редактировать</v-btn>
            <v-btn size="small" color="red" @click.stop="deleteArticle(article.id)">Удалить</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ArticleList',
  computed: {
    ...mapState('articles', ['articles']),
  },
  methods: {
    ...mapActions('articles', ['fetchArticles', 'deleteArticle']),
    goToArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    async deleteArticle(id) {
      if (confirm('Удалить статью?')) {
        await this.deleteArticle(id);
        this.fetchArticles();
      }
    },
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>