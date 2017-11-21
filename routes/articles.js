const router = require('express').Router();
const { getAllArticles, getArticleComments, addArticleComment, addArticleVote } = require('../controllers/articles');

router.route('/')
  .get(getAllArticles);

router.route('/:article_id/comments')
  .get(getArticleComments)
  .post(addArticleComment);

router.route('/:article_id')
  .put(addArticleVote);

module.exports = router;
