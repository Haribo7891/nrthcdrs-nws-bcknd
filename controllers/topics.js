const { Topics } = require('../models');

module.exports = {
  getAllTopics (req, res, next) {
    Topics.find()
      .then((topics) => res.send({ topics }))
      .catch((err) => next(err));
  }
};
