const { Comment, Article } = require('../models');
const { Op } = require('sequelize');

const parseAndValidateDates = ({ dateFrom, dateTo }) => {
  if (!dateFrom || !dateTo) {
    const error = new Error('dateFrom and dateTo are required (timestamps)');
    error.status = 400;
    throw error;
  }

  const from = new Date(Number(dateFrom));
  const to = new Date(Number(dateTo));

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    const error = new Error('Invalid date format. Use timestamps.');
    error.status = 400;
    throw error;
  }

  return { from, to };
};

const fetchCommentsInPeriod = async (from, to) => {
  return Comment.findAll({
    where: {
      createdAt: {
        [Op.between]: [from, to]
      }
    },
    include: {
      model: Article,
      as: 'article',
      attributes: ['id', 'title']
    },
    order: [['createdAt', 'ASC']]
  });
};

const groupCommentsByArticle = (comments) => {
  const groupedMap = comments.reduce((acc, comment) => {
    const articleId = comment.articleId;
    if (!acc.has(articleId)) {
      acc.set(articleId, {
        article: comment.article,
        comments: []
      });
    }
    acc.get(articleId).comments.push(comment);
    return acc;
  }, new Map());

  return Array.from(groupedMap.values());
};

exports.getCommentsByPeriod = async (req, res) => {
  try {
    const { from, to } = parseAndValidateDates(req.query);
    const comments = await fetchCommentsInPeriod(from, to);
    const result = groupCommentsByArticle(comments);
    res.json(result);
  } catch (error) {
    console.error(error);
    // Если ошибка содержит статус (наша валидация), используем его, иначе 500
    const status = error.status || 500;
    const message = error.status ? error.message : 'Internal server error';
    res.status(status).json({ error: message });
  }
};