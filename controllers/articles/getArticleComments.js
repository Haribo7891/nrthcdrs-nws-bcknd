const { Article, Comment } = require('../../models');

const getArticleComments = (req, res, next) => {
  Promise
    .all([ Article.findById(req.params.article_id), Comment.find() ])
    .then(([ article, comments ]) => {
      res
        .status(200)
        .send({
          comments: comments.filter((comment) => 
            comment.belongs_to.toString() === article._id.toString())
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid ID' });
      next(err);
    });
};

module.exports = getArticleComments;
