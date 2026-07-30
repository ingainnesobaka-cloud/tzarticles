const { Comment, Article } = require('../models');
const { Op } = require('sequelize');

exports.getCommentsByPeriod = async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;

    if (!dateFrom || !dateTo) {
      return res.status(400).json({ error: 'dateFrom and dateTo are required (timestamps)' });
    }

    const from = new Date(Number(dateFrom));
    const to = new Date(Number(dateTo));

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use timestamps.' });
    }

    const comments = await Comment.findAll({
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

    const grouped = comments.reduce((acc, comment) => {
      const articleId = comment.articleId;
      if (!acc[articleId]) {
        acc[articleId] = {
          article: comment.article,
          comments: []
        };
      }
      acc[articleId].comments.push(comment);
      return acc;
    }, {});

    const result = Object.values(grouped);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};