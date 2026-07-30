const { Comment, Article } = require('../models');

// (POST /article/:articleId/comment)
exports.create = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Comment text is required' });
    }

    // Проверяем, существует ли статья
    const article = await Article.findByPk(articleId);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const comment = await Comment.create({
      text,
      articleId: article.id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (GET /article/:articleId/comments)
exports.getByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({
      where: { articleId },
      order: [['createdAt', 'ASC']]
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (GET /article/:articleId/comment/:commentId)
exports.getOne = async (req, res) => {
  try {
    const { articleId, commentId } = req.params;
    const comment = await Comment.findOne({
      where: { id: commentId, articleId }
    });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (PATCH /article/:articleId/comment/:commentId)
exports.update = async (req, res) => {
  try {
    const { articleId, commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findOne({
      where: { id: commentId, articleId }
    });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.text = text || comment.text;
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (DELETE /article/:articleId/comment/:commentId)
exports.delete = async (req, res) => {
  try {
    const { articleId, commentId } = req.params;
    const comment = await Comment.findOne({
      where: { id: commentId, articleId }
    });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};