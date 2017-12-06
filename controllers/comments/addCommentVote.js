const { Comment } = require('../../models');

const addCommentVote = (req, res, next) => {
  const vote = req.query.vote;
  let inc = 0;
  if (vote === 'UP') inc = 1;
  else if (vote === 'DOWN') inc = -1;
  Comment
    .findByIdAndUpdate(req.params.comment_id, { $inc: { votes: inc } }, { new: true })
    .then((comment) => {
      res
        .status(200)
        .send({ comment });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, type: 400, msg: 'Invalid ID' });
      next(err);
    });
};

module.exports = addCommentVote;
