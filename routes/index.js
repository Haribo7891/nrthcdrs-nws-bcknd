const router = require('express').Router();
const { articlesRoute } = require('./articles');

router.route('/articles', articlesRoute);

module.exports = router;
