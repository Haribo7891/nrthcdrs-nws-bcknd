const { Articles, Topics } = require('../models');

module.exports = {
  getAllTopics (req, res, next) {
    Topics.find()
      .then((topics) => res.send({ topics }))
      .catch((err) => next(err));
  },
  getArticlesByTopic (req, res, next) {
    Promise.all([ Topics.findById(req.params.topic_id), Articles.find() ])
      .then(([ topic, articles ]) => {
        res.send({ articles: articles.filter((article) => article.belongs_to === topic.slug) });     
      })
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  }
};
