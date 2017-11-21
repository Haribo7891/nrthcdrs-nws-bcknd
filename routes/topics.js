const router = require('express').Router();
const { getAllTopics } = require('../controllers/topics');

router.route('/')
  .get(getAllTopics);

module.exports = router;
