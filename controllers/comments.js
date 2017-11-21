const { Comments } = require('../models');

module.exports = {
  addCommentVote (req, res, next) {
    let inc = 0;
    if (req.query.vote === 'UP') inc = 1;
    else if (req.query.vote === 'DOWN') inc = -1;
    Comments.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: inc } }, { new: true })
      .then((comment) => res.send({ comment }))
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  }
};
