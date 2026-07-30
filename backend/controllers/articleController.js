const { Article } = require('../models');

// (POST /article/)
exports.create = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }
    const article = await Article.create({ title, text });
    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (GET /articles/)
exports.getAll = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (GET /article/:id)
exports.getById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (PATCH /article/:id)
exports.update = async (req, res) => {
  try {
    const { title, text } = req.body;
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    // Обновляем только те поля, которые переданы
    if (title !== undefined) article.title = title;
    if (text !== undefined) article.text = text;
    await article.save();
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// (DELETE /article/:id)
exports.delete = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    await article.destroy();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};