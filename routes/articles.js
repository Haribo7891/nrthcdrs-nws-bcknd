const router = require('express').Router();
const { getAllArticles } = require('../controllers/articles');

router.route('/')
  .get(getAllArticles);

module.exports = router;
