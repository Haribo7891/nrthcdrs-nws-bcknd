if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');
const mongoose = require('mongoose');

const { DB } = require('./config');
const { articles } = require('./routes');
const { json } = require('body-parser');

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect(DB, { useMongoClient: true })
  .then(() => console.log(`Successfully connected to: ${ DB }`))
  .catch((err) => console.log(`Connection failed: ${ err }`));

app.use(json());

app.use('/api/articles', articles);

app.use('/*', (req, res) => {
  return res
    .status(404)
    .send({ msg: 'Page not found / invalid URL request' });
});

app.use('/*', (err, req, res, next) => {
  if (err.type === 404) {
    return res
      .status(404)
      .send({ msg: 'Page not found / invalid URL request' });
  }
  next(err);
});

app.use((err, req, res) => {
  res
    .status(500)
    .send({ err });
});

module.exports = app;
