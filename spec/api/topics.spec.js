process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../../seed/test.seed');
const app = require('../../server');

describe('API - Topics', () => {
  let usefulData;
  beforeEach(() => mongoose.connection
    .dropDatabase()
    .then(saveTestData)
    .then((data) => {
      usefulData = data;
    })
    .catch((err) => console.log('Error!', err))
  );
  describe('GET /topics', () => {
    it('sends back the correct object with 200 status code', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          expect(res.body.topics[0].title).to.be.a('string');
          expect(res.body.topics[0].slug).to.be.a('string');
        });
    });
  });
});
