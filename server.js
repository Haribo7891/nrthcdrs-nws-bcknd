if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');

const { DB } = require('./config');

mongoose.connect(DB, { useMongoClient: true })
  .then(() => console.log(`Successfully connected to: ${ DB }`))
  .catch((err) => console.log(`Connection failed: ${ err }`));

app.use(bodyParser.json());

module.exports = app;
