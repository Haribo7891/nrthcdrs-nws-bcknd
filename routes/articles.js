const router = require('express').Router();
const { getAllArticles, getArticleComments } = require('../controllers/articles');

router.route('/')
  .get(getAllArticles);

router.route('/:article_id/comments')
  .get(getArticleComments);

module.exports = router;
