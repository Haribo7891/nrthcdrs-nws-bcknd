const { Comment } = require('../../models');

const addArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { comment, created_by = 'northcoder', created_at = Date.now() } = req.body;
  if (/^\s*$/.test(comment)) return next({ status: 400, message: 'Invalid input' });
  const newComment = new Comment({ body: comment, created_by, belongs_to: article_id, created_at });
  newComment
    .save()
    .then((comment) => {
      res
        .status(201)
        .send({ comment });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid input' });
      next(err);
    });
};

module.exports = addArticleComment;

