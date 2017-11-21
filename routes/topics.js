const router = require('express').Router();
const { getAllTopics, getArticlesByTopic } = require('../controllers/topics');

router.route('/')
  .get(getAllTopics);

router.route('/:topic_id/articles')
  .get(getArticlesByTopic);

module.exports = router;
