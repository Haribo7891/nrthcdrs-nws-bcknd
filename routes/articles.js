const router = require('express').Router();
const { getAllArticles, getArticleComments, addArticleComment } = require('../controllers/articles');

router.route('/')
  .get(getAllArticles);

router.route('/:article_id/comments')
  .get(getArticleComments)
  .post(addArticleComment);

module.exports = router;
