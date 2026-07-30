<template>
  <v-container>
    <h1 class="mb-4">Аналитика комментариев</h1>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="dateFrom"
          label="Дата начала (timestamp)"
          type="number"
          hint="Введите timestamp в миллисекундах"
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="dateTo"
          label="Дата окончания (timestamp)"
          type="number"
          hint="Введите timestamp в миллисекундах"
        />
      </v-col>
      <v-col cols="4" class="d-flex align-center">
        <v-btn color="primary" @click="loadAnalytics" :disabled="!dateFrom || !dateTo">Загрузить</v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
    <v-progress-circular v-if="loading" indeterminate class="mt-4" />

    <div v-if="!loading && !error && groupedData.length === 0 && loaded" class="mt-4">
      <p>За указанный период комментариев не найдено.</p>
    </div>

    <v-card v-for="group in groupedData" :key="group.article.id" class="mt-4">
      <v-card-title>{{ group.article.title }}</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="comment in group.comments" :key="comment.id">
            <v-list-item-content>
              <p class="mb-1">{{ comment.text }}</p>
              <small>{{ new Date(comment.createdAt).toLocaleString() }}</small>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { fetchAnalytics } from '@/api/comments';

export default {
  name: 'Analytics',
  data() {
    return {
      dateFrom: '',
      dateTo: '',
      groupedData: [],
      loading: false,
      error: null,
      loaded: false,
    };
  },
  methods: {
    async loadAnalytics() {
      this.loading = true;
      this.error = null;
      this.groupedData = [];
      this.loaded = false;
      try {
        const response = await fetchAnalytics(Number(this.dateFrom), Number(this.dateTo));
        this.groupedData = response.data;
        this.loaded = true;
      } catch (err) {
        this.error = err.response?.data?.error || 'Ошибка загрузки данных';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>