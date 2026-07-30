const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// POST /article
router.post('/', articleController.create);

// GET /articles
router.get('/', articleController.getAll);

// GET /article/:id
router.get('/:id', articleController.getById);

// PATCH /article/:id
router.patch('/:id', articleController.update);

// DELETE /article/:id
router.delete('/:id', articleController.delete);

module.exports = router;