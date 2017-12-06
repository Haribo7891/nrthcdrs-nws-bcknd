const { Article } = require('../../models');

const getAllTopics = (req, res, next) => {
  Article 
    .find({ belongs_to: req.params.topic })
    .then((articles) => {
      if (articles.length === 0) return next({ status: 404, msg: 'Invalid topic' });
      res
        .status(200)
        .send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getAllTopics;
