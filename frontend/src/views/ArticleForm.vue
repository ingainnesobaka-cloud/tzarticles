<template>
  <v-container>
    <h1 class="mb-4">{{ isEdit ? 'Редактировать' : 'Новая' }} статья</h1>
    <v-form @submit.prevent="saveArticle">
      <v-text-field v-model="title" label="Название" required />
      <v-textarea v-model="text" label="Текст статьи" required />
      <v-btn type="submit" color="primary">{{ isEdit ? 'Обновить' : 'Создать' }}</v-btn>
      <v-btn @click="$router.push('/')" class="ml-2">Отмена</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ArticleForm',
  data() {
    return {
      title: '',
      text: '',
    };
  },
  computed: {
    ...mapState('articles', ['currentArticle']),
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  methods: {
    ...mapActions('articles', ['createArticle', 'updateArticle', 'fetchArticle']),
    async saveArticle() {
      if (!this.title || !this.text) {
        alert('Заполните все поля');
        return;
      }
      try {
        if (this.isEdit) {
          await this.updateArticle({ id: this.$route.params.id, data: { title: this.title, text: this.text } });
        } else {
          await this.createArticle({ title: this.title, text: this.text });
        }
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert('Ошибка сохранения');
      }
    },
  },
  async mounted() {
    if (this.isEdit) {
      await this.fetchArticle(this.$route.params.id);
      const article = this.currentArticle;
      if (article) {
        this.title = article.title;
        this.text = article.text;
      }
    }
  },
};
</script>