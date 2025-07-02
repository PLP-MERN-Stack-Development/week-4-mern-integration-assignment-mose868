const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);

// Protected routes
router.use(protect);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/comments', addComment);

module.exports = router; 