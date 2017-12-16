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
  describe('Test database', () => {
    it('Saves the articles data to usefulData correctly', () => {
      expect(usefulData.articles.length).to.equal(2);
    });
  });
  describe('GET /articles', () => {
    it('Sends back the correct object with 200 status code', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          const articles = res.body.articles[0];
          expect(articles.votes).to.be.a('number');
          expect(articles.body).to.be.a('string');
        });
    });
    it('Sends back all articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          const articles = res.body.articles;
          expect(articles.length).to.equal(2);
        });
    });
  });
  describe('GET /articles/:article_id', () => {
    it('Sends back the correct object with 200 status code when given a valid article_id', () => {
      const articleId = usefulData.articles[0]._id;
      return request(app)
        .get(`/api/articles/${ articleId }`)
        .expect(200)
        .then((res) => {
          const article = res.body[0];
          expect(article.title).to.be.a('string');
          expect(article.votes).to.be.a('number');
        });
    });
    it('Sends back an error message when given an invalid ID', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('Invalid ID');
        });
    });
  });
  describe('GET /articles/:article_id/comments', () => {
    it('Sends back the correct object with 200 status code when given a valid article_id', () => {
      const articleId = usefulData.articles[0]._id;
      return request(app)
        .get(`/api/articles/${ articleId }/comments`)
        .expect(200)
        .then((res) => {
          const comments = res.body.comments[0];
          expect(comments).to.be.an('object');
          expect(comments.created_at).to.be.a('number');
        });
    });
    it('Sends back an error message when given an invalid ID', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('Invalid ID');
        });
    });
  });
  describe('POST /articles/:article_id/comments', () => {
    it('Sends back 201 status code if posted comment successfully', () => {
      const articleId = usefulData.articles[0]._id;
      const comment = 'Great article!';     
      return request(app)
        .post(`/api/articles/${ articleId }/comments`)
        .expect(201)
        .send({
          comment
        });
    });
    it('Sends back the comment after successful post', () => {
      const article_id = usefulData.articles[0]._id;
      const comment = 'Great article!';
      return request(app)
        .post(`/api/articles/${ article_id }/comments`)
        .expect(201)
        .send({
          comment
        })
        .then((res) => {
          const { body } = res.body.comment;
          expect(body).to.equal(comment);
        });
    });
  });
  describe('PUT /articles/:article_id', () => {
    it('Correctly votes up an article', () => {
      const articleId = usefulData.articles[0]._id;      
      return request(app)
        .put(`/api/articles/${ articleId }?vote=UP`)
        .expect(200)
        .then((res) => {
          const article = res.body.article;
          expect(article.votes).to.equal(1);
        });
    });
    it('Correctly votes down an article', () => {
      const articleId = usefulData.articles[0]._id;            
      return request(app)
        .put(`/api/articles/${ articleId }?vote=DOWN`)
        .expect(200)
        .then((res) => {
          const article = res.body.article;
          expect(article.votes).to.equal(-1);
        });
    });
  });
});
