const { Article } = require('../../models');

const addArticleVote = (req, res, next) => {
  const vote = req.query.vote;
  let inc = 0;
  if (vote === 'UP') inc = 1;
  else if (vote === 'DOWN') inc = -1;
  Article
    .findByIdAndUpdate(req.params.article_id, { $inc: { votes: inc } }, { new: true })
    .then((article) => {
      res
        .status(200)
        .send({ article });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid ID' });
      next(err);
    });
};

module.exports = addArticleVote;
