const router = require('express').Router();
const { 
  getAllArticles,
  getArticleComments,
  addArticleComment,
  addArticleVote,
  getArticleById
} = require('../controllers/articles');

router.route('/')
  .get(getAllArticles);

router.route('/:article_id')
  .get(getArticleById)
  .put(addArticleVote);

router.route('/:article_id/comments')
  .get(getArticleComments)
  .post(addArticleComment);

module.exports = router;
