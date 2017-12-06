const router = require('express').Router();

router.use('/articles', require('./articles'));
router.use('/topics', require('./topics'));
router.use('/comments', require('./comments'));
router.use('/users', require('./users'));

module.exports = router;
