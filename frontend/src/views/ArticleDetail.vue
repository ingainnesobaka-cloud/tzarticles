<template>
  <v-container>
    <div v-if="article">
      <h1>{{ article.title }}</h1>
      <p class="text-body-1 mt-4">{{ article.text }}</p>
      <p class="text-caption">Создано: {{ new Date(article.createdAt).toLocaleString() }}</p>
      <v-btn @click="$router.push(`/article/${article.id}/edit`)" class="mr-2">Редактировать</v-btn>
      <v-btn color="red" @click="deleteArticle">Удалить</v-btn>
      <AddComment :articleId="article.id" @commentAdded="refreshComments" />
      <CommentList :articleId="article.id" ref="commentList" />
    </div>
    <div v-else-if="loading">
      <p>Загрузка...</p>
    </div>
    <div v-else>
      <p>Статья не найдена.</p>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddComment from '@/components/AddComment.vue';
import CommentList from '@/components/CommentList.vue';

export default {
  name: 'ArticleDetail',
  components: { AddComment, CommentList },
  data() {
    return { loading: true };
  },
  computed: {
    ...mapState('articles', ['currentArticle']),
    article() {
      return this.currentArticle;
    }
  },
  methods: {
    ...mapActions('articles', ['fetchArticle', 'deleteArticle']),
    async loadArticle() {
      this.loading = true;
      await this.fetchArticle(this.$route.params.id);
      this.loading = false;
    },
    async deleteArticle() {
      if (!confirm('Удалить статью и все её комментарии?')) return;
      await this.deleteArticle(this.article.id);
      this.$router.push('/');
    },
    refreshComments() {
      this.$refs.commentList?.loadComments();
    }
  },
  async mounted() {
    await this.loadArticle();
  }
};
</script>