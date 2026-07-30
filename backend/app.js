require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


const articleController = require('./controllers/articleController');
const articleRoutes = require('./routes/articles');
const commentRoutes = require('./routes/comments');
const commentController = require('./controllers/commentController');
const analyticsController = require('./controllers/analyticsController');

app.use('/article', articleRoutes);
app.get('/articles', articleController.getAll);
app.use('/article/:articleId/comment', commentRoutes);
app.get('/article/:articleId/comments', commentController.getByArticle);
app.get('/analytic/comments', analyticsController.getCommentsByPeriod);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;