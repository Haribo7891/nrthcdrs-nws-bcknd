const { User } = require('../../models');

const getUserInfo = (req, res, next) => {
  User
    .findOne({ username: req.params.username })
    .then((user) => {
      if (user === null) return next({ status: 404, msg: 'Invalid username' });      
      res
        .status(200)
        .send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getUserInfo;
