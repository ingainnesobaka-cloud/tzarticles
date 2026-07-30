<template>
  <div class="mt-4">
    <v-textarea v-model="text" label="Добавить комментарий" rows="2" />
    <v-btn color="primary" @click="submitComment" :disabled="!text.trim()">Отправить</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddComment',
  props: {
    articleId: { type: [String, Number], required: true }
  },
  data() {
    return { text: '' };
  },
  methods: {
    ...mapActions('comments', ['createComment']),
    async submitComment() {
      if (!this.text.trim()) return;
      await this.createComment({ articleId: this.articleId, text: this.text });
      this.text = '';
    }
  }
};
</script>