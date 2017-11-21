require('dotenv').config();

module.exports = {
  DB: process.env.DB_URL,
  PORT: process.env.PORT || 3000
};
