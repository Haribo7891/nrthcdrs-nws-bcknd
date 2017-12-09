const { Article, Comment } = require('../../models');

const getArticleById = (req, res, next) => {
  Article
    .find({ _id: req.params.article_id })
    .then((article) => {
      Promise.all(getCommentCount(article))
        .then((commentCount) => {
          const updatedArticle = addCommentCount(article, commentCount);
          res
            .status(200)
            .send(updatedArticle);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') return next({ err, status: 400, msg: 'Invalid ID' });
      next(err);
    });
};

function getCommentCount (arr) {
  return arr.map((article) => {
    return Comment.count({ belongs_to: article._id });
  });
}

function addCommentCount (arr, count) {
  return arr.map((article, i) => {
    article = article.toObject();
    article.comments = count[i];
    return article;
  });
}

module.exports = getArticleById;
