const { Article, Comment } = require('../../models');

const addArticleComment = (req, res, next) => {
  Comment
    .update(req.body)
    .then(() => {
      Promise
        .all([ Article.findById(req.params.article_id), Comment.find() ])
        .then(([ article, comments ]) => {
          res
            .status(200)
            .send({
              message: 'Comment added!',
              comments: comments.filter((comment) => 
                comment.belongs_to.toString() === article._id.toString())
            });
        })
        .catch((err) => {
          if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid ID' });
          next(err);
        });
    });
};

module.exports = addArticleComment;
