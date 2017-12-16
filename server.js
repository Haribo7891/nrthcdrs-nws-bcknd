if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { json } = require('body-parser');

const { DB } = require('./config');
const apiRouter = require('./routes');

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect(DB, { useMongoClient: true })
  .then(() => console.log(`Successfully connected to: ${ DB }`))
  .catch((err) => console.log(`Connection failed: ${ err }`));

app.use(cors());
app.use(json());

app.use('/', express.static('public'));

app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found / invalid URL request' });
});

app.use((err, req, res, next) => {
  if (err.status === 404) return res.status(404).send({ msg: err.msg });
  if (err.status === 400) return res.status(400).send({ msg: err.msg });
  else return next(err);
});

app.use((err, req, res) => {
  res.status(500).send({ err });
});

module.exports = app;
