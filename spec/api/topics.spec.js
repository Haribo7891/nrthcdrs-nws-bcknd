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
  describe('GET /topics/:topic_id/articles', () => {
    it('sends back the correct object with 200 status code when given a valid topic_id', () => {
      const topicsId = usefulData.topics[0]._id;
      return request(app)
        .get(`/api/topics/${ topicsId }/articles`)
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).to.be.an('object');
          expect(res.body.articles[0].belongs_to).to.be.a('string');
        });
    });
    it('sends back a 404 when given invalid id', () => {
      return request(app)
        .get('/api/topics/1/articles')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Page not found / invalid URL request');
        });
    });
  });
});
