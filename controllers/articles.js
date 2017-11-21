const { Articles, Comments } = require('../models');

module.exports = {
  getAllArticles (req, res, next) {
    Articles.find()
      .then((articles) => res.send({ articles }))
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  },
  getArticleComments (req, res, next) {
    Promise.all([ Articles.findById(req.params.article_id), Comments.find() ])
      .then(([ article, comments ]) => {
        res.send({
          comments: comments.filter((comment) => 
            comment.belongs_to.toString() === article._id.toString())
        });
      })
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  },
  addArticleComment (req, res, next) {
    Comments.update(req.body)
      .then(() => {
        Promise.all([ Articles.findById(req.params.article_id), Comments.find() ])
          .then(([ article, comments ]) => {
            res.send({
              message: 'Comment added!',
              comments: comments.filter((comment) => 
                comment.belongs_to.toString() === article._id.toString())
            });
          })
          .catch((err) => {
            if (err.name === 'CastError') return next({ err, type: 404 });
            next(err);
          });
      });
  },
  addArticleVote (req, res, next) {
    let inc = 0;
    if (req.query.vote === 'UP') inc = 1;
    else if (req.query.vote === 'DOWN') inc = -1;
    Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: inc } }, { new: true })
      .then((article) => res.send({ article }))
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  }
};
