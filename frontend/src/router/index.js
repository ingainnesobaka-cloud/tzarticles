import { createRouter, createWebHistory } from 'vue-router';
import ArticleList from '@/views/ArticleList.vue';
import ArticleForm from '@/views/ArticleForm.vue';

const routes = [
  {
    path: '/',
    name: 'ArticleList',
    component: ArticleList,
  },
  {
    path: '/article/new',
    name: 'ArticleNew',
    component: ArticleForm,
  },
  {
    path: '/article/:id/edit',
    name: 'ArticleEdit',
    component: ArticleForm,
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('@/views/ArticleDetail.vue'),
  }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;