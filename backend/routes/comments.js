const express = require('express');
const router = express.Router({ mergeParams: true }); 
const commentController = require('../controllers/commentController');

// POST /article/:articleId/comment
router.post('/', commentController.create);

// GET /article/:articleId/comments
router.get('/', commentController.getByArticle);

// GET /article/:articleId/comment/:commentId
router.get('/:commentId', commentController.getOne);

// PATCH /article/:articleId/comment/:commentId
router.patch('/:commentId', commentController.update);

// DELETE /article/:articleId/comment/:commentId
router.delete('/:commentId', commentController.delete);

module.exports = router;