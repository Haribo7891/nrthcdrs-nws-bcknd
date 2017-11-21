const router = require('express').Router();
const { addCommentVote } = require('../controllers/comments');

router.route('/:comment_id')
  .put(addCommentVote);

module.exports = router;
