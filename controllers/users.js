const { Users } = require('../models');

module.exports = {
  getUserInfo (req, res, next) {
    Users.findOne({ username: req.params.username })
      .then((user) => res.send({ user }))
      .catch((err) => {
        if (err.name === 'CastError') return next({ err, type: 404 });
        next(err);
      });
  }
};
