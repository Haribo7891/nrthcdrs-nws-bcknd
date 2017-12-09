const { Comment } = require('../../models');

const getArticleComments = (req, res, next) => {
  Comment
    .find({ belongs_to: req.params.article_id })
    .then((comments) => {
      if (comments.length === 0) return next();
      res
        .status(200)
        .send({ comments });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid ID' });
      next(err);
    });
};

module.exports = getArticleComments;
