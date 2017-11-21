process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../../seed/test.seed');
const app = require('../../server');

describe('API - Articles', () => {
  let usefulData;
  beforeEach(() => mongoose.connection
    .dropDatabase()
    .then(saveTestData)
    .then((data) => {
      usefulData = data;
    })
    .catch((err) => console.log('Error!', err))
  );
  describe('GET /articles', () => {
    it('sends back the correct object with 200 status code', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].votes).to.be.a('number');
          expect(res.body.articles[0].body).to.be.a('string');
        });
    });
  });
});
