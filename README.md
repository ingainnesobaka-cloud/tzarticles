# TzArticles – тестовое задание "Статьи"

## Описание
Приложение для управления статьями и комментариями с аналитикой.

### Стек
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Frontend:** Vue 3, Vuetify 3, Vuex 4, Vue Router, Axios

## Установка и запуск

### Предварительные требования
- Node.js (v20 или выше)
- PostgreSQL (база данных blog_db)
- Настроенные переменные окружения (см. backend/.env.example)

### Backend
```bash 
cd backend
cp .env.example .env    # заполнить реальными параметрами БД
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev
```
### FrontEnd
```bash
cd frontend
cp .env.example .env    # VITE_API_BASE_URL=http://localhost:3000
npm install
npm run dev
```
### Приложение будет доступно по адресу http://localhost:5173.

### API Endpoints

    GET /articles – список статей

    GET /article/:id – статья

    POST /article – создать статью

    PATCH /article/:id – обновить статью

    DELETE /article/:id – удалить статью

    GET /article/:id/comments – комментарии статьи

    POST /article/:id/comment – добавить комментарий

    PATCH /article/:id/comment/:commentId – изменить комментарий

    DELETE /article/:id/comment/:commentId – удалить комментарий

    GET /analytic/comments?dateFrom=timestamp&dateTo=timestamp – аналитика комментариев за период

