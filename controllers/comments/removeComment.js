const { Comment } = require('../../models');

const removeComment = (req, res, next) => {
  Comment
    .findByIdAndRemove(req.params.comment_id)
    .then((comment) => {
      res
        .status(200)
        .send({
          comment: comment,
          msg: 'Comment deleted!'
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid ID' });
      next(err);
    });
};

module.exports = removeComment;
