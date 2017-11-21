const { Articles } = require('../models');

module.exports = {
  getAllArticles (req, res, next) {
    Articles.find()
      .then((articles) => res.send({ articles }))
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  }
};
