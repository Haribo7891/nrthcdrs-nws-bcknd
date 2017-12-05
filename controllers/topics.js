const { Articles, Topics } = require('../models');

module.exports = {
  getAllTopics (req, res, next) {
    Topics.find()
      .then((topics) => res.send({ topics }))
      .catch((err) => next(err));
  },
  getArticlesByTopic (req, res, next) {
    return Articles 
      .find({ belongs_to: req.params.topic })
      .then((articles) => {
        if (articles.length === 0) return next({ type: 404 });
        res.status(200).send({ articles });
      })
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  }
};
