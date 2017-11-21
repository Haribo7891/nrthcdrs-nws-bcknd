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
  describe('GET /articles/:article_id/comments', () => {
    it('sends back the correct object with 200 status code when given a valid article_id', () => {
      const articleId = usefulData.articles[0]._id;
      return request(app)
        .get(`/api/articles/${ articleId }/comments`)
        .expect(200)
        .then((res) => {
          expect(res.body.comments[0]).to.be.an('object');
          expect(res.body.comments[0].created_at).to.be.a('number');
        });
    });
    it('sends back a 404 when given invalid id', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Page not found / invalid URL request');
        });
    });
  });
  describe('POST /articles/:article_id/comments', () => {
    it('adds a new comment to an article', () => {
      const articleId = usefulData.articles[0]._id;      
      return request(app)
        .post(`/api/articles/${ articleId }/comments`)
        .expect(200)
        .send({
          body: 'Great article!',
          belongs_to: articleId,
        })
        .then((res) => {
          expect(res.body.comments[0]).to.be.an('object');
          expect(res.body.comments[0].body).to.equal('Great article!');
          expect(res.body.comments[0].belongs_to.toString()).to.equal(usefulData.articles[0]._id.toString());
        });
    });
  });
  describe('PUT /articles/:article_id', () => {
    it('correctly votes up an article', () => {
      const articleId = usefulData.articles[0]._id;      
      return request(app)
        .put(`/api/articles/${ articleId }?vote=UP`)
        .then((res) => {
          expect(res.body.article.votes).to.equal(1);
        });
    });
  });
});
