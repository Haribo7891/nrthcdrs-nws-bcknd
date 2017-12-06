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
  describe('Test database', () => {
    it('Saves the topics data to usefulData correctly', () => {
      const topic = usefulData.topics;
      expect(topic.length).to.equal(3);
    });
  });
  describe('GET /topics', () => {
    it('Sends back the correct object with 200 status code', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          const topic = res.body.topics[0];
          expect(topic.title).to.be.a('string');
          expect(topic.slug).to.be.a('string');
        });
    });
    it('Sends back all topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          const topics = res.body.topics;
          expect(topics.length).to.equal(3);
        });
    });
  });
  describe('GET /topics/:topic/articles', () => {
    it('Sends back the correct object with 200 status code when given a valid topic_id', () => {
      const topic = usefulData.topics[0].slug;
      return request(app)
        .get(`/api/topics/${ topic }/articles`)
        .expect(200)
        .then((res) => {
          const article = res.body.articles[0];
          expect(article).to.be.an('object');
          expect(article.belongs_to).to.be.a('string');
        });
    });
  });
});
