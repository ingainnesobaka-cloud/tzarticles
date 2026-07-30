<template>
  <div>
    <h3 class="mt-6">Комментарии</h3>
    <v-list v-if="comments.length">
      <v-list-item v-for="comment in comments" :key="comment.id">
        <v-list-item-content>
          <p>{{ comment.text }}</p>
          <small>{{ new Date(comment.createdAt).toLocaleString() }}</small>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn size="small" @click="editComment(comment)">Редактировать</v-btn>
          <v-btn size="small" color="red" @click="removeComment(comment.id)">Удалить</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <p v-else>Комментариев пока нет.</p>

    <!-- Диалог редактирования -->
    <v-dialog v-model="editDialog" max-width="400">
      <v-card>
        <v-card-title>Редактировать комментарий</v-card-title>
        <v-card-text>
          <v-textarea v-model="editText" label="Текст" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveEdit">Сохранить</v-btn>
          <v-btn @click="editDialog = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CommentList',
  props: {
    articleId: { type: [String, Number], required: true }
  },
  data() {
    return {
      editDialog: false,
      editText: '',
      editingCommentId: null
    };
  },
  computed: {
    ...mapState('comments', ['comments'])
  },
  methods: {
    ...mapActions('comments', ['fetchCommentsByArticle', 'updateComment', 'deleteComment']),
    async loadComments() {
      await this.fetchCommentsByArticle(this.articleId);
    },
    editComment(comment) {
      this.editingCommentId = comment.id;
      this.editText = comment.text;
      this.editDialog = true;
    },
    async saveEdit() {
      if (!this.editText.trim()) return;
      await this.updateComment({
        articleId: this.articleId,
        commentId: this.editingCommentId,
        text: this.editText
      });
      this.editDialog = false;
      this.editingCommentId = null;
      this.editText = '';
    },
    async removeComment(commentId) {
      if (confirm('Удалить комментарий?')) {
        await this.deleteComment({ articleId: this.articleId, commentId });
      }
    }
  },
  mounted() {
    this.loadComments();
  }
};
</script>