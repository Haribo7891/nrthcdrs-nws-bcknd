const router = require('express').Router();
const { addCommentVote, removeComment } = require('../controllers/comments');

router.route('/:comment_id')
  .put(addCommentVote)
  .delete(removeComment);

module.exports = router;
